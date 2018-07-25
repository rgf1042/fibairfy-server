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
      model: 'site',
      required: true
    },
    inputFO: {
      type: 'number'
    },
    outputFO: {
      type: 'number'
    },
    observations: {
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
