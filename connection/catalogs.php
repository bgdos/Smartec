<?php
    include_once('connection.php');
    include_once('../classes/temp_hum.php');
    class Catalog extends Connection
    {
        public static function getSensorTempHumReadings($i)
        {
            $ids = array();
            $readings = array();
            $instruction = 'SELECT id FROM temp_hum WHERE date(`hora`) = curdate() AND sensor_id = ? ORDER BY id DESC LIMIT 10';
            parent::openConnection();
            $command = parent::$connection->prepare($instruction);
            $command->bind_param('i', $i);
            $command->execute();
            $command->bind_result($id);
            while ($command->fetch()) array_push($ids, $id);
            mysqli_stmt_close($command);
            parent::closeConnection();
            foreach ($ids as $id) array_push($readings, new Temp_hum($id));
            return $readings;
        }
        public static function getSensorMovementReadings($i)
        {
            $ids = array();
            $readings = array();
            $instruction = 'SELECT id FROM `movimiento` WHERE date(`hora`) = curdate() AND sensor_id = ? ORDER BY id DESC LIMIT 10';
            parent::openConnection();
            $command = parent::$connection->prepare($instruction);
            $command->bind_param('i', $i);
            $command->execute();
            $command->bind_result($id);
            while ($command->fetch()) array_push($ids, $id);
            mysqli_stmt_close($command);
            parent::closeConnection();
            foreach ($ids as $id) array_push($readings, new Movement($id));
            return $readings;
        }
    }
?>
