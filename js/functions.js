var dataY = [],dataY2 = [], dataX = [], contador = 0, maxval = 0, minval = 0, averval = 0, date, valueY, valueX, timer;



function start()
{
    startTimer();
    //getWeekAverages();
    date = getDate();
    getElement('day').innerHTML = date.weekday;
    getElement('date').innerHTML = date.month + '/' + date.day + '/' + date.year;
}
/**/
function makeGraphics()
{
    var dataLenght = 10;
    var max= 50, labelY = "Temperature", labelX= "Time";
    if (dataY.length != dataLenght)
    {
        llenarDatos(contador);//generate data (array < 7)
    }
    else
    {
        actualizarDatos(dataLenght);//actualizar datos
    }
    /* (element, data, DataNames, useZero, colors, labelX, labelY, average, mainColor)*/
    var temperature = new Chart("graph", dataY, dataX, false, "", "Temperature", "Time", "", "rgba(47, 116, 152, 0.69)")// ,max, labelY, labelX, dataLenght, 'rgba(47, 116, 152, 0.69)');
    temperature.linear();
    var humidity = new Chart("graph2", dataY, dataX, false, "", "Humidity", "Time", "", 'rgba(191, 51, 51, 0.76)')// max, "Humidity", labelX, dataLenght, 'rgba(191, 51, 51, 0.76)');
    humidity.linear();
    // lineal("graph", dataY, dataX, max, labelY, labelX, dataLenght, 'rgba(47, 116, 152, 0.69)');
    // lineal("graph2", dataY, dataX, max, "Humidity", labelX, dataLenght, 'rgba(191, 51, 51, 0.76)');
}
function llenarDatos()
{

    valueY = getRandomNumber(30, 50); //generate random number
    dataY.push(valueY);//add the value y to the array
    valueX = getTime();//get the time for the x label (timeline)
    dataX.push(valueX);//add the value y to the array for timeline
    maxval = arrayMaximum(dataY);//found the maximum value in the array
    minval = arrayMinimum(dataY);//found the minimum value in the array
    averval = arrayAverage(dataY);//get the average value from the array
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
            dataY[i] = valueY = getRandomNumber(30, 50);
            dataX[i] = valueX = getTime();
        }
    }
    maxval = arrayMaximum(dataY);
    minval = arrayMinimum(dataY);
    averval = arrayAverage(dataY);
    display(); //display on the dashboard
}
function display()
{
    document.getElementById("max-val").innerHTML = maxval + "&deg";//display the maximum value in the dashboard
    document.getElementById("min-val").innerHTML = minval + "&deg";//display the minimum value in the dashboard
    document.getElementById("aver-val").innerHTML = averval + "&deg";//diplay the average value in the dashboard
    /** display the data in the activity text area **/
    //var text = document.getElementById('activity').innerHTML;
    var tb =  getElement('tbody');
    //tb.innerHTML = '';
    tb.innerHTML += "<tr><td>" + valueX + "</td><td>" + valueY  + "</td><td>" + getRandomNumber(0,4) +"</td>";
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
            makeGraphics();
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
