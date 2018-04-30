/**
 * @module Cable
 * @description Cable between Site, and intermedial == site_id intermedial.
 */

module.exports = {
  tableName: 'fiberfy_cables',
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
    tubes: {
      collection: 'Tube',
      via: 'cable'
    },
    observations: {
      type: 'text'
    },
    status: {
      type: 'string'
    },

    project: {
      model: 'Project'
    }
  }
};
