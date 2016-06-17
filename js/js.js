/** asign enter to a element**/
function enterButton(element)//receive element name
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             getElement(element).focus();
			getElement(element).onclick();
        }
    }
}
/** get element **/
function getElement(e)//receive element name or css selector (#id, .class, p, etc.)
{
    var element;
    try
    {
        element = document.getElementById(e);
        if (element == null)
            element = document.querySelector(e);
    }
    catch(err)
    {
        console.log(err.message);
    }
    
    return element;
}
/** array maximum **/
function arrayMaximum(array)
{
    var max = Math.max.apply(Math, array);
    return max;
}
/** array minimum **/
function arrayMinimum(array)
{
    var min = Math.min.apply(Math, array);
    return min;
}
/** array average**/
function arrayAverage(array)
{
    var aver = (array.reduce(function(a, b) { return a + b; })/array.length).toFixed();
    return aver;
}
/** modal window**/
var dg = true;
function dialogBox(text) { 
    var dialog;
    if (dg) { dialog = document.createElement('dialog'); document.body.appendChild(dialog); dg = false;}
    else { dialog = getElement('dialog');}
    dialog.innerHTML = text;
    dialog.showModal();
    //document.body.removeChild(dialog); 
} 
/** generate a random number **/ 
function getRandomColor() {//refference http://stackoverflow.com/a/1484514/4225925
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/** pop-up window **/
//Fill the window properties
var pop = true;
function popInfo(header, message, timeout)
{
    var popup;
    if (pop) { 
        popup = document.createElement('div'); 
        popup.className = 'popup';
        popup.innerHTML = 
        '<div class="info">' +
            '<a class="close" onclick="closePopup()"></a>' +
            '<div class="popup-header">' +
                '<h1 id="popheader">' + header + '<span id="head-mess"></span></h1>' +
            '</div>' +
            '<div id="pop-message">' + 
                message +
            '</div>' +
         '</div>';
        document.body.appendChild(popup); pop = false;
    }
    else 
    { 
        getElement('popheader').innerHTML = header;
        getElement('pop-message').innerHTML = message;
    }
	openPopup();
	if (timeout > 0)// to auto close the popup
		setTimeout(function(){closePopup();},timeout);
}
// open the window
function openPopup(){
    getElement('.popup').style.display = 'inline'; 
    var pi = getElement('.info');
    var wh = document.documentElement.clientHeight;
    var ph = pi.clientHeight;
    var p = ((100/ wh) * ph) / 2;
    p = (50 - p) + "%"
    pi.style.top = p;
    var ww = document.documentElement.clientWidth;
    var pw = pi.clientWidth;
    var p = ((100/ ww) * pw) / 2;
    p = (50 - p) + "%"
    pi.style.left = p;
    return false;
	
}
//close the window
function closePopup(){
    getElement('.info').style.top = '-100%';
    setTimeout(function(){getElement('.popup').style.display = 'none'; }, 250);
    return false;
}
/** convert json to array **/
function jsonToArray(JSONobj)
{
    return array = Object.keys(JSONobj).map(function(_) { return JSONobj[_]; })// solution by mvallebr
}
/** Change the css of the document **/
function changeCSS(newCSS) {
    var oldlink = document.getElementsByTagName("link").item(0);
    if (oldlink.getAttribute("href") == "css/style.css")
        oldlink.setAttribute("href", newCSS);
    else
        oldlink.setAttribute("href", "css/style.css");
}
/** clock **/
function startTime(e, t)// recive the element where the clock is going to show / second is a bolean if true for 12 hr clock
{
    var today = new Date();
    var h = today.getHours();
    if (t)
        if (h > 12) h = today.getHours() - 12; // 12 hours clock
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    getElement(e).innerHTML = h + ":" + m + ": " + s;
    var t = setTimeout(startTime, 500);
}
/** date **/
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//to get the day of the week
// create a date object
function getDate(){ 
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var weekday = d.getDay();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    this.date = { year : d.getFullYear(), month: month, day: day, weekday: weekdays[weekday]};//create the object
	return this.date;
}
// display the date
function setDate(e)
{
    var date = dates();
    var formatedDate = monthNames[date.month-1] + " " + date.day + ", " + date.year;
    //document.getElementById("weekday").innerHTML = weekdays[date.weekday];//get the day of the week
    getElement(e).innerHTML = formatedDate;
}
/** get local time HH/MM/SS **/
function getTime(d)
{
    var date, hour, minutes, seconds, time;
    date = (d != undefined)? new Date(d) : new Date();
    hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
    time = hour + ":" + minutes + ":" + seconds;
    return time;
}
/** get a random number **/
function getRandomNumber(a, b)
{
    var random = Math.floor(Math.random() * (a - b + 1)) + b; //max ; min (random between max - min)
    return random;
}