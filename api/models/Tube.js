/**
 * @module Tube
 * @description Tube inside Cable
 */

module.exports = {
  tableName: 'fiberfy_tubes',
  attributes: {
    name: {
      type: 'string'
    },
    cable: {
      model: 'Cable'
    },
    color: {
      type: 'string'
    },
    fibers: {
      collection: 'Fiber',
      via: 'tube'
    },
    observations: {
      type: 'text'
    },

    project: {
      model: 'Project'
    }
  }
};
