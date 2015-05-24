var canvas2 = document.createElement('canvas');
var ctx2 = canvas2.getContext('2d');
canvas2.width = 150;
canvas2.height = 50;

ctx2.font = '40px sans-serif'
ctx2.fillText('campjs', 0, 40);
ctx2.textBaseline = 'top'

var imagedata = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
var data = imagedata.data;

var marked = [];
var mx = 0, my = 0;

for (var y = 0; y < imagedata.height; y++) {
	for (var x = 0; x < imagedata.width; x++) {
		var i = (y * imagedata.width + x) * 4 + 3;
		if (data[i] > 0) marked.push({x: x, y: y});
	}	
}

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var NUMBER = 5000;
var particles = [];

function Particle() {
}

Particle.prototype.set = function(x, y, size, life) {
	this.x = x;
	this.y = y
	
	this.dx = 0;
	this.dy = 0;
	
	this.size = size;
	this.life = life;
	this.original_life = life;
}

Particle.prototype.spawn = function() {
	var pick = Math.random() * marked.length | 0;
	var x = marked[pick].x * 5 + Math.random() * 2;
	var y = marked[pick].y * 5 + Math.random() * 2;
	this.set(x, y, Math.random() * 4, Math.random() * 100 + 50);
}


Particle.prototype.draw = function() {
	this.life--;
	if (this.life <= 0) this.spawn();
	
	var dx = mx - this.x;
	var dy = my - this.y;
	
	var distance2 = dx * dx + dy * dy;
	var distance = Math.sqrt(distance2);
	
	if (distance < 100) {
		
		this.dx += dx / 100 * 4;
		this.dy += dy / 100 * 4;
	}
	
	this.dx *= 0.99;
	this.dy *= 0.99;
	
	this.x += this.dx;
	this.y += this.dy;
	
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
		mx = e.pageX;
		my = e.pageY;
	});
}

function draw() {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < NUMBER; i++ ) {
		particles[i].draw();
	}
	
}

init();
	draw();