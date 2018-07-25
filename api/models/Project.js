/**
 * @module Project
 * @description Workspace group by users
 */

module.exports = {
  tableName: 'fiberfy_projects',
  cascadeOnDestroy: true,
  attributes: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    latitude: {
      type: 'number'
    },
    longitude: {
      type: 'number'
    },
    zoom: {
      type: 'number'
    },
    defaultZone : {
      model: 'Zone'
    },
    users: {
      collection: 'User',
      via: 'project',
      through: 'ProjectOwnership'
    }
  }
};
