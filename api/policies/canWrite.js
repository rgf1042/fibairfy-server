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
      if (entity) {
        var id;
        try {
          id = (req.options.model === 'project') ? entity.id : entity.project;
        } catch (err) {
          return res.badRequest('No model definition.')
        }
        if (!id) return res.badRequest('No project information supplied.')
        ProjectOwnership.findOne({
          project: id,
          user: req.token.id
        }).exec(function (err, projectowner) {
          if (err) return res.negotiate(err);
          if (!projectowner) return res.status(401).json({err: 'This User is not authorized in this project!'});
          next();
        });
      } else {
        return res.status(401).json({err: 'This User is not authorized in this project!'});
      }
    })
  }
  else {
    var id;
    try {
      id = (req.options.model === 'project') ? data.id : data.project;
    } catch (err) {
      return res.badRequest('No model definition.')
    }
    if (!id) return res.badRequest('No project information supplied.')
    ProjectOwnership.findOne({
      project: id,
      user: req.token.id
    }).exec(function (err, projectowner) {
      if (err) return res.negotiate(err);
      if (!projectowner) return res.status(401).json({err: 'This User is not authorized in this project!'});
      next();
    });
  }
};
