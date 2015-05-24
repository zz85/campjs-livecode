var video = document.createElement('video');
document.body.appendChild(video);
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


var tw = 1280 / 4;
var th = 720 / 4;

var hdConstraints = {
	audio: false,
	video: {
		mandatory: {
			maxWidth: tw,
			maxHeight: th
    	}
  	}
};

if (navigator.getUserMedia) {
	navigator.getUserMedia(hdConstraints, success, errorCallback);
} else {
	errorCallback('');
}

function errorCallback(e) {
	console.log('cant acceess user media', e);
}


function success(stream) {
	video.src = window.URL.createObjectURL(stream);
	video.play();
	vcanvas = document.createElement('canvas');
	vctx = vcanvas.getContext('2d');

	vcanvas.width = tw;
	vcanvas.height = th;

	document.body.appendChild(vcanvas);

	setInterval(getData, 100);

}

var THRESHOLD = 76;
var buffer = new Array(tw * th)
				
function getData() {
	vctx.drawImage(video, 0, 0);

	var data = vctx.getImageData(0,0, vcanvas.width, vcanvas.height).data;

	var ii = 0;
	for (var i = 0; i < data.length; i+=4) {
		var d = (data[i] + data[i + 1] + data[i + 2]) / 3;
		ii++;

		if (Math.abs(d - buffer[ii]) > THRESHOLD) {
			// motion!
			vctx.beginPath();
			vctx.fillStyle = 'red';
			var x = ii % tw;
			var y = ii / tw | 0;
			vctx.arc(x, y, 4, 0, Math.PI * 2);
			vctx.fill();
		}

		buffer[ii] = d;
	}
}