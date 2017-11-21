/**
 * @module Project
 * @description Workspace group by users
 */

module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    user: {
      model: 'User'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    zoom: {
      type: 'integer'
    }
  }
};
