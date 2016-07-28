
var urlServidor = 'http://localhost/smartec/';
var token ='';
var x = new XMLHttpRequest();
var login;
var url= urlServidor + 'services/gettoken.php';


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
				sessionStorage.username = respuestaJSON.user_name;
				sessionStorage.email = respuestaJSON.email;
				sessionStorage.token = respuestaJSON.token;
				window.location = 'index.html';
			}
			else
			{
				$('.alert').show();
			}
		}
	}
	x.send(datos);
}
$( document ).ready(function() {
	$('.alert').hide();
	enterButton("#login-btn")
	if (sessionStorage.username)
			window.location = 'index.html';
	$(".btn").click(function() {
  	obtenerToken();})
 });
