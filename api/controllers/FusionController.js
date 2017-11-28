/**
 * FusionController
 *
 * @description :: Server-side logic for managing Fusions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	destroyByParameters: function(req, res) {
		if (!req.body.site ||
				!req.body.ffiber ||
				!req.body.fcolor ||
				!req.body.lfiber ||
				!req.body.lcolor ||
				!req.body.project) {

			return res.badRequest('Required params not found!');
		}

		Fusion.destroy({
			site: req.body.site,
			ffiber: req.body.ffiber,
			fcolor: req.body.fcolor,
			lfiber: req.body.lfiber,
			lcolor: req.body.lcolor,
			project: req.body.project
		}).exec(function (err) {
			if (err) {
				//Error
				return res.serverError('Error destroying model!');
			}

			return res.ok();
		});
	}
};
