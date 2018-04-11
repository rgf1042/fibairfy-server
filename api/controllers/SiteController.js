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
	  var query = Model.find({ type: {'!': ['node']}}) // We add this line to block all Guifi.net Node and Supernode stuff
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
	getBoxes: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest('No valid site id!');
		}

		const id = req.param('id');

		Site.findOne({
			id: id
		}).exec(function (err, site) {
			if (err) {
				//Error
				return res.serverError('Error querying model!');
			}

			if (!site) {
				return res.notFound();
			}

			//sails.log.debug("site: " + site.name);

			Box.find({
				site: site.id
			}).exec(function (err, boxes) {
				if (err) {
					//Error
					return res.serverError('Error querying model!');
				}

				return res.json(boxes);

			});

		});
	},
	getFusion: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest('No valid site id!');
		}

		const id = req.param('id');

		Site.findOne({
			id: id
		}).exec(function (err, site) {
			if (err) {
				//Error
				return res.serverError('Error querying model!');
			}

			if (!site) {
				return res.notFound();
			}

			//sails.log.debug("site: " + site.name);

			Fusion.find({
				site: site.id
			}).exec(function (err, fusions) {
				if (err) {
					//Error
					return res.serverError('Error querying model!');
				}

				return res.json(fusions);

			});

		});
	},
	getFibers: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest('No valid site id!');
		}

		const id = req.param('id');

		Site.findOne({
			id: id
		}).exec(function (err, site) {
			if (err) {
				//Error
				return res.serverError('Error querying model!');
			}

			if (!site) {
				return res.notFound();
			}

			//sails.log.debug("site: " + site.name);

			Fiber.find({
				site: site.id
			}).exec(function (err, fibers) {
				if (err) {
					//Error
					return res.serverError('Error querying model!');
				}

				return res.json(fibers);

			});

		});
	}
};
