/**
 * SiteController
 *
 * @description :: Server-side logic for managing Sites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function (req, res) {
		// Look up the model
		var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
	  var Model = actionUtil.parseModel(req);
	  // If an `id` param was specified, use the findOne blueprint action
	  // to grab the particular instance with its primary key === the value
	  // of the `id` param.   (mainly here for compatibility for 0.9, where
	  // there was no separate `findOne` action)
	  if ( actionUtil.parsePk(req) ) {
	    return require('./findOne')(req,res);
	  }

	  // Lookup for records that match the specified criteria
	  var query = Model.find({ type: {'!=': ['node']}}) // We add this line to block all Guifi.net Node and Supernode stuff
	  .where( actionUtil.parseCriteria(req) )
	  .limit( actionUtil.parseLimit(req) )
	  .skip( actionUtil.parseSkip(req) )
	  .sort( actionUtil.parseSort(req) );
	  query = actionUtil.populateRequest(query, req);
	  query.exec(function found(err, matchingRecords) {
	    if (err) return res.serverError(err);

	    // Only `.watch()` for new instances of the model if
	    // `autoWatch` is enabled.
	    if (req._sails.hooks.pubsub && req.isSocket) {
	      Model.subscribe(req, matchingRecords);
	      if (req.options.autoWatch) { Model.watch(req); }
	      // Also subscribe to instances of all associated models
	      _.each(matchingRecords, function (record) {
	        actionUtil.subscribeDeep(req, record);
	      });
	    }

	    res.ok(matchingRecords);
	  });
	},
	update: function (req, res) {
		var parseBlueprintOptions = req.options.parseBlueprintOptions || req._sails.config.blueprints.parseBlueprintOptions;

	  // Set the blueprint action for parseBlueprintOptions.
	  req.options.blueprintAction = 'update';

	  var queryOptions = parseBlueprintOptions(req);
	  var Model = req._sails.models[queryOptions.using];

	  var criteria = {};
	  criteria[Model.primaryKey] = queryOptions.criteria.where[Model.primaryKey];

	  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	  // FUTURE: Use a database transaction here, if supported by the datastore.
	  // e.g.
	  // ```
	  // Model.getDatastore().transaction(function during(db, proceed){ ... })
	  // .exec(function afterwards(err, result){}));
	  // ```
	  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	  // Find and update the targeted record.
	  //
	  // (Note: this could be achieved in a single query, but a separate `findOne`
	  //  is used first to provide a better experience for front-end developers
	  //  integrating with the blueprint API.)
	  var query = Model.findOne(_.cloneDeep(criteria), _.cloneDeep(queryOptions.populates));
	  query.exec(function found(err, matchingRecord) {
	    if (err) {
	      switch (err.name) {
	        case 'UsageError': return res.badRequest(formatUsageError(err, req));
	        default: return res.serverError(err);
	      }
	    }//-•

	    if (!matchingRecord) { return res.notFound(); }
			var flagDistance = (queryOptions.valuesToSet.latitude || queryOptions.valuesToSet.longitude);

	    Model.update(_.cloneDeep(criteria), queryOptions.valuesToSet).meta(queryOptions.meta).exec(async function updated(err, records) {

	      // Differentiate between waterline-originated validation errors
	      // and serious underlying issues. Respond with badRequest if a
	      // validation error is encountered, w/ validation info, or if a
	      // uniqueness constraint is violated.
	      if (err) {
	        switch (err.name) {
	          case 'AdapterError':
	            switch (err.code) {
	              case 'E_UNIQUE': return res.badRequest(err);
	              default: return res.serverError(err);
	            }//•
	          case 'UsageError': return res.badRequest(formatUsageError(err, req));
	          default: return res.serverError(err);
	        }
	      }//-•

				// Here we recalculate distances in all affected Paths
				if (flagDistance) {
					try {
						paths = await Path.find({or : [
					    { first: matchingRecord.id },
					    { last: matchingRecord.id }
					  ]})
					} catch (err) {
						return res.serverError(err);
					}

					for (let x in paths) {
						let id = paths[x].id;
						let first = paths[x].first;
						let last = paths[x].last;
						let intermedial = paths[x].intermedial;

						try {
							let distance = await sails.helpers.getDistancePath(first, last, intermedial);
							await Path.update({id: id}, {distance: distance});
						} catch (err) {
							return res.badRequest(err);
						}
					}
				}
	      // If we didn't fetch the updated instance, just return 'OK'.
	      if (!records) {
	        return res.ok();
	      }

	      if (!_.isArray(records)) {
	        return res.serverError('Consistency violation: When `fetch: true` is used, the second argument of the callback from update should always be an array-- but for some reason, it was not!  This should never happen... it could be due to a bug or partially implemented feature in the database adapter, or some other unexpected circumstance.');
	      }

	      // Because this should only update a single record and update
	      // returns an array, just use the first item.  If more than one
	      // record was returned, something is amiss.
	      if (!records.length || records.length > 1) {
	        req._sails.log.warn(
	        util.format('Unexpected output from `%s.update`.', Model.globalId)
	        );
	      }

	      var updatedRecord = records[0];

	      var pk = updatedRecord[Model.primaryKey];

	      // If we have the pubsub hook, use the Model's publish method
	      // to notify all subscribers about the update.
	      if (req._sails.hooks.pubsub) {
	        if (req.isSocket) { Model.subscribe(req, _.pluck(records, Model.primaryKey)); }
	        // The _.cloneDeep calls ensure that only plain dictionaries are broadcast.
	        // TODO -- why is that important?
	        Model._publishUpdate(pk, _.cloneDeep(queryOptions.valuesToSet), !req.options.mirror && req, {
	          previous: _.cloneDeep(matchingRecord)
	        });
	      }

	      // Do a final query to populate the associations of the record.
	      //
	      // (Note: again, this extra query could be eliminated, but it is
	      //  included by default to provide a better interface for integrating
	      //  front-end developers.)
	      var Q = Model.findOne(_.cloneDeep(criteria), _.cloneDeep(queryOptions.populates));
	      Q.exec(function foundAgain(err, populatedRecord) {
	        if (err) { return res.serverError(err); }
	        if (!populatedRecord) { return res.serverError('Could not find record after updating!'); }
	        res.ok(populatedRecord);
	      }); // </foundAgain>
	    });// </updated>
	  }); // </found>
	}
};
