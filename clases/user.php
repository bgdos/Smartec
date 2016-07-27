<?php
	//use files
	require_once("../connection/connection.php");
	require_once('exceptions.php');

	class User extends Connection
	{
		//attributes
		private $email;
		private $name;
		private $password;

		//methods
		public function getEmail() { return $this->email; }
		public function setEmail($value) { $this->email = $value; }
		public function getName() { return $this->name; }
		public function setName($value) { $this->name = $value; }
		public function setPassword($value) { $this->password = $value; }

		//constructor
		function __construct()
		{
			//if no arguments received, create empty object
			if(func_num_args() == 0)
			{
				$this->email = '';
				$this->name = '';
				$this->password = '';
			}
			//if two argument received create object with data
			if(func_num_args() == 2)
			{
				//receive arguments into an array
				$args = func_get_args();
				//get arguments
				$email = $args[0];
				$password = $args[1];
				//open connection to MySql
				parent::openConnection();
				//query
				$query = "select nombre from usuarios
									where email = ? and password = sha1(?);";
				//prepare command
				$command = parent::$connection->prepare($query);
				//link parameters
				$command->bind_param('ss', $email, $password);
				//execute command
				$command->execute();
				//link results to class attributes
				$command->bind_result($this->name);
				//fetch data
				$found = $command->fetch();
				//close command
				mysqli_stmt_close($command);
				//close connection
				parent::closeConnection();
			}
		}
	}
?>
