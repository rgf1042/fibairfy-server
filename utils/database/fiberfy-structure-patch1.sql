-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 19-09-2018 a las 20:53:40
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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fiberfy_location`
--
ALTER TABLE `fiberfy_location`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fiberfy_location`
--
ALTER TABLE `fiberfy_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
