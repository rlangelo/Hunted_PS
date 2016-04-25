// game.js for Perlenspiel 3.2

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-15 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.

Perlenspiel uses dygraphs (Copyright © 2009 by Dan Vanderkam) under the MIT License for data visualization.
See dygraphs License.txt, <http://dygraphs.com> and <http://opensource.org/licenses/MIT> for more information.
*/

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// This is a template for creating new Perlenspiel games

// All of the functions below MUST exist, or the engine will complain!

// PS.init( system, options )
// Initializes the game
// This function should normally begin with a call to PS.gridSize( x, y )
// where x and y are the desired initial dimensions of the grid
// [system] = an object containing engine and platform information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

var MAP = {

	WIDTH: 16,
	HEIGHT: 16,
	gameOver: false,
	MID: 7,
	myTimer: 0,
	youngling: 0xffffff,
	predator: 0x7c7c7c,
	SCORE: 0,
	player: 0xd2d2d2,
	
};

var PLAYER = {
	X_POS: 8,
	Y_POS: 7,

	moveVertically: function(direction) {
		var newY;
		if (direction == 1) {
			newY = PLAYER.Y_POS - 1;
		}
		else {
			newY = PLAYER.Y_POS + 1;
		}
		var result = PS.unmakeRGB(PS.color(PLAYER.X_POS, newY), {});
		if (result.r != 255 && result.g != 255 && result.b != 255) {
			PS.color(PLAYER.X_POS, newY, 0xd2d2d2)
			PS.color(PLAYER.X_POS, PLAYER.Y_POS, PS.COLOR_BLACK);
			PLAYER.Y_POS = newY;
		}
		if (result.r == 124 && result.g == 124 && result.b == 124) {
			PREDATOR.kill();
			PS.radius(PLAYER.X_POS, newY, 0);
		}
	},

	moveHorizontally: function(direction) {
		var newX;
		if (direction == 1) {
			newX = PLAYER.X_POS - 1;
		}
		else {
			newX = PLAYER.X_POS + 1;
		}
		var result = PS.unmakeRGB(PS.color(newX, PLAYER.Y_POS), {});
		if (result.r != 255 && result.g != 255 && result.b != 255) {
			PS.color(newX, PLAYER.Y_POS, 0xd2d2d2)
			PS.color(PLAYER.X_POS, PLAYER.Y_POS, PS.COLOR_BLACK);
			PLAYER.X_POS = newX;
		}
		if (result.r == 124 && result.g == 124 && result.b == 124) {
			PREDATOR.kill();
			PS.radius(newX, PLAYER.Y_POS, 0);
		}
	}

};

var PREDATOR = {
	
	predArray: [],
	maxPreds: 1,
	SPEED: 80,
	moveTimer: 0,
	
	generate : function () {
		var side = PS.random(4);
		var pos;
		var val = PS.random(16) - 1;
		if (PREDATOR.predArray.length < PREDATOR.maxPreds) {
		if (side == 1) {
			PS.color(val, MAP.HEIGHT-1, MAP.predator);
			PS.radius(val, MAP.HEIGHT-1, 50);
			pos = { x_pos: val,
					y_pos: MAP.HEIGHT-1 };
		}
		else if (side == 2) {
			PS.color(MAP.WIDTH-1, val, MAP.predator);
			PS.radius(MAP.WIDTH-1, val, 50);
			pos = { x_pos: MAP.WIDTH-1,
					y_pos: val };
		}
		else if (side == 3) {
			PS.color(val, 0, MAP.predator);
			PS.radius(val, 0, 50);
			pos = { x_pos: val,
					y_pos: 0 };
		}
		else if (side == 4) {
			PS.color(0, val, MAP.predator);
			PS.radius(0, val, 50);
			pos = { x_pos: 0,
					y_pos: val };
		}
		PREDATOR.predArray.push(pos);
		PREDATOR.updateSpeed();
		PREDATOR.moveTimer = PS.timerStart(PREDATOR.SPEED, PREDATOR.predMove);
		}
	},
	
	updateSpeed : function() {
		if (MAP.SCORE == 5)
		{
			PREDATOR.SPEED = 60;
		}
		else if (MAP.SCORE == 10)
		{
			PREDATOR.SPEED = 50;
		}
		else if (MAP.SCORE == 15)
		{
			PREDATOR.SPEED = 40;
		}
		else if (MAP.SCORE == 20)
		{
			PREDATOR.SPEED = 35;
		}
		else if (MAP.SCORE == 25)
		{
			PREDATOR.SPEED = 30;
		}
		else if (MAP.SCORE == 30)
		{
			PREDATOR.SPEED = 25;
		}
		else if (MAP.SCORE == 35)
		{
			PREDATOR.SPEED = 20;
		}
		else if (MAP.SCORE == 40)
		{
			PREDATOR.SPEED = 15;
		}
		else if (MAP.SCORE == 50)
		{
			PREDATOR.SPPED = 10;
		}
	},
	
	predMove : function() {
		var xValue;
		var yValue;
		var newY;
		var newX;
		var horizontal;
		
			xValue = PREDATOR.predArray[0].x_pos;
			yValue = PREDATOR.predArray[0].y_pos;
			PREDATOR.predArray = [];
			
			var xAbs = Math.abs(xValue - 7);
			var yAbs = Math.abs(yValue - 7);
			PS.color(xValue, yValue, PS.COLOR_BLACK);
			PS.radius(xValue, yValue, 0);
			
			if (xValue > 7 && yValue > 7) {
				newX = xValue -1;
				newY = yValue -1;
			}
			else if (xValue > 7 && yValue < 7) {
				newX = xValue -1;
				newY = yValue +1;
			}
			else if (xValue < 7 && yValue < 7) {
				newX = xValue +1;
				newY = yValue +1;
			}
			else if (xValue < 7 && yValue > 7) {
				newX = xValue +1;
				newY = yValue -1;
			}
			else if (xValue == 7 && yValue < 7) {
				newX = xValue;
				newY = yValue +1;
			}
			else if (xValue == 7 && yValue > 7) {
				newX = xValue;
				newY = yValue-1;
			}
			else if (xValue < 7 && yValue == 7) {
				newX = xValue +1;
				newY = yValue;
			}
			else if (xValue > 7 && yValue == 7) {
				newX = xValue-1;
				newY = yValue;
			}
			
			var result = PS.unmakeRGB(PS.color(newX, newY), {});

			if (result.r == 255 && result.g == 255 && result.b == 255) {
				PS.timerStop(PREDATOR.moveTimer);
				PS.timerStop(MAP.myTimer);
				PS.statusText("Your young has died! || SCORE: " + MAP.SCORE);
				MAP.gameOver = true;
			}
			PS.color(newX, newY, MAP.predator);
			PS.radius(newX, newY, 50);

			var pos = { x_pos: newX,
				y_pos: newY };
			PREDATOR.predArray.push(pos);
			if(result.r == 210 && result.g == 210 && result.b == 210){
				PREDATOR.kill();
				PS.radius(newX, newY, 0);
				PS.color(newX, newY, 0xd2d2d2)
			}



	},
	
	kill : function () {

		PREDATOR.predArray = [];
		PS.timerStop(PREDATOR.moveTimer);
		MAP.SCORE = MAP.SCORE + 1;
		PS.statusText("Protect Your Young! || SCORE: " + MAP.SCORE);
		PREDATOR.generate();
	}
};

PS.init = function( system, options ) {
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

	PS.statusColor(PS.COLOR_WHITE);
	PS.gridSize( MAP.WIDTH, MAP.HEIGHT );
	PS.border(PS.ALL, PS.ALL, 0);
	PS.gridColor(PS.COLOR_BLACK);
	PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);
	PS.color(MAP.MID, MAP.MID, MAP.youngling);
	PS.radius(MAP.MID, MAP.MID, 50);
	PS.statusColor(PS.COLOR_WHITE);
	PS.color(PLAYER.X_POS, PLAYER.Y_POS, MAP.player);
	PS.statusText("Protect Your Young! || SCORE: " + MAP.SCORE);
	PS.gridShadow(true, PS.COLOR_WHITE);
	MAP.myTimer = PS.timerStart(60, PREDATOR.generate);

	// Add any other initialization code you need here
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function( options ) {
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	//PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
	switch(key) {
		case 1005:
			PLAYER.moveHorizontally(1);
			break;
		case 1006:
			PLAYER.moveVertically(1);
			break;
		case 1007:
			PLAYER.moveHorizontally(2);
			break;
		case 1008:
			PLAYER.moveVertically(2);
			break;
		case 32:
			if (!MAP.gameOver) {
				PREDATOR.kill();
			}
			break;
		case 114:
			PS.init();
			break;
		default:
			break;
	}
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.swipe ( data, options )
// Called when a mouse/finger swipe across the grid is detected
// It doesn't have to do anything
// [data] = an object with swipe information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.swipe = function( data, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters

	/*
	 var len, i, ev;
	 PS.debugClear();
	 PS.debug( "PS.swipe(): start = " + data.start + ", end = " + data.end + ", dur = " + data.duration + "\n" );
	 len = data.events.length;
	 for ( i = 0; i < len; i += 1 ) {
	 ev = data.events[ i ];
	 PS.debug( i + ": [x = " + ev.x + ", y = " + ev.y + ", start = " + ev.start + ", end = " + ev.end +
	 ", dur = " + ev.duration + "]\n");
	 }
	 */

	// Add code here for when an input event is detected
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function( sensors, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

