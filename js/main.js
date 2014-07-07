Webcam.set({
	image_format: 'jpeg',
	jpeg_quality: 90
});
Webcam.attach( '#my_camera' );

var colorThief = new ColorThief();

function take_snapshot() {
	// take snapshot and get image data
	var data_uri = Webcam.snap();

	// display results in page
	document.getElementById('results').innerHTML =
		'<h2>Here is your image:</h2>' +
		'<img id = source src="'+data_uri+'"/>';
}

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img = new Image();

function getImage() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	img = new Image();
	img.src=document.getElementById("source").src;
}

function crop() {
	getImage()
	// this takes a 105x105px crop from img at x=149/y=4
	// and copies that crop to the canvas
	ctx.drawImage(img,140,100,40,40,0,0,40,40);
	// this uses the canvas as the src for the cropped img element
	document.getElementById("cropped").src=canvas.toDataURL();
	return canvas.toDataURL();
}

function randomColor() {
	var hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var color = "";
	for(var i =0; i < 6; i++){
		color += hex[Math.floor(Math.random() * 16)];
	}

	return color;
}

function changeColor(color) {
	console.log(document.getElementById('game').style);
	document.getElementById('game').style.backgroundColor = '#00FF00'
	document.getElementById('game').style.backgroundColor = '#' + color;
}

function countDown(){
	var gameColor = randomColor();
	changeColor(randomColor());
	var count = 5;

	var counter = setInterval(timer, 1000)

	function timer(){
		count = count - 1;
		if (count <= 0){
			clearInterval(counter);
			take_snapshot();
			var image = new Image();
			image.src = crop();
			var userColor = colorThief.getColor(image);
			document.getElementById('color').style.backgroundColor = '#' + rgbToHex(userColor);
			gameColor = hexToRgb(gameColor);

			document.getElementById('color').innerHTML = distanceBetween(gameColor,userColor) + " || " + Math.abs((rgbToHue(gameColor) - (((rgbToHue(gameColor) - rgbToHue(userColor)) / 2))));
			return;
		}
		document.getElementById('counter').innerHTML = count;
	}
}

function distanceBetween(a, b){
	console.log(a);
	console.log(b);
	var x = a[0] - b[0];
	var y = a[1] - b[1];
	var z = a[2] - b[2];

	return Math.sqrt(x * x + y * y + z * z);
}

function rgbToHue(rgb){
	var hue = Math.atan2(Math.sqrt(3) * (rgb[2] - rgb[1]), 2 * rgb[0] - rgb[1] - rgb[2]);
	return hue;
}

function hexToRgb(hex) {
	r = hex.substring(0,2);
	g = hex.substring(2,4);
	b = hex.substring(4,6);

	return [parseInt(r,16),parseInt(g,16),parseInt(b,16)]	
}

function updateColorTable(){
	var inputColor = document.getElementById('inputColor').value;
	var gameColor = document.getElementById('gameColor').value;
	var colorTable = document.getElementById('colorTest');
	var gameColorRgb = hexToRgb(gameColor);
	var inputColorRgb = hexToRgb(inputColor);
	colorTable.rows[1].cells[1].innerHTML = gameColorRgb;
	colorTable.rows[1].cells[2].innerHTML = inputColorRgb;
	colorTable.rows[1].cells[1].style.backgroundColor = '#' + gameColor;
	colorTable.rows[1].cells[2].style.backgroundColor = '#' + inputColor;

	var gameColorHue = rgbToHue(gameColorRgb);
	var inputColorHue = rgbToHue(inputColorRgb);

	colorTable.rows[2].cells[1].innerHTML = gameColorHue;
	colorTable.rows[2].cells[2].innerHTML = inputColorHue;


	console.log("1st hue:" + gameColorHue);
	console.log("1st hue to rgb:" + hueToRgb(gameColorHue));
//	console.log("1st rgb to hex:" + rgbToHex(hueToRgb(gameColorHue)));

	colorTable.rows[2].cells[1].style.backgroundColor = '#' + rgbToHex(hueToRgb(gameColorHue));
	colorTable.rows[2].cells[2].style.backgroundColor = '#' + rgbToHex(hueToRgb(inputColorHue));
	

}

//http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
function hueToRgb(hue){
	hue = parseFloat(hue);
	hue = hue + Math.PI;
	var huePrime = (hue * (180 / Math.PI )) / 60;
	console.log("huePrime: " + huePrime);
	var x = (1 - Math.abs((huePrime % 2) - 1)) * 255;
	if (huePrime >= 0 && huePrime < 1){
		return [255,x,0];
	} else if (huePrime >= 1 && huePrime < 2){
		return [x,255,0];
	} else if (huePrime >= 2 && huePrime < 3){
		return [0,255,x];
	} else if (huePrime >= 3 && huePrime < 4){
		return [0,x,255];
	} else if (huePrime >= 4 && huePrime < 5){
		return [x,0,255];
	} else if (huePrime >= 5 && huePrime < 6){
		return [255,0,x];
	} else {
		return [0,0,0]
	}
}

function rgbToHex(rgb) {
		r = parseInt(rgb[0]);
		g = parseInt(rgb[1]);
		b = parseInt(rgb[2]);
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

document.getElementById('inputColor').onkeyup = updateColorTable;
document.getElementById('gameColor').onkeyup = updateColorTable;
updateColorTable();