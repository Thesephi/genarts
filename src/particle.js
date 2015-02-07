var Particle = function(x, y, vx, vy, bounds, lifespan) {
	
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