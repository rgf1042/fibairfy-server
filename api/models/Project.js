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
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    zoom: {
      type: 'integer'
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
