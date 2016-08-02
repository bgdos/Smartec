var urlServer = 'http://localhost/smartec/';
var urlLastReadings = "services/getLastReadings.php";
var urlSensorTempHumReadings = "services/getSensorTempHumReadings.php";
var urlSensorMovementReadings = "services/getSensorMovementReadings.php";
var urlWeekAverages = "services/getWeekAverages.php";
var x = new XMLHttpRequest;
var glr = gwa = false;

/** read data **/
function getLastReadings()
{
    var url = urlServer + urlLastReadings;
    x.open('GET', url, true);
    /*x.setRequestHeader("user",  sessionStorage.user);
    x.setRequestHeader("token", sessionStorage.token);*/
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            if (respuestaJSON.status == 0)
                Activity(respuestaJSON);
            else if (glr == false)
                popInfo('Message', respuestaJSON.message), glr = true;
        }
    }
    x.send();
}
/** read data by sensor**/
function getSensorTempHumReadings()
{
    var url = urlServer + urlSensorTempHumReadings + '?sensor=' + 1;
    x.open('POST', url, true);
    /*x.setRequestHeader("user",  sessionStorage.user);
    x.setRequestHeader("token", sessionStorage.token);*/
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            if (respuestaJSON.status == 0)
                makeGraphics(respuestaJSON);
            else if (glr == false)
                popInfo('Message', respuestaJSON.message), glr = true;
        }
    }
    x.send();
}
function getSensorMovementReadings()
{
    var url = urlServer + urlSensorMovementReadings + '?sensor=' + 2;
    x.open('POST', url, true);
    /*x.setRequestHeader("user",  sessionStorage.user);
    x.setRequestHeader("token", sessionStorage.token);*/
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            if (respuestaJSON.status == 0)
                logMovement(respuestaJSON);
            else if (glr == false)
                popInfo('Message', respuestaJSON.message), glr = true;
        }
    }
    x.send();
}
/** this week averages **/
function getWeekAverages()
{
    var url = urlServer + urlWeekAverages;
    x.open('GET', url, true);
    /*x.setRequestHeader("user",  sessionStorage.user);
    x.setRequestHeader("token", sessionStorage.token);*/
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            if (respuestaJSON.status == 0)
                weekAverages(respuestaJSON);
            else if (gwa == false)
                popInfo('Message', respuestaJSON.message), gwa = true;
        }
    }
    x.send();
}
