var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var NUMBER = 0;
var particles = [];
var mousex = 0;
var mousey = 0;

function Particle() {
}

Particle.prototype.set = function(x, y, size, life, angle) {
	this.x = x;
	this.y = y
	
	var speed = life;
	this.dx = Math.cos(angle) * speed;
	this.dy = Math.sin(angle) * speed;
	
	this.size = size;
	this.life = life;
}

Particle.prototype.spawn = function() {
	var x = mousex;
	var y = mousey;
	this.set(x, y, Math.random() * 4 + 2, Math.random() * 20, Math.random() * Math.PI * 2);
}


Particle.prototype.draw = function() {
	this.life-=0.1;
	if (this.life <= 0) {
		particles.splice(particles.indexOf(this), 1);
		return;
	}
	
	this.x += this.dx;
	this.y += this.dy;
	
	var s = this.life / this.original_life * this.size;
	
	ctx.fillStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	ctx.fill();
}

function init() {
	for (var i = 0; i < NUMBER; i++ ) {
		var p = new Particle();
		p.spawn();
		particles.push(p);
	}
	
	window.addEventListener('mousemove', function(e) {
		mousex = e.pageX;
		mousey = e.pageY;
	});
}

function draw() {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < particles.length; i++ ) {
		particles[i].draw();
	}
}

init();
draw();


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

	// document.body.appendChild(vcanvas);

	setInterval(getData, 100);

}

var THRESHOLD = 79;
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
			
			var p = new Particle();
			
			p.set(x / tw * window.innerWidth, y / th * window.innerHeight, Math.random() + 1, Math.random(), Math.random() * Math.PI * 2)
			particles.push(p);
		}

		buffer[ii] = d;
	}
}

