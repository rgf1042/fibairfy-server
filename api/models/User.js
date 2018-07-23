/**
 * @module User
 * @description Users in system
 */

 // We don't want to store password with out encryption
 var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'fiberfy_users',
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string'
    },
    isLdap: {
      type: 'boolean'
    },
    projects: {
      collection: 'Project',
      via: 'user',
      through: 'ProjectOwnership'
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate : function (values, next) {
    if (!values.password) next()
    else {
      bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
          values.password = hash;
          next();
        })
      })
    }
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};
