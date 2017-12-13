/**
 * @module Fiber
 * @description Fiber between Site, and intermedial == site_id intermedial.
 */

module.exports = {
  tableName: 'fiberfy_fibers',
  attributes: {
    name: {
      type: 'string'
    },
    first: {
      model: 'Site'
    },
    last: {
      model: 'Site'
    },
    intermedial: {
      type: 'text'
    },
    colors: {
      type: 'string'
    },
    template: {
      model: 'fiberTemplate'
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
