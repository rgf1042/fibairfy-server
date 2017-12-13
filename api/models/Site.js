/**
 * @module Site
 * @description Site in a civil work
 */

module.exports = {
  tableName: 'fiberfy_sites',
  attributes: {
    name: {
      type: 'string',
      unique: true
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    type: {
      type: 'string'
    },
    observations: {
      type: 'text'
    },
    status: {
      type: 'string'
    },
    user: {
      model: 'User'
    },
    project: {
      model: 'Project'
    }
  }
};
