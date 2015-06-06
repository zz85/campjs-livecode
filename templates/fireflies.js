// Playing with imitation of fireflies pulsing lights
// Some references:
// 	http://www.instructables.com/id/Synchronizing-Fireflies/
//	http://webapps2.ucalgary.ca/~esd/?q=node/90
//	http://blog.bongiovi.tw/dark-forest-part-1/

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function firefly(x, y, radius) {
	ctx.fillStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fill();	
}

var space = 40;
var row = window.innerWidth / space | 0;
var col = window.innerHeight / space | 0;
var max_radius = 2;


var flies = new Array(row * col);

// We set some variation for phase time offsets, and phase durations.
// then we are able to experiment with the synchronization factor

// here we play with the phases, the flies variances
					  
for (i = 0; i < flies.length; i ++) {
	flies[i] = { 
		offset: Math.random() * 2.4, // time offset
		phase: (Math.random() - 0.5) * 0.3 // periodic offset
	}
}

function draw() {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	var twitch = Math.sin(Date.now() * 0.001) * 0.0;
	var phase = 4.0 + twitch;
	var t = performance.now() / 1000;
	
	for (x = 1; x < col - 1; x++ ) {
		for (y = 1; y < row - 1; y++ ) {
			var i = y * col + x;
			var fly = flies[i];
			
			
			// we could possibly average the entire fields
			var neighbour1 = flies[y * col + x - 1];
			var neighbour2 = flies[y * col + x + 1];
			var neighbour3 = flies[(y - 1) * col + x];
			var neighbour4 = flies[(y + 1) * col + x];
			
			var factor = 0.99; // high number means less influenced
			// comment this with a low phase, and its still interesting
			fly.offset = (neighbour1.offset + neighbour2.offset + neighbour3.offset + neighbour4.offset) * (1 - factor) * 0.25 + factor * fly.offset;
			
			factor = 0.99;
			fly.phase = (neighbour1.phase + neighbour2.phase + neighbour3.phase + neighbour4.phase) * (1 - factor) / 4 + factor * fly.phase;
			
			var tmpPhase = phase + fly.phase;
			var radius = (t + fly.offset) % tmpPhase;
			radius = radius / tmpPhase;
			
			var tx = Math.cos(radius * Math.PI * 2) * 14;
			var ty = Math.sin(radius * Math.PI * 2) * 14;
			
			
			radius = radius * radius;
			
			firefly(space * x + tx, space * y + ty, radius * max_radius);
		}
	}
}

draw();