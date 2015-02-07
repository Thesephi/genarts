var GenArts = function(ctx) {
	
	this.VERSION = "0.0.1";
	this.particles = [];
	this.painters = [];
	this.isPlaying = false;

	/*
	 * basic mode:
	 * run 2 lazer beams for 330 seconds
	 * the beams are bound to bounce off the canvas borders
	 */
	this.basic = function(x, y, vx, vy) {
		
		ctx.imageSmoothingEnabled = true;
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#00C5CD";
		
		refreshParticles();
		var bounds = [0, 0, ctx.canvas.width, ctx.canvas.height]; // so that the particles know where to bounce off
		this.particles.push(
			new Particle(x, y, vx, vy, bounds, 330), 
			new Particle(x, y, -vx, -vy, bounds, 330)
		);
		
		refreshPainters();
		var len = this.particles.length;
		for(var i=0; i<len; i++) {
			this.painters.push(new Painter(ctx));
			this.painters[i].draw(this.particles[i]);
		}
		
		this.isPlaying = true;
	}

	this.pause = function() {
		for(var idx in this.particles) {
			this.particles[idx].die();
		}
		this.isPlaying = false;
	}
	this.resume = function() {
		for(var idx in this.particles) {
			this.particles[idx].live();
		}
		this.isPlaying = true;
	}
	this.togglePause = function() {
		this.isPlaying? this.pause() : this.resume();
	}

	var refreshParticles = function() {
		for(var idx in this.particles) {
			this.particles[idx].die();
			this.particles[idx] = null;
		}
		this.particles = [];
	}.bind(this);
	var refreshPainters = function() {
		for(var idx in this.painters) {
			this.painters[idx].halt();
			this.painters[idx] = null;
		}
		this.painters = [];
	}.bind(this);

	window.GenArts = this;
}