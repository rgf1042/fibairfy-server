/**
 * @module Zone
 * @description Zone in guifi.net website
 */
module.exports = {
    migrate: 'safe',
    tableName: 'guifi_zone',
    attributes: {
        updatedAt: false,
        createdAt: false,
        title: {
            type: 'string',
        },
        nick: {
            type: 'string',
            allowNull: true,
        },
        body: {
            type: 'string',
        },
        master: {
            type: 'number',
        },
        timeZone: {
            columnName: 'time_zone',
            type: 'string',
        },
        dnsServers: {
            columnName: 'dns_servers',
            type: 'string',
            allowNull: true,
        },
        ntpServers: {
            columnName: 'ntp_servers',
            type: 'string',
            allowNull: true,
        },
        graphServer: {
            columnName: 'graph_server',
            type: 'string',
            allowNull: true,
        },
        homepage: {
            type: 'string',
            allowNull: true,
        },
        notification: {
            type: 'string',
            defaultsTo: 'guifi@guifi.net',
        },
        ospfZone: {
            columnName: 'ospf_zone',
            type: 'string',
            allowNull: true,
        },
        minx: {
            type: 'number',
            allowNull: true,
        },
        miny: {
            type: 'number',
            allowNull: true,
        },
        maxx: {
            type: 'number',
            allowNull: true,
        },
        local: {
            type: 'string',
            defaultsTo: 'Yes',
        },
        nodexchangeUrl: {
            columnName: 'nodexchange_url',
            type: 'string',
            allowNull: true,
        },
        refresh: {
            type: 'number',
            allowNull: true,
        },
        remoteServerId: {
            columnName: 'remote_server_id',
            type: 'number',
            allowNull: true,
        },
        maxy: {
            type: 'number',
            allowNull: true,
        },
        weight: {
            type: 'number',
            defaultsTo: 0,
        },
        userCreated: {
            columnName: 'user_created',
            type: 'number',
            defaultsTo: 0,
        },
        userChanged: {
            columnName: 'user_changed',
            type: 'number',
            defaultsTo: 0,
        },
        autoCreatedAt: {
            columnName: 'timestamp_created',
            type: 'number',
            defaultsTo: 0,
        },
        autoUpdatedAt: {
            columnName: 'timestamp_changed',
            type: 'number',
            defaultsTo: 0,
        },
        proxyId: {
            columnName: 'proxy_id',
            type: 'number',
            defaultsTo: 0,
        },
        voipId: {
            columnName: 'voip_id',
            type: 'number',
            defaultsTo: 0,
        },
        hostNodes: {
            columnName: 'host_nodes',
            type: 'number',
            defaultsTo: 0,
            allowNull: true,
        },
    },
    _attributes: {
        id: {
            rawType: 'MEDIUMINT(8) UNSIGNED',
            type: 'number',
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        nick: {
            rawType: 'VARCHAR(10)',
            type: 'string',
        },
        body: {
            rawType: 'string',
            type: 'string',
        },
        master: {
            rawType: 'MEDIUMINT(8) UNSIGNED',
            type: 'number',
        },
        timeZone: {
            columnName: 'time_zone',
            rawType: 'VARCHAR(15)',
            type: 'string',
        },
        dnsServers: {
            columnName: 'dns_servers',
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        ntpServers: {
            columnName: 'ntp_servers',
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        graphServer: {
            columnName: 'graph_server',
            rawType: 'VARCHAR(40)',
            type: 'string',
            comment: 'Foreign key to guifi_services (type SNPGraph)',
        },
        homepage: {
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        notification: {
            rawType: 'VARCHAR(1024)',
            type: 'string',
            defaultsTo: 'guifi@guifi.net',
        },
        ospfZone: {
            columnName: 'ospf_zone',
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        minx: {
            rawType: 'DECIMAL(10,6)',
            type: 'number',
        },
        miny: {
            rawType: 'DECIMAL(10,6)',
            type: 'number',
        },
        maxx: {
            rawType: 'DECIMAL(10,6)',
            type: 'number',
        },
        local: {
            rawType: 'VARCHAR(5)',
            type: 'string',
            defaultsTo: 'Yes',
            comment: 'Yes,No',
        },
        nodexchangeUrl: {
            columnName: 'nodexchange_url',
            rawType: 'VARCHAR(255)',
            type: 'string',
        },
        refresh: {
            rawType: 'INT(11)',
            type: 'number',
        },
        remoteServerId: {
            columnName: 'remote_server_id',
            rawType: 'MEDIUMINT(9)',
            type: 'number',
        },
        maxy: {
            rawType: 'DECIMAL(10,6)',
            type: 'number',
        },
        weight: {
            rawType: 'TINYINT(4)',
            type: 'number',
            defaultsTo: 0,
        },
        userCreated: {
            columnName: 'user_created',
            rawType: 'MEDIUMINT(9)',
            type: 'number',
            defaultsTo: 0,
        },
        userChanged: {
            columnName: 'user_changed',
            rawType: 'MEDIUMINT(9)',
            type: 'number',
            defaultsTo: 0,
        },
        autoCreatedAt: {
            columnName: 'timestamp_created',
            rawType: 'INT(11)',
            type: 'number',
            defaultsTo: 0,
        },
        autoUpdatedAt: {
            columnName: 'timestamp_changed',
            rawType: 'INT(11)',
            type: 'number',
            defaultsTo: 0,
        },
        proxyId: {
            columnName: 'proxy_id',
            rawType: 'MEDIUMINT(9)',
            type: 'number',
            defaultsTo: 0,
        },
        voipId: {
            columnName: 'voip_id',
            rawType: 'MEDIUMINT(9)',
            type: 'number',
            defaultsTo: 0,
        },
        hostNodes: {
            columnName: 'host_nodes',
            rawType: 'SMALLINT(6)',
            type: 'number',
            defaultsTo: 0,
        },
    },
};
