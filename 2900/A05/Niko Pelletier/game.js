//Niko Pelletier
//Bust-A-Move
//Mod 1: The grid size can be changed by using the arrow keys. Left and right change 
//		 the width, and down and up change the height.
//Mod 2: Q and W can be used to cycle through different colors, which will be used to
//		 color a bead that is clicked on.
//Mod 3: Press B to toggle bead border visibility.
//Mod 4: Press C to toggle between a light or dark background.
//Mod 5: Changed sound effect to fx_drip2.

/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

const G = (function(){
	//Used for color switching capability
	const colorList = [PS.COLOR_BLACK, PS.COLOR_GRAY, PS.COLOR_WHITE,
					   PS.COLOR_RED, PS.COLOR_ORANGE, PS.COLOR_YELLOW,
					   PS.COLOR_GREEN, PS.COLOR_CYAN, PS.COLOR_BLUE,
					   PS.COLOR_INDIGO, PS.COLOR_VIOLET, PS.COLOR_MAGENTA];
	const colorStrs = ["Black", "Gray", "White",
					   "Red", "Orange", "Yellow",
					   "Green", "Cyan", "Blue",
					   "Indigo", "Violet", "Magenta"];
	
	let colorIndex = 0;
	
	const setStatusText = function(){
		PS.statusText("Selected color: " + colorStrs[colorIndex]);
	}

	const getColor = function(){return colorList[colorIndex]}
	const nextColor = function(){
		colorIndex = (colorIndex + 1) % colorList.length;
		setStatusText();
		return colorList[colorIndex];
	}
	const prevColor = function(){
		colorIndex--;
		if(colorIndex < 0){
			colorIndex = colorList.length - 1;
		}
		setStatusText();
		return colorList[colorIndex];
	}

	//Border toggling
	let borderVisible = true;
	const setBorderVisibility = function(){
		if(borderVisible){
			PS.border(PS.ALL, PS.ALL, 1);
		}else{
			PS.border(PS.ALL, PS.ALL, 0);
		}
	}
	const toggleBorderVisibility = function(){
		borderVisible = !borderVisible;
		setBorderVisibility();
	}

	//Background toggling
	let darkBG = true;
	const setBG = function(){
		if(darkBG){
			PS.gridColor(0x303030);
			PS.statusColor(PS.COLOR_WHITE);
		}else{
			PS.gridColor(PS.COLOR_WHITE);
			PS.statusColor(PS.COLOR_BLACK);
		}
	}
	const toggleBG = function(){
		darkBG = !darkBG;
		setBG();
	}

	return {
		getColor, nextColor, prevColor, setStatusText,
		setBorderVisibility, toggleBorderVisibility,
		setBG, toggleBG
	};
} ());

PS.init = function( system, options ) {
	// Establish grid dimensions

	PS.gridSize( 7, 7 );

	// Set background color

	G.setBG();

	// Change status line text

	G.setStatusText();

	// Set border visible

	G.setBorderVisibility();

	// Preload click sound

	PS.audioLoad( "fx_drip2" );
};

PS.touch = function( x, y, data, options ) {
	// Toggle color of touched bead from white to black and back again
	// NOTE: The default value of a bead's [data] is 0, which happens to be equal to PS.COLOR_BLACK

	PS.color( x, y, G.getColor() ); // set color to current color value in G

	PS.audioPlay( "fx_drip2" );
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// The size of the grid can be changed using the arrow keys
	// left decreases width, right increases width
	// down decreases height, up increases height

	// The color placed when clicking can be changed with Q and W

	// Border visibility can be toggled with B

	//BG color can be toggled with C

	let dimensions = PS.gridSize();

	switch(key){
		// grid size cases
		case PS.KEY_ARROW_LEFT:
			PS.gridSize(dimensions.width - 1, dimensions.height);
			break;
		case PS.KEY_ARROW_RIGHT:
			PS.gridSize(dimensions.width + 1, dimensions.height);
			break;
		case PS.KEY_ARROW_DOWN:
			PS.gridSize(dimensions.width, dimensions.height - 1);
			break;
		case PS.KEY_ARROW_UP:
			PS.gridSize(dimensions.width, dimensions.height + 1);
			break;

		//color cases
		case 113: //q
			G.prevColor();
			break;
		case 119: //w
			G.nextColor();
			break;
		
		//border visibility cases
		case 98: //b
			G.toggleBorderVisibility();
			break;
		
		//bg color cases
		case 99: //c
			G.toggleBG();
			break;
	}
	G.setBG();
	G.setBorderVisibility();
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

