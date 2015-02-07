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
};var Painter = function(ctx) {
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
};var Particle = function(x, y, vx, vy, bounds, lifespan) {
	
	/*
	 * initiate default properties with gven values
	 */
	this.lastX = x;
	this.lastY = y;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.lifespan = lifespan; // seconds

	/*
	 * the lifecycle of a particle
	 */
	this.age = 0; // milliseconds
	var lifeStep = 50; // milliseconds
	var lifeInterval = 0;
	var live = function() {
		
		// to live means to keep walking
		this.lastX = this.x;
		this.lastY = this.y;
		this.x += this.vx;
		this.y += this.vy;
		
		// and switch direction when facing brickwalls
		if(this.x > bounds[2] || this.x < bounds[0]) {
			switchDirection('vx');
			this.x = this.lastX;
			this.y = this.lastY;
		}
		if(this.y > bounds[3] || this.y < bounds[1]) {
			switchDirection('vy');
			this.x = this.lastX;
			this.y = this.lastY;
		}

		// kill the particle when it's too old
		this.age += lifeStep;
		if(this.age >= this.lifespan*1000)
			this.die();

	}.bind(this);

	var switchDirection = function(v) {
		var seed = Math.random();
		this[v] = (seed > 0.1)? this[v]*-1 : this[v]*(Math.random()-1.5);
	}.bind(this);

	this.die = function() {
		if(lifeInterval > 0) {
			clearInterval(lifeInterval);
			lifeInterval = 0;
		}
	}
	this.live = function() {
		if(lifeInterval == 0) {
			this.age = 0;
			lifeInterval = setInterval(live, lifeStep);
		}
	}

	// set the particle to be alive by default
	this.live();
	console.log((new Date())+": A particle was born that day.");

}