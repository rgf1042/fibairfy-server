/**
 * canWrite
 *
 * @description :: Policy to check if user can write to datastore
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
  var data = actionUtil.parseValues(req);

  ProjectOwnership.findOne({
    project: data.project,
    user: req.token.id
  }).exec(function (err, projectowner) {
    if (err) return res.negotiate(err);
    if (!projectowner) return res.json(401, {err: 'This User is not authorized in this project!'});
    next();
  });
};
