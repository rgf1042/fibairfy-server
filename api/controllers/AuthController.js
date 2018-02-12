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
      if (user.password === '' || user.password === undefined) return res.json({flag: false, message: 'This user doesnt have password. Try with LDAP.'});

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
  loginLDAP: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {flag: false, message: 'username and password required'});
    }
    ldap.search(username, function (data) {
      if (data.err) res.json(401, {flag: false, message: data.error});
      if (data.cn === 'lectura') {
        ldap.authenticate({username: username, password: password}, function (auth) {
          if (auth.error) {
            return res.json(401, {flag: false, message: auth.error});
          } else {
            User.findOne({username: username}, function (message, user) {
              if (!user) { // User is not in fiberfy database we create one
                User.create({username: username, isLdap: true}, function (err, user) {
                  if (err) res.json(500, {flag: false, message: 'internal server error'});
                  // We issue token
                  let token = jwToken.issue({id: user.id});
          				res.set('Authorization','Bearer ' + token);
                  res.json({
                    flag: true,
                    user: user,
                    token: token
                  });
                });
              } else { // There's this user inside fiberfy database
                if (!user.isLdap) { // Exists but it's not LDAP
                  User.update({username: username, isLdap: true}, function (err, user) {
                    if (err) res.json(500, {flag: false, message: 'internal server error'});
                    // We issue token
                    let token = jwToken.issue({id: user.id});
            				res.set('Authorization','Bearer ' + token);
                    res.json({
                      flag: true,
                      user: user,
                      token: token
                    });
                  });
                } else { // It exists and it's LDAP
                  // We issue token
                  let token = jwToken.issue({id: user.id});
          				res.set('Authorization','Bearer ' + token);
                  res.json({
                    flag: true,
                    user: user,
                    token: token
                  });
                }
              }
            })
          }
        })
      } else { // User it's not in LDAP or it doesn't have enough permissions
        return res.json({flag: false, message: 'invalid username or password'});
      }
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
      if (user.password === '' || user.password === undefined) return res.json({flag: false, message: 'This user doesnt have password. Try with LDAP.'});
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
