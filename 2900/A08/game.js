/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

// Game namespace
const G = (function (){

	// Set array of colors used for labelling the piano keys (12 color wheel)
	const note_colors = [0xff0000, 0xff8000, 0xffff00,
		                 0x80ff00, 0x00ff00, 0x00ff80,
						 0x00ffff, 0x0080ff, 0x0000ff,
						 0x8000ff, 0xff00ff, 0xff0080];

	// Octave starts at base of 3
	// Functions called to increase and decrease the octave within the range of 1-7
	// The glyph identifying the octave updates as well
	let octave = 3;
	const octaveUp = function(){
		if(octave < 7) octave++;
		PS.glyph(12, 4, octave.toString());
		PS.audioPlay("fx_click");
	}
	const octaveDown = function(){
		if(octave > 1) octave--;
		PS.glyph(12, 4, octave.toString());
		PS.audioPlay("fx_click");
	}

	// Given a key, returns the piano sound calculated from the key value and octave
	const getNote = function(key){
		return PS.piano(4 + key + (octave-1)*12);
	}

	// Applies a border to the given selected cell and marks it as selected, so 
	// the user can see which cell is selected, and calls to assignNote know which
	// key to assign the note to.
	let selected = [0,0];
	const select = function(x,y){
		PS.border(selected[0],selected[1],1);
		selected = [x,y];
		PS.border(selected[0],selected[1],4);
		PS.audioPlay("fx_click");
	}

	// Ascii for computer keyboard inputs, in order of their placement on the keyboard.
	const kbd = [[49, 50, 51, 52, 53, 54, 55, 56, 57],
	             [113, 119, 101, 114, 116, 121, 117, 105, 111],
				 [97, 115, 100, 102, 103, 104, 106, 107, 108],
				 [122, 120, 99, 118, 98, 110, 109, 44, 46]];
	
	// Object used to associate piano notes with keys on the keyboard. This is filled in and used by assignNote 
	// and playNote.
	let kbd_notes = {};

	// Given the piano key, assigns the correlating note to the previously selected computer keyboard cell
	// Also colors the selected cell the same color as the given piano key
	const assignNote = function(piano_key){
		PS.color(selected[0],selected[1], note_colors[piano_key]);
		const kbd_key = kbd[selected[1]][selected[0]-3];
		kbd_notes[kbd_key] = getNote(piano_key);
	}

	// Given the computer keyboard cell, plays the piano note assigned to it
	const playNote = function(kbd_key){
		if(kbd_key in kbd_notes){
			PS.audioPlay(kbd_notes[kbd_key], {volume:.3});
		}
	}

	return {
		note_colors,
		octaveUp, octaveDown, getNote,
		select,
		kbd, assignNote, playNote
	}
}())

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	const BG_COLOR = 0x303030;

	PS.gridSize( 15, 5 );
	PS.gridColor(BG_COLOR);
	PS.borderColor(PS.ALL, PS.ALL, BG_COLOR);

	PS.statusText("Cacophony");
	PS.statusColor(PS.COLOR_WHITE);

	// Assigning the 12 colors to the top and bottom borders of the piano keys
	PS.border(PS.ALL, 4, {top:5,left:0,right:0,bottom:5});
	PS.borderColor(0,4,G.note_colors[0]);
	PS.borderColor(1,4,G.note_colors[1]);
	PS.borderColor(2,4,G.note_colors[2]);
	PS.borderColor(3,4,G.note_colors[3]);
	PS.borderColor(4,4,G.note_colors[4]);
	PS.borderColor(5,4,G.note_colors[5]);
	PS.borderColor(6,4,G.note_colors[6]);
	PS.borderColor(7,4,G.note_colors[7]);
	PS.borderColor(8,4,G.note_colors[8]);
	PS.borderColor(9,4,G.note_colors[9]);
	PS.borderColor(10,4,G.note_colors[10]);
	PS.borderColor(11,4,G.note_colors[11]);

	// Filling in unused cells with gray
	PS.color(0, PS.ALL, BG_COLOR);
	PS.color(1, PS.ALL, BG_COLOR);
	PS.color(2, PS.ALL, BG_COLOR);
	PS.color(12, PS.ALL, BG_COLOR);
	PS.color(13, PS.ALL, BG_COLOR);
	PS.color(14, PS.ALL, BG_COLOR);

	// Creating the colors of the piano keys
	PS.color(0,4,PS.COLOR_WHITE);
	PS.color(1,4,PS.COLOR_BLACK);
	PS.color(2,4,PS.COLOR_WHITE);
	PS.color(3,4,PS.COLOR_BLACK);
	PS.color(6,4,PS.COLOR_BLACK);
	PS.color(8,4,PS.COLOR_BLACK);
	PS.color(10,4,PS.COLOR_BLACK);
	PS.color(12,4,PS.COLOR_WHITE);
	PS.color(13,4,PS.COLOR_WHITE);
	PS.color(14,4,PS.COLOR_WHITE);

	// Pulls the ascii values from the kbd array and assigns the corresponding glyphs to each keyboard cell
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 9; j++){
			PS.glyph(3+j, i, G.kbd[i][j]);
		}
	}

	// Called so that the current octave is shown on startup
	G.octaveUp();

	// Up and down arrows
	PS.glyph(13, 4, 0x25b2);
	PS.glyph(14, 4, 0x25bc);

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.audioPlay
	// Add any other initialization code you need here.
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Increases/decreases if the up/down arrow cells are clicked
	// Plays the piano key when clicked and assigns the note to a selected keyboard key
	// Selects and highlights cell when a computer keyboard key is clicked
	if((x === 13) && (y === 4)){
		G.octaveUp();
	}else if((x === 14) && (y === 4)){
		G.octaveDown();
	}else if(y === 4){
		PS.audioPlay(G.getNote(x), {volume:.3});
		G.assignNote(x);
	}else if(x > 2 && x < 12){
		G.select(x,y);
	}

	// Add code here for mouse clicks/touches
	// over a bead.
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
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	G.playNote(key);

	// Add code here for when a key is pressed.
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

