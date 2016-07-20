/*
jsCharts for JS Software
The MIT License (MIT)

Copyright (c) ${06/20/2016} ${Juan Salgado}

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

/**     Files needed:   js.js           **/


/** Variables **/
var varColors = ['#1787ce',
     '#db6262',
     '#b64ed9',
     "#519f4a",
     'rgb(111, 103, 103)',
     '#256462',
     "#5e91c6",
     "#4661EE",
     "#EC5657",
     "#1BCDD1",
     "#8FAABB",
     "#B08BEB",
     "#3EA0DD",
     "#F5A52A",
     "#23BFAA",
     "#FAA586",
     "#EB8CC6"];
var columnColor = "#5e91c6";
var columnToday = "#519f4a";
var mainColor = "#1f7dd2";
var lineColor = '#d3d3d3';
var textColor = '#05c0e5';
var fillColor = 'rgba(81, 184, 121, 0.97)';
var max;
var min;
var Zero;
//create object
var Chart = function (element, data, DataNames, useZero, colors, labelX, labelY, average, fillColor)
{
    Zero = useZero;//global variable
    this.element = element;
    this.data = data;
    this.titlesV = getValuesIntervals(data);
    this.titlesN = DataNames;
    this.colors = (colors != undefined)? colors : varColors;
    this.labelX = labelX;
    this.labelY = labelY;
    this.average = average;
    this.fillColor = fillColor;
}
/** bar chart **/
Chart.prototype.bar = function()
{
    //pass the chart values to local values;
    var element = this.element, data = this.data, titlesY = this.titlesN, titlesX = this.titlesV, colors = this.colors, gridX = this.titlesN.length, labelX = this.labelX, labelY = this.labelY, useZero = this.useZero, fillColor = this.fillColor;
    var svg = getElement(element);
    var svgBar = createSVG('g');
    //var maxval = Math.max.apply(Math, data), series = maxval / 5;
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    var startX = 50;
    var xLenght = 600;
    var interval = (xLenght - startX) / titlesX.length;//for the length of the bar
    var gridXInterval = 250 / data.length;//for the height of the bar
    var line = drawLine(startX, 50, startX, 300, "#1f7dd2" ); svgBar.appendChild(line);
    line = drawLine(startX, 300, xLenght, 300, "#1f7dd2" ); svgBar.appendChild(line);
    var text = drawText(min, startX, 320, "middle", 12, "#1f7dd2"); svgBar.appendChild(text);
    text = drawText(min, startX, 45, "middle", 12, "#1f7dd2"); svgBar.appendChild(text);

    //create grid
    var x = startX;
    var y = startX + (interval/2);
    for (var i = 0; i < titlesX.length; i++)//lines Y
    {
        line = drawLine(y, startX, y,305, "#d3d3d3" ); svgBar.appendChild(line);
        y += interval / 2;
        line = drawLine(y, startX, y,305, "#d3d3d3" ); svgBar.appendChild(line);
        y += interval / 2;
    }
    var x = startX;
    for (var i = 0; i < data.length; i++)//lines X
    {
        line = drawLine(startX, x, xLenght, x, "#d3d3d3" ); svgBar.appendChild(line);
        text = drawText(titlesY[i], 10, x + gridXInterval / 2, "right", 12, "#1f7dd2"); svgBar.appendChild(text);
        x += gridXInterval;
    }
    //create text
    var y = startX + interval;
    for (var i = 0; i < titlesX.length; i++)
    {
        text = drawText(titlesX[i], y, 320, "middle", 12, "#1f7dd2"); svgBar.appendChild(text);
        text = drawText(titlesX[i], y, 45, "middle", 12, "#1f7dd2"); svgBar.appendChild(text);
        y += interval;
    }
    x = startX;
    y = startX - 20;
    var size = gridXInterval / 1.25;
    for (var i = 0; i < data.length; i++)
    {
        var recValue = ((data[i]-min) / ((max-min) / titlesX.length) * interval);
        var rectangle = drawRectangle(startX, x + (gridXInterval * .1), recValue, size , "#5e91c6", colors[i], 0, 0); svgBar.appendChild(rectangle);
        text = drawText(data[i], y + recValue , x + gridXInterval / 1.75, "middle", 12, "#CCCCCC"); svgBar.appendChild(text); // testo dentro de la barra
        x += gridXInterval;
    }
    svg.appendChild(svgBar);
}
/** columns chart **/
Chart.prototype.columns = function()
{
    //pass the chart values to local values;
    var element = this.element, data = this.data, titlesY = this.titlesV, titlesX = this.titlesN, colors = this.colors, gridX = this.titlesN.length, useZero = this.useZero, fillColor = this.fillColor;
    titlesY.reverse();
    var svg = getElement(element);
    var svgBar = createSVG('g');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    var startX = 70;
    var xLenght = 600;
    var gridYInterval = (xLenght - startX) / data.length;//for the height of the bar
    //Drawing lines
    var line = drawLine(startX, 50, startX,300, mainColor ); svgBar.appendChild(line);
    line = drawLine(startX, 300, xLenght,300, mainColor ); svgBar.appendChild(line);
    var text = drawText(min, 25, 300, "middle", 12, textColor); svgBar.appendChild(text);
    var y = 50;
    var x = startX + gridYInterval;
    var interval = 250 / titlesY.length;
    //titles x
     for (var i = 0; i < data.length; i++)
    {
        text = drawText(titlesX[i], x - (gridYInterval / 2), 320, "middle", 12, textColor); svgBar.appendChild(text);//use "titlesX[i].substring(0, 3)" to trim titles
        text = drawText(titlesX[i], x - (gridYInterval / 2), 45, "middle", 12, textColor); svgBar.appendChild(text);
        line = drawLine(x, 50, x,305, "#d3d3d3" ); svgBar.appendChild(line);
        x += gridYInterval;
    }
    //title y
    y = 50;
    x = 165;
    for (var i = 0; i < titlesY.length; i++)
    {
        line = drawLine(startX, y, xLenght , y, "#d3d3d3" ); svgBar.appendChild(line);
        text = drawText(titlesY[i], 10, y, "right", 12, textColor); svgBar.appendChild(text);
        y += interval;
    }
    x = startX + (gridYInterval * .1);
    y = 250;
    var size = gridYInterval / 1.2;
    for (var i = 0; i < data.length; i++)
    {
        var color = columnColor;
        var colValue = 250-(((data[i]- min) / ((max - min) /titlesY.length)) * interval);
        var rectangle = drawRectangle(x, 50 + colValue , size, y-colValue, mainColor, colors[i], 0, 0); svgBar.appendChild(rectangle);
        text = drawText(data[i], x + (gridYInterval / 2.5) , 70 + colValue, "middle", 12, "#CCCCCC"); svgBar.appendChild(text); // testo dentro de la barra
        x += gridYInterval;
    }
    svg.appendChild(svgBar);
}
//linear chart
Chart.prototype.linear = function()
{
    //pass the chart values to local values;
    var element = this.element, data = this.data, titlesY = this.titlesV, titlesX = this.titlesN, colors = this.colors, gridX = this.data.length, labelX = this.labelX, labelY = this.labelY, useZero = this.useZero, fillColor = this.fillColor;
    var svgLinear = createSVG('g'), drawings = [];
    var svg = getElement(element);
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    var startX = 70; // graph start x position
    var startY = 300; // graph start y position (height)
    var lineXLenght = 900;
    var dataLineYInterval = Math.round((lineXLenght - startX) / (gridX-1));
    //crear grid
    var line = drawLine(startX, 50, startX,startY, mainColor ); svgLinear.appendChild(line);
    line = drawLine(startX, startY, lineXLenght ,startY, mainColor ); svgLinear.appendChild(line);
    var text = drawText("0", startX -40, startY, "middle", 12, textColor); svgLinear.appendChild(text);
    if (labelY != '' & labelY != undefined)
    text = drawText(labelY, startX - 60, 150, "middle", 12, textColor); text.style.writingMode = "tb";
    text.style.glyphOrientationVertical = 0;svgLinear.appendChild(text);
    if (labelX != '' & labelX != undefined)
        text = drawText(labelX, 300, 350, "middle", 12, textColor);svgLinear.appendChild(text);
    //drawing
    var x = 50;
    //lines x
    for (var i = 0; i < 5; i++)
    {
        line = drawLine(startX, x, lineXLenght,x, "#d3d3d3" ); svgLinear.appendChild(line);
        text = drawText(Math.round(max - (i * (max/5))), startX - 45, x+5, "right", 12, textColor); svgLinear.appendChild(text);
        x += 50;
    }
    var y = startX + dataLineYInterval;
    //lines y
    for (var i = 0; i < gridX-1; i++)
    {
        line = drawLine(y, 50, y, startY + 5, "#d3d3d3" ); svgLinear.appendChild(line);
        y += dataLineYInterval;
    }
    y = startX;
    //titles y
    for (var i = 0; i < gridX; i++)
    {
        if (data[i] != null)
            text = drawText(titlesX[i], y, 320, "middle", 12, textColor); svgLinear.appendChild(text);
        y += dataLineYInterval;
    }
    //create data for the chartTooltips
    x = startX;
    y = startY;
    var x1 = 0, y1 = 0, x2= 0, y2=0;
    var fill = "", circles = [];
    for (var i = 0; i < data.length; i++)
    {
        x1 = x + (i * dataLineYInterval);
        y1 = y - ((data[i] / max)*250);
        fill += " L"+x1+","+y1;
        circles.push({x1, y1});
    }
    var graph = createSVG("path", {d: "M" + startX +",300 " + fill + " L"+ circles[data.length-1].x1 + ",300", fill: fillColor, stroke:"#5e91c6", strokewidth:"2px"});
    svgLinear.appendChild(graph);
    for (var i = 0; i < data.length; i++)
    {
        var circle = drawCircle(circles[i].x1, circles[i].y1, "#d3d3d3", "#35a8b2"); svgLinear.appendChild(circle);
        text = drawText(labelX + " : " + titlesX[i] + ", " + labelY + " : " + data[i], circles[i].x1, circles[i].y1-15, "right", 8, textColor);
        var rectangle = drawRectangle(text.getAttribute("x")-10, text.getAttribute("y")-18, 170, 25, lineColor, "rgba(247, 247, 247, 0.77)", 0, 0);
        text.style.display = "none";
        rectangle.style.display = "none";
        svgLinear.appendChild(rectangle);
        svgLinear.appendChild(text);
        drawings.push({circle, rectangle, text});
    }
    //display chartTooltip on mouse over the circles
    for (var i = 0; i < drawings.length; i++)
    {
        svgLinear.appendChild(drawings[i].rectangle);
        svgLinear.appendChild(drawings[i].text);
        chartTooltip(drawings[i].circle, drawings[i].rectangle, drawings[i].text);
    }
    svg.appendChild(svgLinear);
}
/** pie chart**/
Chart.prototype.pie = function()
{
    //pass the chart values to local values;
    var element = this.element, data = this.data, titlesY = this.titlesN, colors = this.colors, useZero = this.useZero, fillColor = this.fillColor;
    var svgPie = createSVG('g'), svg = getElement(element), drawings = [];
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    var total = data.reduce(function (accu, that) { return that + accu; }, 0);
    var angleSelector = data.map(function (v) { return 360 * v / total; });

    x= 450; y=35;

    for (var i = 0; i < data.length; i++)
    {
        text = drawText(titlesY[i]+ ": " + ((100/total)*data[i]).toFixed(2)+"%",x, y , "right", 12, textColor); svgPie.appendChild(text);
        var rectangle = drawRectangle(x-15, y-10, 10, 10, "#5e91c6", colors[i], 0, 0); svgPie.appendChild(rectangle);
        y += 30

    }
    var startAngle = 0;
    var endAngle = 0;/** drawing arcs **/
    for (var i=0; i<angleSelector.length; i++){
        startAngle = endAngle;
        endAngle = startAngle + angleSelector[i];
        var x = 200;
        var y = 180;
        var r = 160;

        var x1,x2,y1,y2 ;

        x1 = parseInt(Math.round(x + r * Math.cos(Math.PI*startAngle/180)));
        y1 = parseInt(Math.round(y + r * Math.sin(Math.PI*startAngle/180)));

        x2 = parseInt(Math.round(x + r*Math.cos(Math.PI*endAngle/180)));
        y2 = parseInt(Math.round(y + r*Math.sin(Math.PI*endAngle/180)));



        var d = "M"+x +","+y+"  L" + x1 + "," + y1 + "  A"+r+","+r+" 0 " +
                ((endAngle-startAngle > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";
        //alert(d); // muestra las coordenadas
        var c = parseInt(i / angleSelector.length * 360);
        var arcos = createSVG("path", {d: d, fill: colors[i], stroke:lineColor, strokewidth:"2px"});
        svgPie.appendChild(arcos);
        //dibujar tiquetas
        var text = drawText(titlesY[i] + " : " + ((100/total)*data[i]).toFixed(2)+"%", (x1+x2) /2, ((y1+y2)/2) ,"middle", "15", "#1f7dd2");
        var rectangle = drawRectangle(text.getAttribute("x")-100, text.getAttribute("y")-18, 200, 25, "#0e96eb", "#d3d3d3", 5, 5);
        text.style.display = "none";
        text.style.zIndex = "5";
        rectangle.style.display = "none";
        rectangle.style.zIndex = "5";
        drawings.push({arcos, rectangle, text});
    }
    //add the tooltip
    for (var i = 0; i < drawings.length; i++)
    {
        svgPie.appendChild(drawings[i].rectangle);
        svgPie.appendChild(drawings[i].text);
        chartTooltip(drawings[i].arcos, drawings[i].rectangle, drawings[i].text);
    }
    svg.appendChild(svgPie);
}
//points chart
Chart.prototype.points = function(average)//function points(element, dataY, dataX, maxval, labelY, labelX, gridX, average)
{
    //pass the chart values to local values;
    var element = this.element, data = this.data, titlesY = this.titlesV, titlesX = this.titlesN, colors = this.colors, gridX = this.data.length, labelX = this.labelX, labelY = this.labelY, useZero = this.useZero, fillColor = this.fillColor;
    if (average == undefined & this.average != undefined)
        average = this.average;
    else
        this.average = average;
    var svgLinear = createSVG('g'), svg = document.getElementById(element), drawings = [];
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    var startX = 70; // graph start x position
    var startY = 300; // graph start y position (height)
    var lineXLenght = 600;
    var dataLineYInterval = Math.round((lineXLenght - startX) / (gridX-1));
    //crear grid
    var line = drawLine(startX, 50, startX,startY, mainColor ); svgLinear.appendChild(line);
    line = drawLine(startX, startY, lineXLenght ,startY, mainColor ); svgLinear.appendChild(line);
    var text = drawText("0", startX - 40, startY, "middle", 12, textColor); svgLinear.appendChild(text);
    if (labelY != '' & labelY != undefined)
    text = drawText(labelY, startX - 50, 150, "middle", 12, textColor); text.style.writingMode = "tb";
    text.style.glyphOrientationVertical = 0;svgLinear.appendChild(text);
    if (labelX != '' & labelX != undefined)
        text = drawText(labelX, 300, 350, "middle", 12, textColor);svgLinear.appendChild(text);
    //drawing
    var x = 50;
    //lines x
    for (var i = 0; i < 5; i++)
    {
        line = drawLine(startX, x, lineXLenght,x, "#d3d3d3" ); svgLinear.appendChild(line);
        text = drawText(Math.round(max - (i * (max/5))), startX - 45, x+5, "right", 12, textColor); svgLinear.appendChild(text);
        x += 50;
    }
    var y = startX + dataLineYInterval;
    //lines y
    for (var i = 0; i < gridX-1; i++)
    {
        line = drawLine(y, 50, y, startY + 5, "#d3d3d3" ); svgLinear.appendChild(line);
        y += dataLineYInterval;
    }
    y = startX;
    //titles y
    for (var i = 0; i < gridX; i++)
    {
        if (data[i] != null)
            text = drawText(titlesX[i], y, 320, "middle", 12, textColor); svgLinear.appendChild(text);
        y += dataLineYInterval;
    }
    //create data for the chartTooltips
    x = startX;
    y = startY;
    var x1 = 0, y1 = 0, x2= 0, y2=0;
    var fill = "", circles = [];
    for (var i = 0; i < data.length; i++)
    {
        x1 = x + (i * dataLineYInterval);
        y1 = y - ((data[i] / max)*250);
        fill += " L"+x1+","+y1;
        circles.push({x1, y1});
    }
    var graph = createSVG("path", {d: "M" + startX +",300 " + fill + " L"+ circles[data.length-1].x1 + ",300", fill: fillColor, stroke:"#5e91c6", strokewidth:"2px"});
    svgLinear.appendChild(graph);
    for (var i = 0; i < data.length; i++)
    {
        var circle = drawCircle(circles[i].x1, circles[i].y1, "rgba(211, 211, 211, 0)", "rgba(53, 168, 178, 0)"); svgLinear.appendChild(circle);
        text = drawText(labelX + " : " + titlesX[i] + ", " + labelY + " : " + data[i], circles[i].x1, circles[i].y1-15, "right", 8, textColor);
        var rectangle = drawRectangle(text.getAttribute("x")-10, text.getAttribute("y")-18, 170, 25, lineColor, "rgba(247, 247, 247, 0.77)", 0, 0);
        text.style.display = "none";
        rectangle.style.display = "none";
        svgLinear.appendChild(rectangle);
        svgLinear.appendChild(text);
        drawings.push({circle, rectangle, text});
    }
    //display chartTooltip on mouse over the circles
    for (var i = 0; i < drawings.length; i++)
    {
        svgLinear.appendChild(drawings[i].rectangle);
        svgLinear.appendChild(drawings[i].text);
        chartTooltip(drawings[i].circle, drawings[i].rectangle, drawings[i].text);
    }
    if (average > 0) {line = drawLine(startX, startY - ((average / max)*250), lineXLenght, startY - ((average / max)*250), "#e80c0c" ); svgLinear.appendChild(line);}
    svg.appendChild(svgLinear);
}
//create tooltip
function chartTooltip(trigger, display, display2)
{
    trigger.onmouseover = (function(){
            display.style.display = "inline";
            display2.style.display = "inline";
        });
    trigger.onmouseout = (function(){
            display.style.display = "none";
            display2.style.display = "none";
        });
}
/* get labels for charts (!pie) */
function getValuesIntervals(array)
{
    if (array.length > 0)
    {
        max = 0;
        min = 0;
        var arrayMax = arrayMaximum(array);//js.js file need to be included on your HTML page
        var arrayMin = arrayMinimum(array);//js.js file need to be included on your HTML page
        //multiplicator
        var multi = multiplicator(arrayMax);
        //get the maximum of the array
        var rounded = Math.round(arrayMax / 10);
        if (arrayMax < 1)
            max = multi;
        else if (arrayMax <= 100 & arrayMin >= 1)
            max = (rounded > arrayMax / 10) ? rounded * 10 : (rounded + 1) * 10;
        else while (max <= arrayMax)
            max += (multi / 100);
        //get the minimum of the array
        if (arrayMin <= multi & arrayMin <= 100 || Zero)
            min = 0;
        else while (arrayMin > min + multi / 100)
                    min += multi / 100;
        var interval = (max - min) / 10;
        //fill array with intervals values
        var intervals = getIntervals(10, interval, min);//number of labels, interval, minimum value
        return intervals;
    }
    else
        alert('Error, array is empty.');
}
/** find the multiplicator of the array **/
function multiplicator(arrayMax)//found a multiplicator to determine the maximum and minimum of a chart
{
    var multi = 0.00001;
    while (arrayMax > multi)
    {
        multi = multi * 10;
    }
    return multi;
}
/** get the interval values **/
function getIntervals(a, b, c)//number of intervals, difference between intervals, minimum value
{
    var array = []
    for (var i = 1; i <= a; i++)
        array.push(i * b + c);
    return array;
}