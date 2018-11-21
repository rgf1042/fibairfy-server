ALTER TABLE `fiberfy_map_layers` ADD `auth` TINYINT(1) NULL AFTER `weight`;

ALTER TABLE `fiberfy_map_layers` ADD `wmsLayer` VARCHAR(255) NULL AFTER `auth`;
