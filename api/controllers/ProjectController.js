/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: async function (req, res) {
		var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
		let data = actionUtil.parseValues(req);


    // Create new instance of model using data from params
		let result;
		try {
			result = await Project.create(data).fetch();
		}
		catch (err) {
			return res.serverError(err);
		}
		User.findOne({ id: req.token.id}).exec(async function (err, user) {
			if (err) return res.negotiate(err);

			// We add reference to project
			try {
				await User.addToCollection(user.id, 'projects', result.id);
			}
			catch (err2) {
				return res.serverError(err2);
			}
			res.ok(result);
		})
	},
	count: async function (req, res) {
		var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

		var parseBlueprintOptions = req.options.parseBlueprintOptions || req._sails.config.blueprints.parseBlueprintOptions;

	  // Set the blueprint action for parseBlueprintOptions.
	  req.options.blueprintAction = 'find';

	  var queryOptions = parseBlueprintOptions(req);
		delete queryOptions.criteria.limit;
		delete queryOptions.criteria.sort;
		var numRecords;
		try {
			numRecords = await Project.count(queryOptions.criteria);
		} catch (e) {
			res.serverError(e);
		}
		res.ok({count: numRecords});
	}
};
