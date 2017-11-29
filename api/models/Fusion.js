/**
 * @module Fusion
 * @description Workspace group by users
 */

module.exports = {
  attributes: {
    site: {
      model: 'Site'
    },
    ffiber: {
      model: 'Fiber'
    },
    fcolor: {
      type: 'string'
    },
    lfiber: {
      model: 'Fiber'
    },
    lcolor: {
      type: 'string'
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