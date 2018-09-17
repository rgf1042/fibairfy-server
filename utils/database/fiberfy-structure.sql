-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 14-09-2018 a las 10:28:54
-- Versión del servidor: 10.3.7-MariaDB-1:10.3.7+maria~jessie
-- Versión de PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925, 'Cable 6FO1T TIA598','[{"color":"black","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 6FO1T C2','[{"color":"black","fibers":[{"color":"green"},{"color":"red"},{"color":"blue"},{"color":"yellow"},{"color":"grey"},{"color":"purple"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 8FO1T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 12FO1T TIA598','[{"color":"black","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"},{"color":"yellow"},{"color":"purple"},{"color":"pink"},{"color":"cyan"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 16FO2T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"orange","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 32FO4T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"orange","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"green","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"brown","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 48FO6T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"orange","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"green","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"brown","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"grey","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"white","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 48FO4T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"},{"color":"yellow"},{"color":"purple"},{"color":"pink"},{"color":"cyan"}]},{"color":"orange","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"},{"color":"yellow"},{"color":"purple"},{"color":"pink"},{"color":"cyan"}]},{"color":"green","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"},{"color":"yellow"},{"color":"purple"},{"color":"pink"},{"color":"cyan"}]},{"color":"brown","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"},{"color":"yellow"},{"color":"purple"},{"color":"pink"},{"color":"cyan"}]}]');

INSERT INTO `fiberfy_fibertemplates` (createdAt, updatedAt, name, data) VALUES (1536921067925, 1536921067925,'Cable 72FO9T TIA598','[{"color":"blue","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"orange","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"green","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"brown","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"grey","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"white","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"red","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"black","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]},{"color":"yellow","fibers":[{"color":"blue"},{"color":"orange"},{"color":"green"},{"color":"brown"},{"color":"grey"},{"color":"white"},{"color":"red"},{"color":"black"}]}]');


