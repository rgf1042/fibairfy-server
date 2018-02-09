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
      if (data.cn === 'lectura') {
        ldap.authenticate({username: username, password: password}, function (auth) {
          if (auth.error) {
            return res.json(401, {flag: false, message: auth.error});
          } else {
            console.log('trace 1');
            console.log('username: ' + username);
            User.findOne({username: username}, function (message, user) {
              if (!user) {
                console.log('trace 2');
                User.create({username: username, isLdap: true}, function (err, user) {
                  if (err) res.json(500, {flag: false, message: 'internal server error'});
                  console.log('trace 3');
                  // We issue token
                  let token = jwToken.issue({id: user.id});
          				res.set('Authorization','Bearer ' + token);
                  res.json({
                    flag: true,
                    user: user,
                    token: token
                  });
                });
              } else {
                if (!user.isLdap) {
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
                } else {
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
      } else {
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
