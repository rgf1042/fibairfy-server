/**
 * SiteController
 *
 * @description :: Server-side logic for managing Sites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
