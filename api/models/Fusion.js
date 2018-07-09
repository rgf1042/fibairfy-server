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
    fdata: {
      type: 'json'
    },
    sdata: {
      type: 'json'
    },
    project: {
      model: 'Project'
    }
  }
};
