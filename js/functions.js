var dataY = [],dataY2 = [], dataX = [], contador = 0, maxval = 0, minval = 0, averval = 0, maxval2 = 0, minval2 = 0, averval2 = 0, date, valueY, temp_hum_id, movement, timer, valueY2;


window.onload = function() {
    if (sessionStorage.username)
        start();
    else
        window.location = 'login.html';
};

function start()
{
    startTimer();
    //getWeekAverages();
    //getSensorTempHumReadings();
    date = getDate();
    getElement('day').innerHTML = date.weekday;
    getElement('date').innerHTML = date.month + '/' + date.day + '/' + date.year;
    getElement("user-name").innerHTML = sessionStorage.username;
}
/** create chart **/
function makeGraphics(data)
{
    var dataLenght = 10;
    var max= 40;
    if (data.readings.length > 0) {
        fillData(data.readings);
        temp_hum_id = data.id;
        // (element, data, DataNames, useZero, colors, labelX, labelY, average, mainColor)
        var temperature = new Chart("graph", dataY, dataX, false, "", "Time", "Temperature", "", 'rgba(191, 51, 51, 0.76)')// ,max, labelY, labelX, dataLenght, 'rgba(47, 116, 152, 0.69)');
        temperature.linear();
        var humidity = new Chart("graph2", dataY2, dataX, false, "", "Time", "Humidity", "", "rgba(47, 116, 152, 0.69)")// max, "Humidity", labelX, dataLenght, 'rgba(191, 51, 51, 0.76)');
        humidity.linear();
    }
    else getSensorMovementReadings();
    
}
function fillData(data)
{
    dataY = [], dataY2 = [];
    var tb =  getElement('#tbody1');
    tb.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        dataY.push(data[i].temperature); dataY2.push(data[i].humidity); dataX.push(getTime2(data[i].date));
    };
    for (var i = 0; i < data.length; i++) {
        tb.innerHTML += "<tr><td>" + getTime2(data[i].date) + "</td><td>" + data[i].temperature  + "</td><td>" + data[i].humidity +"%</td><td>" + temp_hum_id +"</td>";
    };
    maxval = arrayMaximum(dataY);//found the maximum value in the array
    minval = arrayMinimum(dataY);//found the minimum value in the array
    averval = arrayAverage(dataY);//get the average value from the array
    maxval2 = arrayMaximum(dataY2);//found the maximum value in the array
    minval2 = arrayMinimum(dataY2);//found the minimum value in the array
    averval2 = arrayAverage(dataY2);//get the average value from the array
    getElement("max-val").innerHTML = maxval + "&deg";//display the maximum value in the dashboard
    getElement("min-val").innerHTML = minval + "&deg";//display the minimum value in the dashboard
    getElement("aver-val").innerHTML = averval + "&deg";//diplay the average value in the dashboard
    getElement("max-val2").innerHTML = maxval2 + "%";//display the maximum value in the dashboard
    getElement("min-val2").innerHTML = minval2 + "%";//display the minimum value in the dashboard
    getElement("aver-val2").innerHTML = averval2 + "%";//diplay the average value in the dashboard
    getSensorMovementReadings();
}
function logMovement(data) {
    var tb =  getElement('#tbody2');
    tb.innerHTML = "";
    if(movement != undefined)
    {   
        if(data.readings[0].date != movement.readings[0].date)
        {
            movement = data;
            loadModal(0);
        }
    }
    movement = data;
    var readings = data.readings;
    for (var i = 0; i < readings.length; i++) {
        tb.innerHTML += "<tr><td>" + getTime2(readings[i].date) + "</td><td>" + readings[i].picture_path  + "</td><td><input type='button' class='btn btn-dark' value='Open Picture' onclick='loadModal("+ i +")'></td><td>" + data.id +"</td>";
    };
}
function loadModal(item) {
    $("#pic").attr("src",movement.readings[item].picture_path);
    $("#picTime").html("<b>Picture Taken: </b>" + movement.readings[item].date);
    $("#picPath").html("<b>Picture Path: </b>" + movement.readings[item].picture_path);
    $("#picSensor").html("<b>Sensor id: </b>" + movement.id);
    openModal();
}
function openModal(){
    $("#picture").modal('show');

}
function closeModal(){
    $("#picture").modal('hide');
}
/** datos estaticos **/
/**
function makeGraphics()
{
    var dataLenght = 10;
    var max= 40;
    if (dataY.length != dataLenght)
    {
        llenarDatos(contador);//generate data (array < 7)
    }
    else
    {
        actualizarDatos(dataLenght);//actualizar datos
        actualizarDatos2(dataLenght);
    }
    // (element, data, DataNames, useZero, colors, labelX, labelY, average, mainColor)
    var temperature = new Chart("graph", dataY, dataX, false, "", "Time", "Temperature", "", 'rgba(191, 51, 51, 0.76)')// ,max, labelY, labelX, dataLenght, 'rgba(47, 116, 152, 0.69)');
    temperature.linear();
    var humidity = new Chart("graph2", dataY2, dataX, false, "", "Time", "Humidity", "", "rgba(47, 116, 152, 0.69)")// max, "Humidity", labelX, dataLenght, 'rgba(191, 51, 51, 0.76)');
    humidity.linear();
}
function llenarDatos(data)
{

    valueY = getRandomNumber(28, 35); //generate random number
    valueY2 = getRandomNumber(40, 60); //generate random number
    dataY.push(valueY);//add the value y to the array
    dataY2.push(valueY2)
    valueX = getTime();//get the time for the x label (timeline)
    dataX.push(valueX);//add the value y to the array for timeline
    maxval = arrayMaximum(dataY);//found the maximum value in the array
    minval = arrayMinimum(dataY);//found the minimum value in the array
    averval = arrayAverage(dataY);//get the average value from the array
    maxval2 = arrayMaximum(dataY2);//found the maximum value in the array
    minval2 = arrayMinimum(dataY2);//found the minimum value in the array
    averval2 = arrayAverage(dataY2);//get the average value from the array
    display(); //display on the dashboard
}
function actualizarDatos(number)
{
    date = new Date();
    var temp = dataY;
    var temp2 = dataX;
    for (var i = 0; i < dataY.length; i++)
    {
        if (i != number-1)
        {
            dataY[i] = temp[i+1];
            dataX[i] = temp2[i+1];
        }
        else
        {
            dataY[i] = valueY = getRandomNumber(28, 35);
            dataX[i] = valueX = getTime();
        }
    }
    maxval = arrayMaximum(dataY);
    minval = arrayMinimum(dataY);
    averval = arrayAverage(dataY);
    display(); //display on the dashboard
}
function actualizarDatos2(number)
{
    var date = new Date();
    var temp = dataY2;
    var temp2 = dataX;
    for (var i = 0; i < dataY2.length; i++)
    {
        if (i != number-1)
        {
            dataY2[i] = temp[i+1];
            dataX[i] = temp2[i+1];
        }
        else
        {
            dataY2[i] = valueY2 = getRandomNumber(40, 60);
            dataX[i] = valueX = getTime();
        }
    }
    maxval2 = arrayMaximum(dataY2);
    minval2 = arrayMinimum(dataY2);
    averval2 = arrayAverage(dataY2);
    display(); //display on the dashboard
}**/
function display(data)
{
    
    /** display the data in the activity text area **/
    //var text = document.getElementById('activity').innerHTML;
    
}
/**/
function showMenu () {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'inline';
}
function showHideMenu () {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.display = (sidebar.style.display == 'inline') ? 'none' : 'inline';
}
function weekAverages(data)
{
    var averages = '<p><b>Station 1 : </b><span>'+ data.averages.station1 + '&deg<span></p>' +
        '<p><b>Station 2 : </b><span>'+ data.averages.station2 + '&deg<span></p>' +
        '<p><b>Station 3 : </b><span>'+ data.averages.station3 + '&deg<span></p>';
    getElement('.this-week').innerHTML = averages;
    //columns('this-week', averages,[10, 15, 20, 25, 30, 35, 40, 45, 50], ['Station 1', 'Station 2', 'Station3']);
}
function Switch(e, s)
{
    if (e.className =='switch switch-on')
    {
        var id = e.id;
        popInfo('Confirmation','Do you wan&#39;t to turn of ' + s + '?<br>'+
            '<input type="button" value="Yes" style="width: 45%;" onclick="SwitchOff('+ id + ')"><input type="button" value="No" style="width: 45%; float:right" onclick="closePopup();">');
    }
    else
    {
        e.className = 'switch switch-on';
        var o = document.querySelectorAll('.switch-on');
        if (o.length == 1)
        {
            startTimer('', getElement('.buttons a'));
        }
    }
}
function startTimer()
{
    timer = setInterval(function(){
            getSensorTempHumReadings()/**makeGraphics()**/;
        }, 1000);
}
function SwitchOff(e)
{
    e.className = 'switch';
    closePopup();
    var o = document.querySelectorAll('.switch-on');
    if (o.length == 0)
        clearInterval(timer);
}
function cerrarSesion()
{
	sessionStorage.clear();
  window.location = 'login.html';
}
