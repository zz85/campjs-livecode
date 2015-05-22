var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var NUMBER = 100;
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
	this.life-=0.2;
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
	
	window.addEventListener('mousemove', function(e) {
		mousex = e.pageX;
		mousey = e.pageY;
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