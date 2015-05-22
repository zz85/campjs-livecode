var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var NUMBER = 100;
var particles = [];

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
	var x = window.innerWidth / 2;
	var y = window.innerHeight / 2;
	this.set(x, y, Math.random() * 2 + 1, Math.random() * 40, Math.random() * Math.PI * 2);
}


Particle.prototype.draw = function() {
	this.life--;
	if (this.life <= 0) this.spawn();
	
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