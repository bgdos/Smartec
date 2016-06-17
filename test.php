<?php
header('Access-Control-Allow-Origin: *');
include_once('classes/station.php');
include_once('classes/reading.php');
include_once('connection/catalog.php');
    /*$s = new Reading(3);
    echo $s->getStation()->getDescription();*/
    $readings = Catalog::getReadings();
    foreach ($readings as $r)
        echo $r->getTemperature() . "     ___  ";

?>