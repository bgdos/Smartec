var urlServer = 'http://localhost/bumo/';
var urlLastReadings = "services/getLastReadings.php";
var urlStationReadings = "services/getStationReadings.php";
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
/** read data by station**/
function getStationReadings(station)
{
    var url = urlServer + urlStationReadings + '?station='+station;
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