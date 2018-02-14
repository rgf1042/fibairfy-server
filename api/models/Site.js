/**
 * @module Site
 * @description Site in a civil work
 */

module.exports = {
  migrate: 'safe',
  tableName: 'guifi_location',
  autoUpdatedAt: false,
  autoCreatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      columnName: 'nick',
      type: 'string'
    },
    zone: {
      columnName: 'zone_id',
      type: 'integer'
    },
    observations: {
      columnName: 'zone_description',
      type: 'string'
    },
    type: {
      columnName: 'location_type',
      type: 'string',
      defaultsTo: 'node'
    },
    latitude: {
      columnName: 'lat',
      type: 'float'
    },
    longitude: {
      columnName: 'lon',
      type: 'float'
    },
    elevation: {
      type: 'integer'
    },
    notification: {
      type: 'string',
      defaultsTo: 'guifi@guifi.net'
    },
    status: {
      columnName: 'status_flag',
      type: 'string',
      defaultsTo: 'Planned'
    },
    project: {
      columnName: 'project_id',
      model: 'Project'
    },
    stable: {
      type: 'string',
      defaultsTo: 'Yes'
    },
    graphServer: {
      columnName: 'graph_server',
      type: 'integer',
      defaultsTo: 0
    },
    userCreated: {
      columnName: 'user_created',
      type: 'integer',
      defaultsTo: 1
    },
    userChanged: {
      columnName: 'user_changed',
      type: 'integer'
    },
    autoCreatedAt: {
      columnName: 'timestamp_created',
      type: 'integer',
      defaultsTo: 0
    },
    autoUpdatedAt: {
      columnName: 'timestamp_changed',
      type: 'integer'
    }
  },
  _attributes: {
    id: {
      rawType: 'MEDIUMINT(9)',
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      rawType: 'VARCHAR(40)',
      type: 'string'
    },
    zone: {
      columnName: 'zone_id',
      rawType: 'MEDIUMINT(9)',
      type: 'integer'
    },
    observations: {
      columnName: 'zone_description',
      rawType: 'VARCHAR(255)',
      type: 'string'
    },
    type: {
      columnName: 'location_type',
      rawType: 'VARCHAR(10)',
      type: 'string',
      defaultsTo: 'node'
    },
    latitude: {
      rawType: 'DECIMAL(10,6)',
      type: 'float'
    },
    longitude: {
      rawType: 'DECIMAL(10,6)',
      type: 'float'
    },
    elevation: {
      rawType: 'TINYINT(4)',
      type: 'integer'
    },
    notification: {
      rawType: 'VARCHAR(1024)',
      type: 'string',
      defaultsTo: 'guifi@guifi.net'
    },
    status: {
      columnName: 'status_flag',
      rawType: 'VARCHAR(40)',
      type: 'string',
      defaultsTo: 'Planned'
    },
    project: {
      columnName: 'project_id',
      rawType: 'INT(11)',
      type: 'integer'
    },
    stable: {
      rawType: 'VARCHAR(25)',
      type: 'string',
      defaultsTo: 'Yes'
    },
    graphServer: {
      columnName: 'graph_server',
      rawType: 'MEDIUMINT(9)',
      type: 'integer',
      defaultsTo: 0,
      comment: 'Foreign key to guifi_services (type SNPGraph)'
    },
    userCreated: {
      columnName: 'user_created',
      rawType: 'MEDIUMINT(9)',
      type: 'integer',
      defaultsTo: 0
    },
    userChanged: {
      columnName: 'user_changed',
      rawType: 'MEDIUMINT(9)',
      type: 'integer'
    },
    autoCreatedAt: {
      columnName: 'timestamp_created',
      rawType: 'INT(11)',
      type: 'integer',
      defaultsTo: 0
    },
    autoUpdatedAt: {
      columnName: 'timestamp_changed',
      rawType: 'INT(11)',
      type: 'integer'
    }
  },
  beforeCreate : function (values, next) {
    var seconds = Math.floor(new Date() / 1000);
    values.autoCreatedAt = seconds;
    values.zone = 2413; // Catalunya
    values.userCreated = 1; // Hardcodegem id d'usuari (testing)
    values.graphServer = 0;
    values.notification = 'guifi@guifi.net';
    next();
  }
};
