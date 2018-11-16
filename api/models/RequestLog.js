/**
 * @module RequestLog
 * @description Model to store requests
 */

module.exports = {
  tableName: 'fiberfy_requests_log',
  attributes: {
    updatedAt: false,
    action: {
      type: 'string'
    },
    method: {
      type: 'string'
    },
    path: {
      type: 'string'
    },
    params: {
      type: 'json'
    },
    user: {
      model: 'User'
    }
  }
};
