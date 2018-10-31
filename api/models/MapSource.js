/**
 * @module MapSource
 * @description Map sources
 */

module.exports = {
  tableName: 'fiberfy_map_sources',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
    },
    type: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    },
    internal: {
      type: 'boolean',
      required: true
    },
    weight: {
      type: 'number',
      defaultsTo: 100
    },
    options: {
      type: 'json'
    },
    layers: {
      collection: 'MapLayer',
      via: 'map'
    }
  }
};
