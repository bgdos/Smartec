<?php
	session_start();
	header('Access-Control-Allow-Origin: *');
	require_once('../classes/sensor.php');
    require_once('../classes/temp_hum.php');
    require_once('../connection/catalogs.php');


  if (isset($_REQUEST['sensor']))
	{
    $sensor_id = $_REQUEST['sensor'];
		$sensor = new Sensor($sensor_id);
    $readings = Catalog::getSensorTempHumReadings($sensor_id);
    $first = true;
		if ($sensor->getDescription()!='')
		{
			$json ='
            {
                "status" : 0,
                "id" : '.$sensor_id.',
                "description" : "'.$sensor->getDescription().'",
                "sensor_status" : '.$sensor->getStatus().',
                "readings" : [';

                    foreach($readings as $r)
                    {
                        if (!$first) $json .= ','; else $first = false;
                        $json .= '
                        {
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
			echo '{ "status" : 1, "message" : "Access Denied" }';
		}
	}
	else
	{
		echo '{ "status" : 2, "message" : "Incomplete Params" }';
	}
?>
