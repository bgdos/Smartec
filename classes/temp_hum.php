<?php
    include_once('../connection/connection.php');
    include_once('sensor.php');
    class Temp_hum extends Connection
    {
        /** attributes **/
        private $id, $date, $temperature, $humidity, $sensor;
        
        /** functions **/
        public function setId($value) { $this->id = $value; }
        public function getId() { return $this->id; }
        public function setDate($value) { $this->date = $value; }
        public function getDate() { return $this-> date; }
        public function setTemperature($value) { $this->temperature = $value; }
        public function getTemperature() { return $this->temperature; }
        public function setHumidity($value) { $this->humidity = $value; }
        public function getHumidity() { return $this->humidity; }
        public function setSensor($value) { $this->sensor = new Sensor($value); }
        public function getSensor() { return $this->sensor; }
        
        /** constructor **/
        function __construct()
        {
            $num = func_num_args();
            $args = func_get_args();
            if ($num == 0)
            {
                $this->id = 0;
                $this->date = '';
                $this->temperature = '';
                $this->sensor = new Sensor();
            }
            if ($num == 1)
            {
                $id = $args[0];
                $instruction = 'SELECT temperatura, humedad, sensor_id, hora FROM temp_hum WHERE id = ?';
                parent::openConnection();
                $command = parent::$connection->prepare($instruction);
                $command->bind_param('i', $id);
                $command->execute();
                $command->bind_result($temperature, $humidity, $sensor, $date);
                $found = $command->fetch();
                mysqli_stmt_close($command);
                parent::closeConnection();
                if ($found)
                {
                    $this->id = $id;
                    $this->date = $date;
                    $this->temperature = $temperature;
                    $this->humidity = $humidity;
                    $this->sensor = new Sensor($sensor);
                }
                else
                {
                    $this->id = 0;
                    $this->date = '';
                    $this->temperature = '';
                    $this->humidity = $humidity;
                    $this->sensor = new Sensor();
                }
            }
            echo $this->temperature;
        }
        public function getWeekAverages()
        {
            $instruction = 'SELECT 
            avg(case when `reading_id_station` = 1 then `reading_temperature` else null end) as Station1,
            avg(case when `reading_id_station` = 2 then `reading_temperature` else null end) as Station2,
            avg(case when `reading_id_station` = 3 then `reading_temperature` else null end) as Station3
            FROM readings 
            Where YEARWEEK (`reading_date`) = YEARWEEK(current_date)';
            parent::openConnection();
            $command = parent::$connection->prepare($instruction);
            $command->execute();
            $command->bind_result($s1, $s2, $s3);
            $found = $command->fetch();
            mysqli_stmt_close($command);
            parent::closeConnection();
            $averages = new ArrayObject();
            if ($found)
            {
                $averages['station1'] = $s1;
                $averages['station2'] = $s2;
                $averages['station3'] = $s3;
            }
            else
            {
                $averages['station1'] = 0;
                $averages['station2'] = 0;
                $averages['station3'] = 0;
            }
            return $averages;
            
        }
    }
?>