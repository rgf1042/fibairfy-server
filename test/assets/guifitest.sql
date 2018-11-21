-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 31-10-2018 a las 14:49:18
-- Versión del servidor: 10.3.7-MariaDB-1:10.3.7+maria~jessie
-- Versión de PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guifidev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cable_intermedial__path_cables`
--

CREATE TABLE `cable_intermedial__path_cables` (
  `id` int(11) NOT NULL,
  `cable_intermedial` int(11) DEFAULT NULL,
  `path_cables` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_boxes`
--

CREATE TABLE `fiberfy_boxes` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `inputFO` double DEFAULT NULL,
  `outputFO` double DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_cables`
--

CREATE TABLE `fiberfy_cables` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `first` int(11) DEFAULT NULL,
  `last` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_fibers`
--

CREATE TABLE `fiberfy_fibers` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `tube` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_fibertemplates`
--

CREATE TABLE `fiberfy_fibertemplates` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `data` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_fusions`
--

CREATE TABLE `fiberfy_fusions` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `fdata` longtext DEFAULT NULL,
  `sdata` longtext DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_location`
--

CREATE TABLE `fiberfy_location` (
  `id` int(11) NOT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `zone_description` varchar(255) DEFAULT NULL,
  `location_type` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `elevation` double DEFAULT NULL,
  `notification` varchar(255) DEFAULT NULL,
  `status_flag` varchar(255) DEFAULT NULL,
  `stable` varchar(255) DEFAULT NULL,
  `graph_server` double DEFAULT NULL,
  `user_created` double DEFAULT NULL,
  `user_changed` double DEFAULT NULL,
  `timestamp_created` double DEFAULT NULL,
  `timestamp_changed` double DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_map_layers`
--

CREATE TABLE `fiberfy_map_layers` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `weight` mediumint(8) NOT NULL,
  `isBase` tinyint(1) DEFAULT NULL,
  `options` longtext DEFAULT NULL,
  `map` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- We add new column to map_layers
--

ALTER TABLE `fiberfy_map_layers` ADD `auth` TINYINT(1) NULL AFTER `weight`;

--
-- Volcado de datos para la tabla `fiberfy_map_layers`
--

INSERT INTO `fiberfy_map_layers` (`createdAt`, `updatedAt`, `id`, `name`, `description`, `weight`, `auth`, `isBase`, `options`, `map`) VALUES
(1536921067925, 1536921067925, 1, 'Llocs', 'Obra cívil localitzacions', 50, 1, 0, '{\"format\": \"image/png\",\"transparent\": true, \"version\": \"1.1.1\", \"uppercase\": true,\"layers\": \"Sites\",\"attribution\":\"Guifi.net FO\"}', 1),
(1536921067925, 1536921067925, 2, 'Satelit', 'Vistes aeries Google Maps', 100, 0, 1, '{\"subdomains\":[\"mt0\", \"mt1\", \"mt2\", \"mt3\"],\"path\":\"lyrs=s&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 3, 'Topografic', 'Topogràfic de Google Maps', 100, 0, 1, '{\"subdomains\":[\"mt0\", \"mt1\", \"mt2\", \"mt3\"],\"path\":\"lyrs=p&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 4, 'Viari', 'Mapa viari de Google Maps', 100, 0, 1, '{\"subdomains\":[\"mt0\", \"mt1\", \"mt2\", \"mt3\"],\"path\":\"lyrs=m&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 5, 'Viari', 'Mapa viari d\'OpenStreetMap.org', 1, 0, 1, '{\"path\":\"{z}/{x}/{y}.png\",\"maxZoom\":20,\"attribution\":\"<a href=\\\"http://openstreetmap.org\\\">&copy; OpenStreetMap</a>, <a href=\\\"http://creativecommons.org/licenses/by-sa/2.0/\\\">CC-BY-SA</a>\"}', 3),
(1536921067925, 1536921067925, 6, 'Trams de fibra', 'Obra civil trams', 60, 1, 0, '{\"format\": \"image/png\",\"transparent\": true, \"version\": \"1.1.1\", \"uppercase\": true,\"layers\": \"Paths\",\"attribution\":\"Guifi.net FO\"}', 1),
(1536921067925, 1536921067925, 7, 'Enllaços radio', 'Enllaços de radio de Guifi.net', 100, 0, 0, '{\"format\": \"image/png\",\"transparent\": true, \"version\": \"1.1.1\", \"uppercase\": true,\"layers\": \"Links\",\"attribution\":\"Guifi.net Radio\"}', 1),
(1536921067925, 1536921067925, 8, 'Nodes', 'Nodes de Guifi.net', 70, 0, 0, '{\"format\": \"image/png\",\"transparent\": true, \"version\": \"1.1.1\", \"uppercase\": true,\"layers\": \"Nodes\",\"attribution\":\"Guifi.net Radio\"}', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_map_sources`
--

CREATE TABLE `fiberfy_map_sources` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `internal` tinyint(1) DEFAULT NULL,
  `weight` mediumint(8) NOT NULL,
  `options` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fiberfy_map_sources`
--

INSERT INTO `fiberfy_map_sources` (`createdAt`, `updatedAt`, `id`, `name`, `description`, `type`, `url`, `internal`, `weight`, `options`) VALUES
(1536921067925, 1536921067925, 1, 'Guifi WMS Maps', 'Mapes de Guifi.net', 'wms', 'http://gmaps/cgi-bin/mapserv?map=/home/guifi/maps.guifi.net/guifimaps/GMap.map', 1, 100, '{\"crs\":\"EPSG:3857\"}'),
(1536921067925, 1536921067925, 2, 'Google Maps', 'Google Maps tiles', 'tiles', 'https://{s}.google.com/vt/', 0, 100, NULL),
(1536921067925, 1536921067925, 3, 'OpenStreetMap.org', 'Mapes d\'OpenStreetMap.org', 'tiles', 'https://{s}.tile.openstreetmap.org/', 0, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_paths`
--

CREATE TABLE `fiberfy_paths` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `intermedial` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `distance` double DEFAULT NULL,
  `first` int(11) DEFAULT NULL,
  `last` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_projects`
--

CREATE TABLE `fiberfy_projects` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `zoom` double DEFAULT NULL,
  `defaultZone` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_projects_ownership`
--

CREATE TABLE `fiberfy_projects_ownership` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `project` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_tubes`
--

CREATE TABLE `fiberfy_tubes` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `cable` int(11) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiberfy_users`
--

CREATE TABLE `fiberfy_users` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isLdap` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guifi_zone`
--

CREATE TABLE `guifi_zone` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `master` double DEFAULT NULL,
  `time_zone` varchar(255) DEFAULT NULL,
  `dns_servers` varchar(255) DEFAULT NULL,
  `ntp_servers` varchar(255) DEFAULT NULL,
  `graph_server` varchar(255) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `notification` varchar(255) DEFAULT NULL,
  `ospf_zone` varchar(255) DEFAULT NULL,
  `minx` double DEFAULT NULL,
  `miny` double DEFAULT NULL,
  `maxx` double DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  `nodexchange_url` varchar(255) DEFAULT NULL,
  `refresh` double DEFAULT NULL,
  `remote_server_id` double DEFAULT NULL,
  `maxy` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `user_created` double DEFAULT NULL,
  `user_changed` double DEFAULT NULL,
  `timestamp_created` double DEFAULT NULL,
  `timestamp_changed` double DEFAULT NULL,
  `proxy_id` double DEFAULT NULL,
  `voip_id` double DEFAULT NULL,
  `host_nodes` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cable_intermedial__path_cables`
--
ALTER TABLE `cable_intermedial__path_cables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_boxes`
--
ALTER TABLE `fiberfy_boxes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_cables`
--
ALTER TABLE `fiberfy_cables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_fibers`
--
ALTER TABLE `fiberfy_fibers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_fibertemplates`
--
ALTER TABLE `fiberfy_fibertemplates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_fusions`
--
ALTER TABLE `fiberfy_fusions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_location`
--
ALTER TABLE `fiberfy_location`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_map_layers`
--
ALTER TABLE `fiberfy_map_layers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_map_sources`
--
ALTER TABLE `fiberfy_map_sources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_paths`
--
ALTER TABLE `fiberfy_paths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_projects`
--
ALTER TABLE `fiberfy_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_projects_ownership`
--
ALTER TABLE `fiberfy_projects_ownership`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_tubes`
--
ALTER TABLE `fiberfy_tubes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `fiberfy_users`
--
ALTER TABLE `fiberfy_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `guifi_zone`
--
ALTER TABLE `guifi_zone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cable_intermedial__path_cables`
--
ALTER TABLE `cable_intermedial__path_cables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_boxes`
--
ALTER TABLE `fiberfy_boxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_cables`
--
ALTER TABLE `fiberfy_cables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_fibers`
--
ALTER TABLE `fiberfy_fibers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_fibertemplates`
--
ALTER TABLE `fiberfy_fibertemplates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_fusions`
--
ALTER TABLE `fiberfy_fusions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_location`
--
ALTER TABLE `fiberfy_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_map_layers`
--
ALTER TABLE `fiberfy_map_layers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `fiberfy_map_sources`
--
ALTER TABLE `fiberfy_map_sources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `fiberfy_paths`
--
ALTER TABLE `fiberfy_paths`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_projects`
--
ALTER TABLE `fiberfy_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_projects_ownership`
--
ALTER TABLE `fiberfy_projects_ownership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_tubes`
--
ALTER TABLE `fiberfy_tubes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fiberfy_users`
--
ALTER TABLE `fiberfy_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guifi_zone`
--
ALTER TABLE `guifi_zone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
