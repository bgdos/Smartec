/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 12.1 		*/
/*  Created On : 20-Jul-2016 6:46:02 PM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0
;


/** create database **/
CREATE DATABASE smartec;
USE	smartec;

/* Create Tables */

CREATE TABLE `movimiento`
(
	`id` INT NOT NULL COMMENT 'id de la lectura',
	`ruta_foto` VARCHAR(50) NOT NULL COMMENT 'ruta de la foto (intruso)',
	`hora` TIMESTAMP NOT NULL COMMENT 'hora en que se recibio la lectura',
	`sensor_id` INT NOT NULL COMMENT 'id del sensor del que se recibe la lectura',
	CONSTRAINT `PK_movimiento` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `sensores`
(
	`id` INT NOT NULL AUTO_INCREMENT COMMENT 'id del sensor',
	`descripcion` VARCHAR(50) NOT NULL COMMENT 'descripcion del sensor',
	`estado` BOOL NOT NULL COMMENT 'estado del sensor (encendido / apagado)',
	CONSTRAINT `PK_sensores` PRIMARY KEY (`id` ASC)
)

;
INSERT INTO `sensores`(`descripcion` , `estado`) VALUES ('Sensor de temperatura/humedad', 1);
INSERT INTO `sensores`(`descripcion`, `estado`) VALUES ('sensor de movimiento',1);

CREATE TABLE `temp_hum`
(
	`id` INT NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla',
	`sensor_id` INT NOT NULL COMMENT 'id del sensor que envia el dato',
	`temperatura` FLOAT(0,0) NOT NULL COMMENT 'lectura de la temperatura',
	`humedad` FLOAT(0,0) NOT NULL COMMENT 'lectura de la humedad',
	`hora` TIMESTAMP NOT NULL COMMENT 'hora en que se recibieron las lecturas',
	CONSTRAINT `PK_temp_hum` PRIMARY KEY (`id` ASC)
)

;
INSERT INTO `temp_hum`(`sensor_id`, `temperatura`, `humedad`, `hora`) VALUES(1, 25.5, 48.3, '2016-07-28 03:14:07.999999');
INSERT INTO `temp_hum`(`sensor_id`, `temperatura`, `humedad`, `hora`) VALUES(1, 26.3, 47.5, '2016-07-28 03:18:09.5');

CREATE TABLE `usuarios`
(
	`email` VARCHAR(50) NOT NULL COMMENT 'Correo del usuario',
	`password` VARCHAR(50) NOT NULL COMMENT 'Password del Usuario',
	`nombre` VARCHAR(50) NOT NULL COMMENT 'nombre del Usuario',
	CONSTRAINT `PK_Usuarios` PRIMARY KEY (`email` ASC)
)

;
INSERT INTO `usuarios`(`email`, `password`, `nombre`) VALUES ("juansutt@hotmail.com",sha1("abc123"),"Juan Salgado");
INSERT INTO `usuarios`(`email`, `password`, `nombre`) VALUES ("francisco_dza@hotmail.com",sha1("abc123"),"Francisco Avila");

INSERT INTO `movimiento` (`id`, `ruta_foto`, `hora`, `sensor_id`) VALUES ('1', 'pics/1.png', CURRENT_TIMESTAMP, '2'), ('2', 'pics/2.png', CURRENT_TIMESTAMP, '2'), ('3', 'pics/3.gif', CURRENT_TIMESTAMP, '2');
/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `movimiento`
 ADD INDEX `IXFK_movimiento_sensores` (`sensor_id` ASC)
;

ALTER TABLE `sensores`
 ADD INDEX `IXFK_sensores_sensores` (`id` ASC)
;

ALTER TABLE `temp_hum`
 ADD INDEX `IXFK_temp_hum_sensores` (`sensor_id` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `movimiento`
 ADD CONSTRAINT `FK_movimiento_sensores`
	FOREIGN KEY (`sensor_id`) REFERENCES `sensores` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `temp_hum`
 ADD CONSTRAINT `FK_temp_hum_sensores`
	FOREIGN KEY (`sensor_id`) REFERENCES `sensores` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1
;
