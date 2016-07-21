<?php
require_once ('Sensores.php');
require_once ('Conexión.php');




use ;
use ;
/**
 * @author franc
 * @version 1.0
 * @created 20-Jul-2016 6:54:23 PM
 */
class Temp_Hum
{

	private $hora;
	private $humedad;
	private $id;
	private $temperatura;
	public $m_Conexión;

	function __construct()
	{
	}

	function __destruct()
	{
	}



	public function gethora()
	{
	}

	public function gethumedad()
	{
	}

	public function gettemperatura()
	{
	}

	/**
	 * 
	 * @param Hora
	 */
	public function sethora(timestamp $Hora)
	{
	}

	/**
	 * 
	 * @param Humedad
	 */
	public function sethumedad(float $Humedad)
	{
	}

	/**
	 * 
	 * @param Temperatura
	 */
	public function settemperatura(float $Temperatura)
	{
	}

	/**
	 * 
	 * @param id
	 */
	public function temp_hum(int $id)
	{
	}

}
?>