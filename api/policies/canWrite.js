/**
 * canWrite
 *
 * @description :: Policy to check if user can write to datastore
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
  var data = actionUtil.parseValues(req);
  //data.id if it's ProjectModel
  if (req.method !== 'POST') {
    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    Model.findOne(pk).exec(function (err, entity) {
      ProjectOwnership.findOne({
        project: entity.project,
        user: req.token.id
      }).exec(function (err, projectowner) {
        if (err) return res.negotiate(err);
        if (!projectowner) return res.json(401, {err: 'This User is not authorized in this project!'});
        next();
      });
    })
  }
  else {
    ProjectOwnership.findOne({
      project: data.project || data.id,
      user: req.token.id
    }).exec(function (err, projectowner) {
      if (err) return res.negotiate(err);
      if (!projectowner) return res.json(401, {err: 'This User is not authorized in this project!'});
      next();
    });
  }
};
