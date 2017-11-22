/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {flag: false, message: 'username and password required'});
    }

    User.findOne({username: username}, function (message, user) {
      if (!user) {
        return res.json(401, {flag: false, message: 'invalid username or password'});
      }

      User.comparePassword(password, user, function (message, valid) {
        if (message) {
          return res.json(403, {flag: false, message: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {flag: false, message: 'invalid username or password'});
        } else {
          res.json({
            flag: true,
            user: user,
            token: jwToken.issue({id : user.id })
          });
        }
      });
    })
  }
};
