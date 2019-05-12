/**
 * StatsController
 *
 * @description :: Server-side logic for getting statistics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    project: async function(req, res) {
        let id = req.param('id');
        if (!id) {
            return res.badRequest('No project id was supplied.');
        }

        // First we validate project
        let project;
        try {
            project = await Project.findOne(id);
        } catch (err) {
            res.serverError(e);
        }

        if (!project)
            res.badRequest({ msg: 'There is no project with given id.' });

        let datastore = sails.getDatastore(sails.config.models.datastore);

        let LOCATION_STATS_SQL = `
      SELECT l.${Site.schema.type.columnName}, count(*) as 'count'
      FROM ${Site.tableName} l
      WHERE l.${Site.schema.project.columnName} = $1
      GROUP BY l.${Site.schema.type.columnName}
      UNION ALL
      SELECT 'total', COUNT(*)
      FROM ${Site.tableName}
      WHERE ${Site.schema.project.columnName} = $1`;

        let PATH_STATS_SQL = `SELECT p.${Path.schema.type.columnName}, sum(p.${
            Path.schema.distance.columnName
        }) as 'distance'
      FROM ${Path.tableName} p
      WHERE p.${Path.schema.project.columnName} = $1
      GROUP BY p.${Path.schema.type.columnName}
      UNION ALL
      SELECT 'total', sum(${Path.schema.distance.columnName})
      FROM ${Path.tableName}
      WHERE ${Path.schema.project.columnName} = $1`;

        let CABLE_STATS_SQL = `SELECT DISTINCT ${
            Path.schema.type.columnName
        }, sum(${Path.schema.distance.columnName}) as 'distance'
      FROM (SELECT DISTINCT p.${Path.schema.type.columnName}, p.${
            Path.schema.distance.columnName
        }
        FROM ${Path.tableName} p, cable_intermedial__path_cables cp, ${
            Cable.tableName
        } c
        WHERE p.${Path.schema.project.columnName} = $1 AND p.${
            Path.schema.id.columnName
        } = cp.path_cables AND c.${
            Cable.schema.id.columnName
        } = cp.cable_intermedial) as unic
      GROUP BY ${Path.schema.type.columnName}
      UNION ALL
      SELECT DISTINCT 'total', sum(${Path.schema.distance.columnName})
      FROM (SELECT DISTINCT p.${Path.schema.distance.columnName}
        FROM ${Path.tableName} p, cable_intermedial__path_cables cp, ${
            Cable.tableName
        } c
        WHERE p.${Path.schema.project.columnName} = $1 AND p.${
            Path.schema.id.columnName
        } = cp.path_cables AND c.${
            Cable.schema.id.columnName
        } = cp.cable_intermedial) as unic`;

        let locationResult, pathResult;
        try {
            locationResult = await datastore.sendNativeQuery(
                LOCATION_STATS_SQL,
                [project.id]
            );
            pathResult = await datastore.sendNativeQuery(PATH_STATS_SQL, [
                project.id,
            ]);
            cableResult = await datastore.sendNativeQuery(CABLE_STATS_SQL, [
                project.id,
            ]);
        } catch (err) {
            res.serverError(err);
        }

        let result = {
            sites: locationResult.rows,
            paths: pathResult.rows,
            cables: cableResult.rows,
        };

        res.ok(result);
    },
};
