/**
 * @module Box
 * @description Box in a infraestructura
 */

module.exports = {
  tableName: 'fiberfy_boxes',
  attributes: {
    name: {
        type: 'string'
    },
    uuid: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    site: {
      model: 'site'
    },
    inputFO: {
      type: 'integer'
    },
    outputFO: {
      type: 'integer'
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
