/**
 * @module Path
 * @description Path between Site in a civil work
 */

module.exports = {
  tableName: 'fiberfy_paths',
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
      type: 'json'
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
    cables: {
      collection: 'Cable',
      via: 'intermedial'
    },
    project: {
      model: 'Project'
    }
  }
};
