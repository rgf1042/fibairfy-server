/**
 * @module Fusion
 * @description Workspace group by users
 */

module.exports = {
  tableName: 'fiberfy_fusions',
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

    project: {
      model: 'Project'
    }
  }
};
