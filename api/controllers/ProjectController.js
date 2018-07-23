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
		let result
		try {
			result = await Project.create(data).fetch()
		}
		catch (err) {
			return res.negotiate(err);
		}

		console.log('trace1');
		User.findOne({ id: req.token.id}).exec(async function (err, user) {
			if (err) return res.negotiate(err);

			// We add reference to project
			try {
				await User.addToCollection(user.id, 'projects', result.id);
			}
			catch (err2) {
				return res.negotiate(err2);
			}
			res.created(result);
		})
	}
};
