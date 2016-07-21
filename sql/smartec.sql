CREATE DATABASE smartec;
USE	smartec;

CREATE TABLE usuarios(
	email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL.
    CONSTRAINT `PK_email` PRIMARY KEY(email)
);

CREATE TABLE sensores(
	id INT NOT NULL AUTO_INCREMENT,
	descripcion VARCHAR(50) NOT NULL,
	estado BOOL NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE temp_hum(
	id INT NOT NULL AUTO_INCREMENT,
	sensor_id INT NOT NULL,
	temperatura FLOAT NOT NULL,,
	hora TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `temp_hum`
  ADD CONSTRAINT `fk_temp_hum_sensores` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

  CREATE TABLE movimiento(
	id INT NOT NULL AUTO_INCREMENT,
	sensor_id INT NOT NULL,
	ruta_foto VARCHAR(50) NOT NULL,,
	hora TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `movimiento`
  ADD CONSTRAINT `fk_movimiento_sensores` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);