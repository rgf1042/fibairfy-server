/**
 * logger
 *
 * @description :: Policy to log every User request
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = async function (req, res, next) {
  try {
    await RequestLog.create({
      action: req.options.action,
      method: req.method,
      path: req.path,
      params: req.allParams(),
      user: req.token.id
    });
  } catch (err) {
    console.log(err);
  }
  return next();
};
