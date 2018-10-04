SELECT l.location_type, count(*) as 'count'
FROM guifidev.fiberfy_location l
WHERE l.project_id = 10
GROUP BY l.location_type
UNION ALL
SELECT  'total', COUNT(*)
FROM guifidev.fiberfy_location
WHERE project_id = 10;

SELECT p.type, sum(p.distance) as 'distance'
FROM guifidev.fiberfy_paths p
WHERE p.project = 10
GROUP BY p.type
UNION ALL
SELECT  'total', sum(distance)
FROM guifidev.fiberfy_paths
WHERE project = 10;

SELECT type, sum(distance) as 'distance'
FROM (SELECT DISTINCT p.distance, p.type FROM
	guifidev.fiberfy_paths p, guifidev.cable_intermedial__path_cables cp, guifidev.fiberfy_cables c
	WHERE p.project = 10 AND p.id = cp.path_cables AND c.id = cp.cable_intermedial) as unic
GROUP BY type
UNION ALL
SELECT 'total', sum(distance)
FROM (SELECT DISTINCT p.distance FROM
	guifidev.fiberfy_paths p, guifidev.cable_intermedial__path_cables cp, guifidev.fiberfy_cables c
	WHERE p.project = 10 AND p.id = cp.path_cables AND c.id = cp.cable_intermedial) as unic;
