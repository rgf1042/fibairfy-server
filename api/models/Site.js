/**
 * @module Site
 * @description Site in a civil work
 */

module.exports = {
  migrate: 'safe',
  tableName: 'guifi_location',
  attributes: {
    updatedAt: false,
    createdAt: false,
    name: {
      columnName: 'nick',
      type: 'string'
    },
    zone: {
      columnName: 'zone_id',
      model: 'Zone'
    },
    observations: {
      columnName: 'zone_description',
      type: 'string',
      allowNull: true
    },
    type: {
      columnName: 'location_type',
      type: 'string',
      defaultsTo: 'notdefined',
      /* isIn: [
        'notdefined',
        'manhole',
        'pole',
        'room',
        'cabinet',
        'poe',
        'hook',
        'jump'
      ] */
    },
    latitude: {
      columnName: 'lat',
      type: 'number',
      allowNull: true
    },
    longitude: {
      columnName: 'lon',
      type: 'number',
      allowNull: true
    },
    elevation: {
      type: 'number',
      allowNull: true
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
      type: 'number',
      defaultsTo: 0
    },
    userCreated: {
      columnName: 'user_created',
      type: 'number',
      defaultsTo: 1
    },
    userChanged: {
      columnName: 'user_changed',
      type: 'number',
      allowNull: true
    },
    autoCreatedAt: {
      columnName: 'timestamp_created',
      type: 'number',
      defaultsTo: 0
    },
    autoUpdatedAt: {
      columnName: 'timestamp_changed',
      type: 'number',
      allowNull: true
    }
  },
  _attributes: {
    id: {
      rawType: 'MEDIUMINT(9)',
      type: 'number',
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
      type: 'number',
      defaultsTo: 2413
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
      type: 'number'
    },
    longitude: {
      rawType: 'DECIMAL(10,6)',
      type: 'number'
    },
    elevation: {
      rawType: 'TINYINT(4)',
      type: 'number'
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
      type: 'number'
    },
    stable: {
      rawType: 'VARCHAR(25)',
      type: 'string',
      defaultsTo: 'Yes'
    },
    graphServer: {
      columnName: 'graph_server',
      rawType: 'MEDIUMINT(9)',
      type: 'number',
      defaultsTo: 0,
      comment: 'Foreign key to guifi_services (type SNPGraph)'
    },
    userCreated: {
      columnName: 'user_created',
      rawType: 'MEDIUMINT(9)',
      type: 'number',
      defaultsTo: 0
    },
    userChanged: {
      columnName: 'user_changed',
      rawType: 'MEDIUMINT(9)',
      type: 'number'
    },
    autoCreatedAt: {
      columnName: 'timestamp_created',
      rawType: 'INT(11)',
      type: 'number',
      defaultsTo: 0
    },
    autoUpdatedAt: {
      columnName: 'timestamp_changed',
      rawType: 'INT(11)',
      type: 'number'
    },
    toJSON: function () {
      const model = this.toObject();
      if (model.type === 'node') return false;
      return model;
    }
  },
  beforeCreate : function (values, next) {
    var seconds = Math.floor(new Date() / 1000);
    values.autoCreatedAt = seconds;
    values.userCreated = 1; // Hardcodegem id d'usuari (testing)
    values.graphServer = 0;
    values.notification = 'guifi@guifi.net';
    next();
  },
  beforeUpdate : function (values, next) {
    var seconds = Math.floor(new Date() / 1000);
    values.autoUpdatedAt = seconds;
    next();
  }
};
