/**
 * PathController
 *
 * @description :: Server-side logic for managing Paths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const geolib = require('geolib')
const _ = require('@sailshq/lodash');
const formatUsageError = require('sails/lib/hooks/blueprints/formatUsageError')
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
	create: function (req, res) {

		var parseBlueprintOptions = req.options.parseBlueprintOptions || req._sails.config.blueprints.parseBlueprintOptions;

	  // Set the blueprint action for parseBlueprintOptions.
	  req.options.blueprintAction = 'create';

	  var queryOptions = parseBlueprintOptions(req);
	  var Model = req._sails.models[queryOptions.using];

	  // Get the new record data.
	  var data = queryOptions.newRecord;

	  // Look for any many-to-one collections that are being set.
	  // For example, User.create({pets: [1, 2, 3]}) where `pets` is a collection of `Pet`
	  // via an `owner` attribute that is `model: 'user'`.
	  // We need to know about these so that, if any of the new children already had parents,
	  // those parents get `removedFrom` notifications.
	  async.reduce(_.keys(Model.attributes), [], function(memo, attrName, nextAttrName) {

	    var attrDef = Model.attributes[attrName];
	    if (
	      // Does this attribute represent a plural association.
	      attrDef.collection &&
	      // Is this attribute set with a non-empty array?
	      _.isArray(data[attrName]) && data[attrName].length > 0 &&
	      // Does this plural association have an inverse attribute on the related model?
	      attrDef.via &&
	      // Is that inverse attribute a singular association, making this a many-to-one relationship?
	      req._sails.models[attrDef.collection].attributes[attrDef.via].model
	    ) {
	      // Create an `in` query looking for all child records whose primary keys match
	      // those in the array that the new parent's association attribute (e.g. `pets`) is set to.
	      var criteria = {};
	      criteria[req._sails.models[attrDef.collection].primaryKey] = data[attrName];
	      req._sails.models[attrDef.collection].find(criteria).exec(function(err, newChildren) {
	        if (err) {return nextAttrName(err);}
	        // For each child, see if the inverse attribute already has a value, and if so,
	        // push a new `removedFrom` notification onto the list of those to send.
	        _.each(newChildren, function(child) {
	          if (child[attrDef.via]) {
	            memo.push({
	              id: child[attrDef.via],
	              removedId: child[req._sails.models[attrDef.collection].primaryKey],
	              attribute: attrName
	            });
	          }
	        });
	        return nextAttrName(undefined, memo);
	      });
	    }

	    else {
	      return nextAttrName(undefined, memo);
	    }

	  }, async function (err, removedFromNotificationsToSend) {

	    if (err) {return res.serverError(err);}


	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	    // FUTURE: Use a database transaction here, if supported by the datastore.
	    // e.g.
	    // ```
	    // Model.getDatastore().transaction(function during(db, proceed){ ... })
	    // .exec(function afterwards(err, result){}));
	    // ```
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

			try {
				data.distance = await sails.helpers.getDistancePath(data.first, data.last, data.intermedial);
			} catch (err) {
				res.badRequest(err);
			}

			// Create new instance of model using data from params
	    Model.create(data).meta(queryOptions.meta).exec(function created (err, newInstance) {

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

	      // If we didn't fetch the new instance, just return 'OK'.
	      if (!newInstance) {
	        return res.ok();
	      }

	      // Look up and populate the new record (according to `populate` options in request / config)
	      Model
	      .findOne(newInstance[Model.primaryKey], queryOptions.populates)
	      .exec(function foundAgain(err, populatedRecord) {
	        if (err) { return res.serverError(err); }
	        if (!populatedRecord) { return res.serverError('Could not find record after creating!'); }

	        // If we have the pubsub hook, use the model class's publish method
	        // to notify all subscribers about the created item
	        if (req._sails.hooks.pubsub) {
	          if (req.isSocket) {
	            Model.subscribe(req, [populatedRecord[Model.primaryKey]]);
	            Model._introduce(populatedRecord);
	          }
	          Model._publishCreate(populatedRecord, !req.options.mirror && req);
	          if (removedFromNotificationsToSend.length) {
	            _.each(removedFromNotificationsToSend, function(notification) {
	              Model._publishRemove(notification.id, notification.attribute, notification.removedId, !req.options.mirror && req, {noReverse: true});
	            });
	          }
	        }//>-

	        // Send response
	        res.ok(populatedRecord);
	      }); // </foundAgain>

	    });

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
	  query.exec(async function found(err, matchingRecord) {
	    if (err) {
	      switch (err.name) {
	        case 'UsageError': return res.badRequest(formatUsageError(err, req));
	        default: return res.serverError(err);
	      }
	    }//-•

	    if (!matchingRecord) { return res.notFound(); }

			// Here we recalculate distance
			if (queryOptions.valuesToSet.first || queryOptions.valuesToSet.last || queryOptions.valuesToSet.intermedial) {
				let first = queryOptions.valuesToSet.first || matchingRecord.first;
				let last = queryOptions.valuesToSet.last || matchingRecord.last;
				let intermedial = queryOptions.valuesToSet.intermedial || matchingRecord.intermedial;

				try {
					queryOptions.valuesToSet.distance = await sails.helpers.getDistancePath(first, last, intermedial);
				} catch (err) {
					res.badRequest(err);
				}

			}

	    Model.update(_.cloneDeep(criteria), queryOptions.valuesToSet).meta(queryOptions.meta).exec(function updated(err, records) {

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
