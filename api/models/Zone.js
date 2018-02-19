/**
 * @module Zone
 * @description Zone in guifi.net website
 */
module.exports = {
 migrate: 'safe',
 tableName: 'guifi_zone',
 autoUpdatedAt: false,
 autoCreatedAt: false,
 attributes: {
   id: {
     type: 'integer',
     primaryKey: true,
     autoIncrement: true
   },
   title: {
     type: 'string'
   },
   nick: {
     type: 'string'
   },
   body: {
     type: 'longtext'
   },
   master: {
     type: 'integer'
   },
   timeZone: {
     columnName: 'time_zone',
     type: 'string'
   },
   dnsServers: {
     columnName: 'dns_servers',
     type: 'string'
   },
   ntpServers: {
     columnName: 'ntp_servers',
     type: 'string'
   },
   graphServer: {
     columnName: 'graph_server',
     type: 'string'
   },
   homepage: {
     type: 'string'
   },
   notification: {
     type: 'string',
     defaultsTo: 'guifi@guifi.net'
   },
   ospfZone: {
     columnName: 'ospf_zone',
     type: 'string'
   },
   minx: {
     type: 'float'
   },
   miny: {
     type: 'float'
   },
   maxx: {
     type: 'float'
   },
   local: {
     type: 'string',
     defaultsTo: 'Yes'
   },
   nodexchangeUrl: {
     columnName: 'nodexchange_url',
     type: 'string'
   },
   refresh: {
     type: 'integer'
   },
   remoteServerId: {
     columnName: 'remote_server_id',
     type: 'integer'
   },
   maxy: {
     type: 'float'
   },
   weight: {
     type: 'integer',
     defaultsTo: 0
   },
   userCreated: {
     columnName: 'user_created',
     type: 'integer',
     defaultsTo: 0
   },
   userChanged: {
     columnName: 'user_changed',
     type: 'integer',
     defaultsTo: 0
   },
   autoCreatedAt: {
     columnName: 'timestamp_created',
     type: 'integer',
     defaultsTo: 0
   },
   autoUpdatedAt: {
     columnName: 'timestamp_changed',
     type: 'integer',
     defaultsTo: 0
   },
   proxyId: {
     columnName: 'proxy_id',
     type: 'integer',
     defaultsTo: 0
   },
   voipId: {
     columnName: 'voip_id',
     type: 'integer',
     defaultsTo: 0
   },
   hostNodes: {
     columnName: 'host_nodes',
     type: 'integer',
     defaultsTo: 0
   }
 },
 _attributes: {
   id: {
     rawType: 'MEDIUMINT(8) UNSIGNED',
     type: 'integer',
     primaryKey: true,
     autoIncrement: true
   },
   title: {
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   nick: {
     rawType: 'VARCHAR(10)',
     type: 'string'
   },
   body: {
     rawType: 'LONGTEXT',
     type: 'longtext'
   },
   master: {
     rawType: 'MEDIUMINT(8) UNSIGNED',
     type: 'integer'
   },
   timeZone: {
     columnName: 'time_zone',
     rawType: 'VARCHAR(15)',
     type: 'string'
   },
   dnsServers: {
     columnName: 'dns_servers',
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   ntpServers: {
     columnName: 'ntp_servers',
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   graphServer: {
     columnName: 'graph_server',
     rawType: 'VARCHAR(40)',
     type: 'string',
     comment: 'Foreign key to guifi_services (type SNPGraph)'
   },
   homepage: {
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   notification: {
     rawType: 'VARCHAR(1024)',
     type: 'string',
     defaultsTo: 'guifi@guifi.net'
   },
   ospfZone: {
     columnName: 'ospf_zone',
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   minx: {
     rawType: 'DECIMAL(10,6)',
     type: 'float'
   },
   miny: {
     rawType: 'DECIMAL(10,6)',
     type: 'float'
   },
   maxx: {
     rawType: 'DECIMAL(10,6)',
     type: 'float'
   },
   local: {
     rawType: 'VARCHAR(5)',
     type: 'string',
     defaultsTo: 'Yes',
     comment: 'Yes,No'
   },
   nodexchangeUrl: {
     columnName: 'nodexchange_url',
     rawType: 'VARCHAR(255)',
     type: 'string'
   },
   refresh: {
     rawType: 'INT(11)',
     type: 'integer'
   },
   remoteServerId: {
     columnName: 'remote_server_id',
     rawType: 'MEDIUMINT(9)',
     type: 'integer'
   },
   maxy: {
     rawType: 'DECIMAL(10,6)',
     type: 'float'
   },
   weight: {
     rawType: 'TINYINT(4)',
     type: 'integer',
     defaultsTo: 0
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
     type: 'integer',
     defaultsTo: 0
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
     type: 'integer',
     defaultsTo: 0
   },
   proxyId: {
     columnName: 'proxy_id',
     rawType: 'MEDIUMINT(9)',
     type: 'integer',
     defaultsTo: 0
   },
   voipId: {
     columnName: 'voip_id',
     rawType: 'MEDIUMINT(9)',
     type: 'integer',
     defaultsTo: 0
   },
   hostNodes: {
     columnName: 'host_nodes',
     rawType: 'SMALLINT(6)',
     type: 'integer',
     defaultsTo: 0
   }
 }
}
