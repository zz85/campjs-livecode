// Adapted from http://formandcode.com/code-examples/simulate-particles

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var NUMBER = 1000;
var particles = [];
var HALF_PI = Math.PI * 0.5;
var TWO_PI = Math.PI * 2;

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
}

function Particle(x, y) {
	this.position = new Vector(x, y)
	this.dx = 0;
	this.dy = 0;
	
	var randmin = -HALF_PI;
    var randmax = 0;
	
	var r = Math.random() * TWO_PI;
	x = Math.cos(r);
	y = Math.sin(r);
	
	this.acceleration = new Vector(x / 250, y / 250);
	
	
	var q = Math.random();
    r = q * randmax;
    x = Math.cos(r) * q;
    y = Math.sin(r) * q;
	this.velocity = new Vector(x, y);
	
	var history = new Array(1000);
	
	for (var i = 0; i < history.length; i++) {
		history[i] = new Vector();
	}
	
	this.counter = 0;

	this.history = history;
	
}

Particle.prototype.update = function(save) {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	
	if (save) {
		var item = this.history[this.counter];
		
		item.x = this.position.x;
		item.y = this.position.y;
		
		this.counter++;
	}
}

Particle.prototype.draw = function() {
	ctx.strokeStyle = '#888'
	
	ctx.beginPath();
	var item = this.history[0];
	ctx.moveTo(item.x, item.y);
	
	var last = null;
	for (var i = 1; i < this.counter; i++) {
		item = this.history[i];
		ctx.lineTo(item.x, item.y);
	}
	
	ctx.stroke();
	
	drawArrowHead(this);
}

function init() {
	for (var i = 0; i < NUMBER; i++ ) {
		particles.push(new Particle(Math.random() * window.innerWidth * 0.5, Math.random() * window.innerHeight * 0.8));
	}
}

function drawArrowHead(particle) {
	var pos = particle.position;
	var vel = particle.velocity;
	var angle = Math.atan2(vel.y, vel.x);
	
	ctx.fillStyle = '#aaa';
	ctx.save();

	ctx.translate(pos.x, pos.y);
	var scale = 1;
	ctx.scale(scale, scale); 		
	
	ctx.rotate(angle);
	ctx.beginPath();
	
	ctx.moveTo(0, -5);
	ctx.lineTo(0, 5);
	ctx.lineTo(10, 0);
	ctx.fill();
		
	ctx.restore();
}

var draws = 0;

function draw() {
	requestAnimationFrame(draw);
	
	draws++;
	
	var save = draws % 10 === 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < particles.length; i++ ) {
		particles[i].update(save);
		particles[i].draw();
	}
	
	// drawArrowHead();
}

init();
draw();




