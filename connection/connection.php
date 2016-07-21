<?php
	class Connection
	{
		private static $server = 'localhost';
		private static $data_base = 'callcenter';
		private static $user = 'root';
		private static $password = '';
		protected static $connection;
		
		protected static function openConnection()
		{
			self::$connection = new mysqli(self::$server, self::$user, self::$password, self::$data_base);
			if (self::$connection->connect_errno) 
			{ 
				echo 'Error al conectarse al servidor de MySQL : '.self::$connection->connect_error;
				die;
			}
		}
		protected static function closeConnection()
		{
			self::$connection->close();
		}
	}
?>
