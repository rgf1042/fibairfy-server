/**
 * @module User
 * @description Users in system
 */

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
  }
};
