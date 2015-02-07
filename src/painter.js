var Painter = function(ctx) {
	var drawInv = 0;
	this.draw = function(particle) {
		if(drawInv > 0)
			this.halt();
		//ctx.beginPath();
		drawInv = setInterval(function() {
			ctx.moveTo(particle.lastX, particle.lastY);
			ctx.lineTo(particle.x, particle.y);
			ctx.stroke();
		}, 50);
	}
	this.halt = function() {
		//ctx.closePath();
		clearInterval(drawInv);
		drawInv = 0;
	}
}