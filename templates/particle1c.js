var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];

function Particle(x, y) {
	this.x = x;
	this.y = y;
}

Particle.prototype.draw = function() {
	ctx.fillStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
	ctx.fill();
}

function init() {
	for (var i = 0; i < 100; i++ ) {
		particles.push(new Particle(50 + Math.random() * 1000, 50));
	}
}

function draw() {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);


	for (var i = 0; i < 100; i++ ) {
		particles[i].draw();
	}
	
}

init();
draw();