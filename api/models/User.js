/**
 * @module User
 * @description Users in system
 */

 // We don't want to store password with out encryption
 var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string'
    },
    projects: {
      collection: 'Project',
      via: 'user'
    },

    toJSON: function () {
      const model = this.toObject();
      delete model.password;
      return model;
    }
  },

  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
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
