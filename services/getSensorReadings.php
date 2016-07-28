<?php
	
	header('Access-Control-Allow-Origin: *');
	require_once('../classes/sensor.php');
    require_once('../classes/temp_hum.php');
    require_once('../connection/catalogs.php');


    if (isset($_GET['sensor']))
	{
        $sensor_id = $_GET['sensor'];
		$sensor = new Sensor($sensor_id);
        $readings = Catalog::getSensorReadings($sensor_id);
        $first = true;
        $json= '{';
		if ($sensor->getDescription()!='')
		{
			$json .= '"status" : 0,
                    "id" : '.$sensor_id.',
                    "description" : "'.$sensor->getDescription().'",
                    "status" : '.$sensor->getStatus().',
                    "readings" : [';

                    foreach($readings as $r)
                    {
                        if (!$first) $json .= ','; else $first = false;
                        $json .= '{ 
                                "id" : '.$r->getId().',
                                "date" : "'.$r->getDate().'",
                                "temperature" : '.$r->getTemperature().',
                                "humidity" : '.$r->getHumidity().'
                            }';
                    }
                    $json .= ']
                    }';
            echo $json;
		}
		else
		{
			echo '{ "status" : 1, "error" : "Acceso Denegado" }';
		}
	}
	else
	{
		echo '{ "status" : 2, "error" : "Parametros Incompletos" }';
	}
?>