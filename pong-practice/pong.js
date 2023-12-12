// get a random signed number
window.signedRand = function (min, max, unrounded){
	let sign = Math.random() > 0.5 ? -1 : 1;
	let randRange = Math.random() * (max - min + 1);
	let minRange = (unrounded ? randRange : Math.floor(randRange))
    return sign * (minRange + min);
}

Math.addIgnoreSign = function (a, b) {
	return Math.sign(a) * Math.abs(a + b);
}

let Pong = function () {
	let canvas = document.getElementById("canvas");
	let WIDTH = canvas.width;
	let HEIGHT = canvas.height;
	let acceleration = 0.5; // sets the acceleration everytime the ball its a board
	let playing = true; // true if the game is running
	let AIHelper = true; // if this is true then we are going to help the AI out by speeding it up
	
	let ghostReaction = 6; // a higher number == slower reaction to the ghost ball
	
	// true reaction is half on the first hit (so it doubles after first hit)
	let trueReaction = 4; // a heigher number == slower reaction to the true/real ball
	let ghostSpeed = 5; // the max speed of the ghost ball
	let paddleSpeed = 7; // the speed of the paddle
		
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = ctx.strokeStyle = "white";
	ctx.font = '48px serif';
	
	let Elements = {}; // hold the different drawing elements
	let Player1Score = 0;
	let Player2Score = 0;
	
	function calculateChangeInY(ballY, paddle) {
		let totalPaddle = paddle.height;
		let center = paddle.y + totalPaddle/2;
		let distanceFromCenter = ballY - center
		return 12 * Math.sin(distanceFromCenter/totalPaddle * (Math.PI/2));
	}
	
	let KeyBinding = new (function () { // keep track of keys that are pressed
		let pressing = new Set(); // ensure uniqueness
		let keyMap = { // map keys for convenience and readable while in use
			"uparrow": 38,
			"downarrow": 40,
			"w": 87,
			"s": 83
		}
		
		this.register = function (keyCode) { // add a key
			pressing.add(keyCode);
		}
		
		this.clear = function (keyCode) { // remove a key
			pressing.delete(keyCode);
		}
		
		this.pressing = function (keyname) { // check if the key is pressed by checking if it is availiable
			return pressing.has(keyMap[keyname]);
		}
		
		// Register Key Bindings
		window.addEventListener('keydown', function (event) { KeyBinding.register(event.keyCode); }, false); 
		window.addEventListener('keyup', function (event) { KeyBinding.clear(event.keyCode); }, false);
	})();
	
	// not really important to the functionality, but will add an effect for when the ball hits the paddle
	let Emitter = new (function (number) {
		let Particles = null;
		let Particle = function (particleID, xco, yco) {
			let ang = particleID/number*2*Math.PI; // get the desired angle that you want the particle to move
			let x = xco; // starting x
			let y = yco; // starting y
			let xi = Math.cos(ang); // change in x
			let yi = Math.sin(ang); // change in y
			let radius = 1;

			this.draw = function () {
				if (radius > 0) {
					ctx.beginPath();
					ctx.arc(x, y, radius, 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.fill();

					x += xi;
					y += yi;
					radius -= 0.05; // make the particles fade away
				} else {
					delete Particles[particleID];
				}
			}
		}
		
		this.set = function (xco, yco) {
			Particles = {};
			for (let i = 0; i < number; i++) {
				Particles[i] = new Particle(i, xco, yco);
			}
		}
		
		this.draw = function () {
			for (let particle in Particles) {
				Particles[particle].draw();
			}
		}
		// 15 number of particles
	})(15);
	
	let Ball = function (x_coord, y_coord, radius, hidden) {
		this.xi = signedRand(7,9); //every ball starts with a unique velocity
		this.yi = signedRand(1, 5);
		this.x = x_coord;
		this.y = y_coord;
		this.radius = radius;
		
		this.hitTopBoundary = function () { // checks if the ball its the top or bottom
			return this.y + this.yi > HEIGHT - radius || this.y + this.yi < radius;
		}

		this.outOfBound = function () { // checks if the ball is out of bound
			return this.x > WIDTH + radius || this.x < -radius;
		}

		this.draw = function () {
			if (!hidden) {
				ctx.beginPath(); // draw ball
				ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				
				if (this.outOfBound()) {
					if (this.x > WIDTH/2) { // if on right side
						Player2Score++;
					} else { 
						Player1Score++;
					}
					playing = false;
					
					// reset the game
					setTimeout(() => {
						Elements.ball = new Ball(WIDTH/2, HEIGHT/2, 7);
						if (!AIHelper) trueReaction /= 2;
						
						acceleration = 0.5;
						paddleSpeed = 6;
						playing = true;
						AIHelper = true;
					}, 1500);
				}
			}
			if (this.outOfBound()) Elements.ghostBall = null;
			if (this.hitTopBoundary()) {
				this.yi = -this.yi;
			}
			
			// update positioning
			this.x += this.xi;
			this.y += this.yi;
		}
	}

	let Paddle = function (x) {
		this.height = 100; 
		this.width = 10;
		this.x = x; 
		this.y = HEIGHT/2 - this.height/2;  // initial position should be in the center
		let movement = function () {}; // handles movement this.init
		
		this.hitLeftPaddle = function (b1) { // detection from the left side of the paddle
			if (b1 == null) return false;
			
			let rightSide = this.width + this.x; // off by 30 and width of 10
			let top = this.y;
			let bottom = top + this.height;
			
			// We are basically trying to see if the ball has touched the box
			return b1.x + b1.xi < rightSide + b1.radius && 
			       b1.x - b1.xi > this.x &&
				   b1.y > top - b1.radius && 
				   b1.y < bottom + b1.radius
		}

		this.hitRightPaddle = function (b1) { // detection from the right side of the paddle
			if (b1 == null) return false;
			
			let leftSide = this.x; // off by 30 and width of 10
			let top = this.y;
			let bottom = top + this.height;
			
			// We are basically trying to see if the ball has touched the box
			return b1.x + b1.xi > leftSide - b1.radius &&
			       b1.x - b1.xi < this.x + this.width &&
				   b1.y > top - b1.radius &&
				   b1.y < bottom + b1.radius
		}
		
		this.bindMovement = function (movementStatement) { // bind the movement function
			movement = movementStatement;		
		}

		this.draw = function () {
			ctx.beginPath(); // draw the paddle
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fill();
			ctx.closePath();
			
			////
			// We move the paddle based on function based in so that we have flexiblity
			// to add a computer or switch to two players.
			////
			let move = movement.call(this);
			if (move != null) this.y = this.y + move;
			if (this.y < 0) this.y = 0;
			if (this.y > (HEIGHT - this.height)) this.y = HEIGHT - this.height;
		}
	}

	let generateGhost = function () { // creates a ghost based on the 
		Elements.ghostBall = new Ball(Elements.ball.x, Elements.ball.y, 7, true);
		Elements.ghostBall.xi = Math.addIgnoreSign(Elements.ball.xi, ghostSpeed * Math.random());
		Elements.ghostBall.yi = Elements.ball.yi + Math.random()/7;
	}
	
	this.init = function () {
		////
		// Create our three moving parts to the game
		////
		Elements.ball = new Ball(WIDTH/2, HEIGHT/2, 7);
		Elements.paddle1 = new Paddle(30);
		Elements.paddle2 = new Paddle(WIDTH - 40);
		
		
		Elements.paddle1.bindMovement(function () { // binds the movement of paddle 1 to the up and down arrows
			if (KeyBinding.pressing("uparrow")) return -paddleSpeed;
			if (KeyBinding.pressing("downarrow")) return paddleSpeed;
		});
		
		// for now we are using a bot with the help of a ghost ball 
		// the ghost ball appears everytime the ball its the left paddle and goes away when it hits the right
		Elements.paddle2.bindMovement(function () { 
			let padY = this.y + this.height/2;
			if (Elements.ghostBall != null) {
				return (Elements.ghostBall.y - padY)/ghostReaction;
			} else {
				return (Elements.ball.y - padY)/trueReaction;
			}
		});
		/*function () { // optionally to make this two players, bind paddle 2 to w and s
			if (KeyBinding.pressing("w")) return -paddleSpeed;
			if (KeyBinding.pressing("s")) return paddleSpeed;
		}*/
	}
	
	this.start = function () {
		this.init();
		this.draw();
	};
	this.stop = () => playing=false;
	
	this.draw = function () {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		Emitter.draw();
		////
		// Redraw all elements 
		////
		Elements.paddle1.draw(); // paddles can move even if the rest of the game does not
		Elements.paddle2.draw();
		
		if (playing) { // if we are playing
			Elements.ball.draw();
			// if we have a ghost ball then we should draw it
			if (Elements.ghostBall) Elements.ghostBall.draw(); 

			// save us some work while the ball is traveling since it can not possible
			// hit the paddle if it isnt below or above these ranges
			if (Elements.ball.x < 50 || Elements.ball.x > WIDTH-50) {
				if (Elements.paddle1.hitLeftPaddle(Elements.ball)) {
					////
					// calculateChangeInY will change the change in y depending on where on the paddle we hit
					////
					Elements.ball.yi = calculateChangeInY(Elements.ball.y, Elements.paddle1); // change vertical velocity of the ball
					Elements.ball.xi = -Math.addIgnoreSign(Elements.ball.xi, acceleration); // switch the x direction with acceleration

					generateGhost(); // generate our ghost
					Emitter.set(Elements.ball.x, Elements.ball.y); // emit the particle effect

					paddleSpeed += acceleration/1.5; // speed up the paddle a little less than the ball is speeding up
				} else {
					if (Elements.paddle2.hitRightPaddle(Elements.ball)) {
						if (AIHelper) {
							trueReaction *= 2;
							AIHelper = false;
						}
						Elements.ball.yi = calculateChangeInY(Elements.ball.y, Elements.paddle2); // change vertical velocity of the ball
						Elements.ball.xi = -Math.addIgnoreSign(Elements.ball.xi, acceleration); // switch the x direction with acceleration 
						Emitter.set(Elements.ball.x, Elements.ball.y); //emit the particle effect
					}
				}
			}
			if (Elements.ghostBall && Elements.ghostBall.x > WIDTH-50) {
				if (Elements.paddle2.hitRightPaddle(Elements.ghostBall)) {
					Elements.ghostBall = null;
				}
			}
		}
		
		// Some design while the game is ongoing
		ctx.fillText(Player1Score, WIDTH/2 - 100, 50);
		ctx.fillText(Player2Score, WIDTH/2 + 75, 50);
		ctx.setLineDash([10, 10]);
		ctx.moveTo(WIDTH/2, 0);
		ctx.lineTo(WIDTH/2, HEIGHT);
		ctx.stroke();

		window.requestAnimationFrame(this.draw.bind(this));
	}
};


var PongGame;
document.getElementById("restart").addEventListener('click', function () {
    if (PongGame != null) PongGame.stop();
    PongGame = new Pong();
    PongGame.start();
});