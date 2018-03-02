/**
 * @module Project
 * @description Workspace group by users
 */

module.exports = {
  tableName: 'fiberfy_projects',
  attributes: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    zoom: {
      type: 'integer'
    },
    defaultZone : {
      model: 'Zone',
      defaultsTo: 2413 //Catalunya
    },
    users: {
      collection: 'ProjectOwnership',
      via: 'project'
    }
  }
};
