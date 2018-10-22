/**
 * @module Path
 * @description Path between Site in a civil work
 */

module.exports = {
  tableName: 'fiberfy_paths',
  _swagger: {
    attributes: {
      ignore: {
        request: {
          id: true,
          updatedAt: true,
          createdAt: true,
          distance: true,
          intermedial: true
        },
        response: {
          intermedial: true
        }
      },
      append: {
        request: {
          type: {
            enum: [
              'notdefined',
              'underground',
              'facade',
              'aerial'
            ]
          }
        },
        response: {
          type: {
            enum: [
              'notdefined',
              'underground',
              'facade',
              'aerial'
            ]
          }
        }
      },
      additions: {
        request: {
          first: {
            type: 'integer'
          },
          last: {
            type: 'integer'
          },
          intermedial: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'integer'
              },
              minItems: 2,
              maxItems: 2
            }
          }
        },
        response: {
          intermedial: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'integer'
              },
              minItems: 2,
              maxItems: 2
            }
          }
        }
      }
    }
  },
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
      type: 'string'
    },
    status: {
      type: 'string'
    },
    distance: {
      type: 'number',
      required: true
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
