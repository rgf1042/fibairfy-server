/**
 * @module Site
 * @description Site in a civil work
 */

module.exports = {
  migrate: 'safe',
  tableName: 'guifi_location',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      size: 40,
      columnName: 'nick'
    },
    zone: {
      type: 'integer',
      columnName: 'zone_id'
    },
    latitude: {
      type: 'float',
      columnName: 'lat'
    },
    longitude: {
      type: 'float',
      columnName: 'lon'
    },
    type: {
      type: 'string',
      size: 10,
      columnName: 'location_type'
    },
    observations: {
      type: 'string',
      columnName: 'zone_description'
    },
    notification: {
      type: 'text',
      size: 1024,
      columnName: 'notification'
    },
    status: {
      type: 'string',
      size: 40,
      columnName: 'status_flag',
      defaultsTo: 'Planned'
    },
    elevation: {
      type: 'integer',
      columnName: 'elevation'
    },
    graphServer: {
      type: 'integer',
      columnName: 'graph_server',
      defaultsTo: 0
    },
    project: {
      model: 'Project',
      columnName: 'project_id'
    },
    stable: {
      type: 'string',
      size: 25,
      columnName: 'stable',
      defaultsTo: 'Yes'
    },
    userCreated: {
      type: 'integer',
      columnName: 'user_created'
    },
    userChanged: {
      type: 'integer',
      columnName: 'user_changed'
    },
    autoCreatedAt: {
      type: 'integer',
      columnName: 'timestamp_created',
    },
    autoUpdatedAt: {
      type: 'integer',
      columnName: 'timestamp_changed',
    }
  },
  beforeCreate : function (values, next) {
    var seconds = Math.floor(new Date() / 1000);
    values.autoCreatedAt = seconds;
    values.zone = 2413; // Catalunya
    values.userCreated = 1; // Hardcodegem id d'usuari (testing)
    values.graphServer = 0;
    values.notification = 'guifi@guifi.net';
  }
};
