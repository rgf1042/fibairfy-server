'use strict'

const winston = require('winston')

module.exports = {
  database: {
    stores: {

      /**
       * Define a store called "prod" which uses SQLite3 to persist data.
       *
       * Production database
       */
      prod: {
        adapter: require('waterline-sqlite3'),
        migrate: 'safe'
      }
    },
    models: {
      defaultStore: 'prod',
      migrate: 'safe'
    }
  },

  trailpack: {
    disabled: [
      'repl'
    ]
  },

  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        }),
        new winston.transports.File({
          name: 'info-file',
          level: 'info',
          filename: 'trails-info.log',
          timestamp: true
        }),
        new winston.transports.File({
          name: 'error-file',
          level: 'error',
          filename: 'trails-error.log',
          timestamp: true
        })
      ]
    })
  }

}
