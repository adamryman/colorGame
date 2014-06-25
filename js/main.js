Webcam.set({
	image_format: 'jpeg',
	jpeg_quality: 90
});
Webcam.attach( '#my_camera' );

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
}
