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
	youngling: 0x696969,
	predator: PS.COLOR_BLACK,
	
};

var PREDATOR = {
	
	predArray: [],
	SPEED: 120,
	
	generate : function () {
		var side = PS.random(4);
		var pos;
		var val = PS.random(16) - 1;
		
		if (side == 1) {
			PS.color(val, MAP.HEIGHT-1, MAP.predator);
			PS.radius(val, MAP.HEIGHT-1, 50);
			//PS.debug("x: " + xValue + " y: " + yValue + "\n");
			pos = { x_pos: val,
					y_pos: MAP.HEIGHT-1 };
		}
		else if (side == 2) {
			PS.color(MAP.WIDTH-1, val, MAP.predator);
			PS.radius(MAP.WIDTH-1, val, 50);
			//PS.debug("x: " + xValue + " y: " + yValue + "\n");
			pos = { x_pos: MAP.WIDTH-1,
					y_pos: val };
		}
		else if (side == 3) {
			PS.color(val, 0, MAP.predator);
			PS.radius(val, 0, 50);
		//	PS.debug("x: " + xValue + " y: " + yValue + "\n");
			pos = { x_pos: val,
					y_pos: 0 };
		}
		else if (side == 4) {
			PS.color(0, val, MAP.predator);
			PS.radius(0, val, 50);
			//PS.debug("x: " + xValue + " y: " + yValue + "\n");
			pos = { x_pos: 0,
					y_pos: val };
		}
		PREDATOR.predArray.push(pos);
		MAP.myTimer = PS.timerStart(PREDATOR.SPEED, PREDATOR.predMove);
	},
	
	predMove : function() {
		var xValue;
		var yValue;
		var newY;
		var newX;
		var horizontal;
		
		//if (PREDATOR.predArray[0].y_pos > 7) {
			xValue = PREDATOR.predArray[0].x_pos;
			yValue = PREDATOR.predArray[0].y_pos;
			PREDATOR.predArray = [];
			
			var xAbs = Math.abs(xValue - 7);
			var yAbs = Math.abs(yValue - 7);
			PS.debug("x: " + xValue + " y: " + yValue + "\n");
			PS.color(xValue, yValue, PS.COLOR_WHITE);
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
			if (result.r == 105 && result.g == 105 && result.b == 105) {
				PS.timerStop(MAP.myTimer);
				PS.statusText("Your young has died!");
				MAP.gameOver = true;
			}
			PS.color(newX, newY, MAP.predator);
			PS.radius(newX, newY, 50);
			
			var pos = { x_pos: newX,
					y_pos: newY };
			PS.debug("x: " + newX + " y: " + newY + "\n");
			PREDATOR.predArray.push(pos);
			
		//}
	},
};

PS.init = function( system, options ) {
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

	PS.gridSize( MAP.WIDTH, MAP.HEIGHT );
	//PS.border(PS.ALL, PS.ALL, 0);
	PS.color(MAP.MID, MAP.MID, MAP.youngling);
	PS.radius(MAP.MID, MAP.MID, 50);
	PS.statusText("Protect Your Young!");


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
	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
	if (!MAP.gameOver) {
		if (key == 32) {
			PREDATOR.generate();
		}
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

