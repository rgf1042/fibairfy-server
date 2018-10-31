/**
 * @module MapLayer
 * @description Map layers
 */

module.exports = {
  tableName: 'fiberfy_map_layers',
  attributes: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    isBase: {
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
    map: {
      model: 'MapSource'
    }
  }
};
