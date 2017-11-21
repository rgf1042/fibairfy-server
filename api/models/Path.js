/**
 * @module Path
 * @description Path between Site in a civil work
 */

module.exports = {
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
      type: 'string'
    },
    type: {
      type: 'string'
    },
    observations: {
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
