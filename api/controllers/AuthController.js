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
        return res.json({flag: false, message: 'invalid username or password'});
      }

      User.comparePassword(password, user, function (message, valid) {
        if (message) {
          return res.json({flag: false, message: 'forbidden'});
        }

        if (!valid) {
          return res.json({flag: false, message: 'invalid username or password'});
        } else {
          let token = jwToken.issue({id: user.id});
  				res.set('Authorization','Bearer ' + token);
          res.json({
            flag: true,
            user: user,
            token: token
          });
        }
      });
    })
  },
  loginHTML: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {flag: false, message: 'username and password required'});
    }

    User.findOne({username: username}, function (message, user) {
      if (!user) {
        return res.json({flag: false, message: 'invalid username or password'});
      }

      User.comparePassword(password, user, function (message, valid) {
        if (message) {
          return res.json({flag: false, message: 'forbidden'});
        }

        if (!valid) {
          return res.json({flag: false, message: 'invalid username or password'});
        } else {
          let token = jwToken.issue({id: user.id});
          res.cookie('authorization', token, { maxAge: 86400000 });
          res.redirect('/map');
        }
      });
    })
  },
  logoutHTML: function (req, res) {
    res.cookie('authorization', null, { maxAge: 0 });
    res.redirect('/');
  }
};
