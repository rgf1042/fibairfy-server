/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
		let data = actionUtil.parseValues(req);


    // Create new instance of model using data from params
    Project.create(data).exec(function created (err, newInstance) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);

        // If we have the pubsub hook, use the model class's publish method
        // to notify all subscribers about the created item
        if (req._sails.hooks.pubsub) {
            if (req.isSocket) {
                Project.subscribe(req, newInstance);
                Project.introduce(newInstance);
            }
            // Make sure data is JSON-serializable before publishing
            let publishData = _.isArray(newInstance) ?
                                _.map(newInstance, function(instance) {return instance.toJSON();}) :
                                newInstance.toJSON();
            Project.publishCreate(publishData, !req.options.mirror && req);
        }

				User.findOne({ id: req.token.id}).exec(function (err, user) {
					if (err) return res.negotiate(err);

					ProjectOwnership.create({
						user: user,
						project: newInstance
					}).exec(function created (err, newInstance) {

			        // Differentiate between waterline-originated validation errors
			        // and serious underlying issues. Respond with badRequest if a
			        // validation error is encountered, w/ validation info.
			        if (err) return res.negotiate(err);

			        // If we have the pubsub hook, use the model class's publish method
			        // to notify all subscribers about the created item
			        if (req._sails.hooks.pubsub) {
			            if (req.isSocket) {
			                ProjectOwnership.subscribe(req, newInstance);
			                ProjectOwnership.introduce(newInstance);
			            }
			            // Make sure data is JSON-serializable before publishing
			            var publishData = _.isArray(newInstance) ?
			                                _.map(newInstance, function(instance) {return instance.toJSON();}) :
			                                newInstance.toJSON();
			            ProjectOwnership.publishCreate(publishData, !req.options.mirror && req);
			        }

			        // Send JSONP-friendly response if it's supported
			        res.created(newInstance);
			    });
			});
    });
	}
};
