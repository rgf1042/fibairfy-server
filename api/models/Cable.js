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
      model: 'Site',
      required: true
    },
    last: {
      model: 'Site',
      required: true
    },
    intermedial: {
      /* collection: 'Path',
      via: 'cables' */
      type: 'json',
      required: true
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
  },
  beforeDestroy : function (criteria, proceed) {
    if (criteria.where.id) {
      Tube.destroy({cable: criteria.where.id}).exec(function(err) {
        proceed(err);
      })
    } else {
      proceed();
    }
  }
};
