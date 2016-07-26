<?php
	session_start();
	header('Access-Control-Allow-Origin: *');
	require_once('../clases/user.php');

	if (isset($_POST['email']) & isset($_POST['password']))
	{
		$email = $_POST['email'];
		$password = $_POST['password'];
		$user = new User($email, $password);
		if ($user->getName()!='')
		{
			$_SESSION['sesionUsuario'] = $user->getName();

			$json= ' {
						"status" : 0,
						"user_name" : "'.$user->getName().'",
						"token" : "'.generarToken($user->getName()).'"}';
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

	function generarToken($user)
	{
		$token = '';
		$zona = 'America/Tijuana';
		date_default_timezone_set($zona);
		$hoy = new DateTime();
		$argumentos = func_get_args();
		if (func_num_args() == 1)
		{
			$token = sha1($user.(date_format($hoy,'Ymd')));
		}
		return $token;
	}
?>
