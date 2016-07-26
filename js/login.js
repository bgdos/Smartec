
var urlServidor = 'http://localhost/smartec/';
var token ='';
var x = new XMLHttpRequest();
var login;
var url= urlServidor + 'servicios/gettoken.php';


function obtenerToken()
{
	x.open('POST', url, true);
	var datos = new FormData(getElement('loginForm'));

	x.onreadystatechange = function()
	{
		if (x.status == 200 & x.readyState == 4)
		{
			var respuesta = x.responseText;
			var respuestaJSON = JSON.parse(respuesta);
			if (respuestaJSON.status == 0)
			{
				sessionStorage.username = respuestaJSON.username;
				sessionStorage.email = respuestaJSON.email;
				sessionStorage.token = respuestaJSON.token;
				window.location = 'index.html';
			}
			else
			{
				window.location = 'login.html#error';
				$('.alert').show();
			}
		}
	}
	x.send(datos);
}
function cerrarSesion()
{
	sessionStorage.clear();
}
function validar()
{
	if(sessionStorage.fechaRegistro != '' && sessionStorage.fechaBaja == '')/*SI LA FECHA DE BAJA AUN NO ESTA REGISTRADA, EL USUARIO SI EXISTE*/
	{
		if(sessionStorage.idTipoPersonal == 1)
		{
			if (window.location.href != urlServidor + 'proveedor.html')
				window.location = 'proveedor.html';
		}
		else if(sessionStorage.idTipoPersonal == 2)
		{
			if (window.location.href != urlServidor + 'cliente.html')
				window.location = 'cliente.html';
		}
		else
			window.location = 'index.html';
	}
	else
	{
		window.location = 'ingresar.html#error';/*SI LA FECHA DE BAJA NO ES NULL ENTONCES EL USUARIO YA SE DIO DE BAJA*/
		$('.alert').show();
	}
}
$( document ).ready(function() {
	$(".btn").click(function() {
  	obtenerToken();})
 });