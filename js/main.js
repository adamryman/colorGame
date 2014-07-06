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
	console.log(color);
	return color;
}

function changeColor(color) {
	console.log(document.getElementById('game').style);
	document.getElementById('game').style.backgroundColor = '#00FF00'
	document.getElementById('game').style.backgroundColor = '#' + color;
}

function countDown(){
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
			var color = rgbToHex(colorThief.getColor(image));
			console.log(color);
			document.getElementById('color').style.backgroundColor = '#' + color;
			return;
		}
		document.getElementById('counter').innerHTML = count;
	}
}

function rgbToHex(rgb) {
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

