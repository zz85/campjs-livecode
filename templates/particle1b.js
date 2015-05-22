var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw() {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < 100; i++ ) {
		ctx.fillStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(50 + Math.random() * 1000, 50, 5, 0, Math.PI * 2);
		ctx.fill();
	}
	
}

draw();