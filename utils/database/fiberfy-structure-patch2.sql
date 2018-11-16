-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 14-11-2018 a las 14:54:44
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
-- Estructura de tabla para la tabla `fiberfy_map_layers`
--

CREATE TABLE `fiberfy_map_layers` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isBase` tinyint(1) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `options` longtext DEFAULT NULL,
  `map` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fiberfy_map_layers`
--

INSERT INTO `fiberfy_map_layers` (`createdAt`, `updatedAt`, `id`, `name`, `description`, `isBase`, `weight`, `options`, `map`) VALUES
(1536921067925, 1536921067925, 1, 'Llocs', 'Obra cívil localitzacions', 0, 50, '{\"format\":\"image/png\",\"transparent\":true,\"version\":\"1.1.1\",\"uppercase\":true,\"layers\":\"Sites\",\"attribution\":\"Guifi.net FO\"}', 1),
(1536921067925, 1536921067925, 2, 'Satelit', 'Vistes aeries Google Maps', 1, 100, '{\"subdomains\":[\"mt0\",\"mt1\",\"mt2\",\"mt3\"],\"path\":\"lyrs=s&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 3, 'Topografic', 'Topogràfic de Google Maps', 1, 100, '{\"subdomains\":[\"mt0\",\"mt1\",\"mt2\",\"mt3\"],\"path\":\"lyrs=p&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 4, 'Viari', 'Mapa viari de Google Maps', 1, 100, '{\"subdomains\":[\"mt0\",\"mt1\",\"mt2\",\"mt3\"],\"path\":\"lyrs=m&x={x}&y={y}&z={z}\",\"attribution\":\"<a href=\\\"http://maps.google.es\\\">&copy; Google Maps</a> contributors\"}', 2),
(1536921067925, 1536921067925, 5, 'Viari', 'Mapa viari d\'OpenStreetMap.org', 1, 1, '{\"path\":\"{z}/{x}/{y}.png\",\"maxZoom\":20,\"attribution\":\"<a href=\\\"http://openstreetmap.org\\\">&copy; OpenStreetMap</a>, <a href=\\\"http://creativecommons.org/licenses/by-sa/2.0/\\\">CC-BY-SA</a>\"}', 3),
(1536921067925, 1536921067925, 6, 'Trams de fibra', 'Obra civil trams', 0, 60, '{\"format\":\"image/png\",\"transparent\":true,\"version\":\"1.1.1\",\"uppercase\":true,\"layers\":\"Paths\",\"attribution\":\"Guifi.net FO\"}', 1),
(1536921067925, 1536921067925, 7, 'Enllaços radio', 'Enllaços de radio de Guifi.net', 0, 100, '{\"format\":\"image/png\",\"transparent\":true,\"version\":\"1.1.1\",\"uppercase\":true,\"layers\":\"Links\",\"attribution\":\"Guifi.net Radio\"}', 1),
(1536921067925, 1536921067925, 8, 'Nodes', 'Nodes de Guifi.net', 0, 70, '{\"format\":\"image/png\",\"transparent\":true,\"version\":\"1.1.1\",\"uppercase\":true,\"layers\":\"Nodes\",\"attribution\":\"Guifi.net Radio\"}', 1);

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
  `weight` double DEFAULT NULL,
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
-- Estructura de tabla para la tabla `fiberfy_requests_log`
--

CREATE TABLE `fiberfy_requests_log` (
  `createdAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `params` longtext DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `fiberfy_requests_log`
--
ALTER TABLE `fiberfy_requests_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `fiberfy_requests_log`
--
ALTER TABLE `fiberfy_requests_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
