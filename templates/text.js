var canvas2 = document.createElement('canvas');
var ctx2 = canvas2.getContext('2d');
canvas2.width = 150;
canvas2.height = 50;

ctx2.font = '40px sans-serif'
ctx2.fillText('campjs', 0, 40);
ctx2.textBaseline = 'top'

// document.body.appendChild(canvas2);

var imagedata = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
var data = imagedata.data;

var marked = [];

for (var y = 0; y < imagedata.height; y++) {
	for (var x = 0; x < imagedata.width; x++) {
		var i = (y * imagedata.width + x) * 4 + 3;
		if (data[i] > 0) marked.push({x: x, y: y});
	}	
}
