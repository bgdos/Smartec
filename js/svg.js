//drawing
function createSVG(drawingType, attributes) { //Recibe el tipo de grafico que se requiere y los atributos para crearlo
    var svg = document.createElementNS('http://www.w3.org/2000/svg', drawingType); // se crea la figura
    for (var k in attributes)
        if (attributes.hasOwnProperty(k)) svg.setAttribute(k, attributes[k]);
    return svg;
}
//create line
function drawLine(x1, y1, x2, y2, color)
{
    //create attributes
    var attributes = {x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, strokewidth: '1px' };
	//create line
	var line = createSVG('line', attributes);
	return line;
}
//create Rectangle
function drawRectangle(x, y, width, height, colorline, fillColor, rx, ry)
{
    //create attributes
    var attributes = {x: x, y: y, rx: rx, ry: ry, height: height, width: width, stroke: colorline, strokewidth: '1px', fill: fillColor};
	//create rectangle
	var rect = createSVG('rect', attributes);
	return rect;
}
//create Circle
function drawCircle(cx, cy, stroke, fill, r)
{
    //create attributes
    r = (r != undefined)? r: 5;//the radio of the circle
    var attributes = {cx: cx, cy: cy, stroke: stroke, fill: fill, r: r, strokewidth: '2px' };//cx & cy are the start of the circle
	//create circle
	var c = createSVG('circle', attributes);
	return c;
}
// create text
function drawText(text, x, y, anchor, size, color, borderColor, strokeWidth, fontWeight)
{
    //create attributes
    var attributes = {x: x, y: y, 'text-anchor': anchor, 'font-family': 'Verdana', 'font-size': size + 'pt', stroke: borderColor, strokewidth: strokeWidth, 'font-weight': fontWeight, fill: color, stroke: borderColor};
	//create text
	var t = createSVG('text', attributes);
	//text
	t.innerHTML = text;
    t.setAttribute("id", "textSVG");
	//return text
	return t;
}
// create Polygon
function drawPolygon(points, fill, stroke)
{
    //create attributes
    var attributes = {points:points, fill:fill, stroke: stroke};
	//create polygon
	var p = createSVG('polygon', attributes);
	//style
	p.style.strokeWidth = '1px'; //line width
	//return the polygon
	return p;
}