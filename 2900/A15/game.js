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
const G = (function(){
	const levels = [
		{
			height: 8,
			width: 8,
			layout: 
			[
				[0,0,0,1,0,0,0,0],
				[0,0,0,0,0,0,0,3],
				[0,0,0,0,4,0,0,0],
				[0,0,0,3,0,0,0,4],
				[0,0,0,0,0,0,0,0],
				[0,0,3,0,0,0,0,0],
				[0,0,2,0,0,0,0,0],
				[0,0,0,0,0,4,0,4]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,1,0,0,0,0,2,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[2,0,0,0,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,3,0,0,0,0,0],
				[0,0,0,0,0,2,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[1,0,0,3,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,3,0,1,0,0],
				[0,2,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3],
				[0,0,3,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,3,0],
				[3,0,2,0,0,0,0,0],
				[0,0,0,0,3,0,0,0],
				[0,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3],
				[0,0,0,0,0,3,0,3],
				[0,3,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,3],
				[0,0,0,3,3,0,0,0],
				[3,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,3,0,0,0],
				[0,0,3,0,2,0,0,0],
				[0,0,0,0,0,0,0,3]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,4,0,0,0],
				[0,2,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0,3]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,0,0,0,0,0],
				[0,0,2,0,0,0,0,0],
				[0,1,0,0,0,0,4,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,4,0,0,0,0,0,0],
				[0,0,0,0,0,4,0,0],
				[0,0,0,0,0,0,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,3,2,3,0,0,0],
				[0,0,1,0,0,0,4,3],
				[0,0,0,4,0,0,0,0],
				[0,0,3,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[3,0,0,0,0,0,0,0],
				[0,0,0,0,0,3,0,0],
				[0,0,3,0,0,3,0,0]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[0,0,0,1,0,0,0,0],
				[0,0,0,0,0,0,0,3],
				[0,0,0,0,4,0,0,0],
				[0,0,0,3,0,0,0,4],
				[0,0,0,0,0,0,0,0],
				[0,0,3,0,0,0,0,0],
				[0,0,2,0,0,0,0,0],
				[0,0,0,0,0,4,0,4]
			]
		},
		{
			height: 8,
			width: 8,
			layout:
			[
				[3,3,0,1,0,0,3,3],
				[3,0,0,0,0,0,0,3],
				[0,0,4,0,0,4,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,4,0,0,4,0,0],
				[0,0,0,4,4,0,0,0],
				[3,0,0,0,0,0,0,3],
				[3,3,0,0,0,0,3,3]
			]
		},
		{
			height: 8,
			width: 8,
			layout: 
			[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,3,0,0,3,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,3,3,0,0,0],
				[0,0,3,0,0,3,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]
			]
		}
	]
	let curr_level = 1;
	const level_max = levels.length-1;
	let level_complete = false;

	const ice_color = 0x555555;
	const wall_color = 0xBED9ED;
	const breakable_color = 0x7B90DB;
	const player_color = 0x00DD99;
	const goal_color = 0xffcc00;
	const goal_secondary_color = 0xdd9900;
	const grid_color = 0x333333;

	const player_plane = 2;
	const goal_plane = 1;
	const wall_plane = 3;
	const breakable_plane = 4;

	let audio_breaks = [];
	let audio_hits = [];
	let audio_level_complete = "";
	let audio_sad_face = "";
	let audio_reset = "";

	const playRandom = function(sounds){
		PS.audioPlayChannel(sounds[PS.random(sounds.length)-1]);
	}

	//the current player sprite
	let player = {
		direction: [0,0],
		sprite: undefined,
		//true if the player can break breakable walls, i.e. they have moved >=1 spaces
		can_break: false,
		//sets info about this player's sprite, including the given position
		init: function(x,y){
			this.sprite = PS.spriteSolid(1,1);
			this.trySetDirection = this.trySetDirection.bind(this);
			this.collide = this.collide.bind(this);
			this.move = this.move.bind(this);
			PS.spritePlane(this.sprite, player_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, player_color);
			PS.spriteSolidAlpha(this.sprite, 255);
			PS.spriteCollide(this.sprite, this.collide);
		},
		//returns true if the direction was set, false otherwise
		trySetDirection: function(x,y){
			if(this.direction[0] === 0 && this.direction[1] === 0){
				this.direction[0] = x;
				this.direction[1] = y;
				return true;
			}
			return false;
		},
		//called whenever this player collides with another sprite
		collide: function(s1, p1, s2, p2, type){
			if(type === PS.SPRITE_OVERLAP){
				if(p1 === goal_plane || p2 === goal_plane){//collide with goal, level complete
					this.direction[0] = 0;
					this.direction[1] = 0;
					level_complete = true;
					//curr_level++;
					//loadLevel(curr_level);
				}else{//collide with wall
					if(p1 === breakable_plane || p2 === breakable_plane){//collide with breakable
						let breakable = undefined;
						if(p1 === breakable_plane){
							breakable = s1;
						}else{
							breakable = s2;
						}
						
						if(this.can_break){
							markDelete(breakable);
							const to_delete = breakables.filter(ele => ele.sprite === breakable)[0];
							breakables.splice(breakables.indexOf(to_delete), 1);
							playRandom(audio_breaks);
						}else{
							playRandom(audio_hits);
						}

						if(goal.sprite === undefined){//this is the case only for the second to last map, i.e. the win screen
							if(breakables.length === 0){//all breakable blocks are gone
								level_complete = true;//go to sad face screen
							}
						}
					}else{
						playRandom(audio_hits);
					}

					//move back before collision, then set direction to 0,0
					PS.spriteMove(this.sprite,
						PS.spriteMove(this.sprite).x-this.direction[0],
						PS.spriteMove(this.sprite).y-this.direction[1]);
					this.direction[0] = 0;
					this.direction[1] = 0;
					this.first_move = false;
					this.can_break = false;
				}
			}
		},
		//call this every tick
		move: function(){
			const curr_x = PS.spriteMove(this.sprite).x;
			const curr_y = PS.spriteMove(this.sprite).y;
			
			//if the move will go off the edge, set direction to 0,0 and cancel the move
			if((this.direction[0] === -1 && curr_x === 0) || 
			   (this.direction[0] === 1 && curr_x === PS.gridSize().width-1) || 
			   (this.direction[1] === -1 && curr_y === 0) || 
			   (this.direction[1] === 1 && curr_y === PS.gridSize().height-1)){
				this.direction[0] = 0;
				this.direction[1] = 0;
				this.can_break = false;
				return;
			}
			
			PS.spriteMove(
				this.sprite,
				curr_x+this.direction[0],
				curr_y+this.direction[1]);
			
			if(!this.direction.every((val, i) => val === 0)){
				this.can_break = true;
			}
		}
	};

	//the current goal sprite
	let goal = {
		sprite: undefined,
		//sets info about this goal's sprite, including the given position
		init: function(x,y){
			this.sprite = PS.spriteSolid(1,1);
			PS.spritePlane(this.sprite, goal_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.glyph(x, y, 0x272a);
			PS.glyphColor(x, y, goal_secondary_color);
			PS.spriteSolidColor(this.sprite, goal_color);
			PS.spriteSolidAlpha(this.sprite, 255);
			PS.border(x, y, 4);
			PS.borderColor(x, y, goal_secondary_color);
		},
	};

	//wall class
	class Wall{
		constructor(x, y){
			this.type = "Wall";
			this.sprite = PS.spriteSolid(1, 1);
			PS.spritePlane(this.sprite, wall_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, wall_color);
			PS.spriteSolidAlpha(this.sprite, 255);
		};
	};
	let walls = [];

	//breakable wall class
	class Breakable{
		constructor(x, y){
			this.type = "Breakable";
			this.sprite = PS.spriteSolid(1, 1);
			PS.spritePlane(this.sprite, breakable_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, breakable_color);
			PS.spriteSolidAlpha(this.sprite, 255);
		}
	}
	let breakables = [];

	/*
	place a given type of block on the grid.
	block type:
		0 = nothing
		1 = player
		2 = goal
		3 = permanent wall
		4 = breakable wall
		5 = crate
	returns 0 on success, or -1 on failure
	*/
	const place = function(block, x, y){
		switch(block){
			case 0:
				return 0;
			case 1:
				player.init(x,y);
				return 0;
			case 2:
				goal.init(x,y);
				return 0;
			case 3:
				walls.push(new Wall(x,y));
				return 0;
			case 4:
				breakables.push(new Breakable(x,y));
				return 0;
			case 5:
				crates.push(new Crate(x,y));
				return 0;
			default:
				return -1;
		}
	}

	//loads the given level
	const loadLevel = function(num, reset=false){
		//check if level is above the max level, if it is, display win screen and skip changing level
		// if(num > level_max){
		// 	PS.statusText("You win!");
		// 	return;
		// }

		//delete sprites
		if(player.sprite !== undefined){
			PS.spriteDelete(player.sprite);
			player.sprite = undefined;
		}
		if(goal.sprite !== undefined){
			PS.spriteDelete(goal.sprite);
			goal.sprite = undefined;
		}
		walls.forEach(ele => PS.spriteDelete(ele.sprite));
		walls = [];
		breakables.forEach(ele => PS.spriteDelete(ele.sprite));
		breakables = [];

		const level = levels[num];
		
		//set grid size
		PS.gridSize(level.width, level.height);
		PS.radius(PS.ALL, PS.ALL, 25);
		PS.gridColor(grid_color);
		PS.bgColor(PS.ALL, PS.ALL, ice_color);
		PS.bgAlpha(PS.ALL, PS.ALL, 255);
		PS.border(PS.ALL, PS.ALL, 0);
		PS.alpha(PS.ALL, PS.ALL, 0);
		
		//place obstacles, player, and goal
		for(let row = 0; row < level.height; row++){
			for(let col = 0; col < level.width; col++){
				place(level.layout[row][col], col, row);
			}
		}

		//change status text
		let msg = "Level " + num;
		switch(num){
			case 1:
				msg += ": Arrow keys to move, R to reset";
				break;
			case level_max-1: //Win screen
				msg = "You win!"
				break;
			case level_max: //Sad face
				msg = "You destroyed the happy...";
				break;
		}
		PS.statusText(msg);
		PS.statusColor(0xffffff);
		
		if(num === level_max){
			if(!reset) PS.audioPlayChannel(audio_sad_face);
		}else if(reset){
			PS.audioPlayChannel(audio_reset);
		}else{
			PS.audioPlayChannel(audio_level_complete);
		}
	}

	let delete_marks = [];
	const markDelete = function(sprite){
		if(!delete_marks.includes(sprite)){
			delete_marks.push(sprite);
		}
	}

	//returns true if the key press successfully changed the game state, false otherwise
	const applyKey = function(key){
		let success = false;
		switch(key){
			case PS.KEY_ARROW_UP:
				success = player.trySetDirection(0,-1);
				break;
			case PS.KEY_ARROW_DOWN:
				success = player.trySetDirection(0,1);
				break;
			case PS.KEY_ARROW_LEFT:
				success = player.trySetDirection(-1,0);
				break;
			case PS.KEY_ARROW_RIGHT:
				success = player.trySetDirection(1,0);
				break;
			case 114://r to reset level
				player.direction = [0,0];
				loadLevel(curr_level, true);
				success = true;
		}
		return success;
	}
	
	//buffer time
	const buffer_time = 2;
	//input buffer, only contains one key, value pair
	let buffer = [];
	
	//tries to process a key down event, then adds the key press to the buffer if it was not successful
	const processKeyDown = function(key){
		let success = applyKey(key);
		if(!success){
			buffer[0] = key;
			buffer[1] = buffer_time;
		}
	}

	const loadAudio = function(){
		PS.audioLoad("break1", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_breaks[0] = data.channel}
		});
		PS.audioLoad("break2", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_breaks[1] = data.channel}
		});
		PS.audioLoad("hit1", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_hits[0] = data.channel}
		});
		PS.audioLoad("hit2", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_hits[1] = data.channel}
		});
		PS.audioLoad("hit3", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_hits[2] = data.channel}
		});
		PS.audioLoad("level_complete", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_level_complete = data.channel}
		});
		PS.audioLoad("sad_face", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_sad_face = data.channel}
		});
		PS.audioLoad("reset", {
			lock: true,
			path: "audio/",
			onLoad: function(data){audio_reset = data.channel}
		})
	}
	
	//this is called every tick
	const update = function(){
		//delete objects queued for deletion
		delete_marks.forEach(ele => PS.spriteDelete(ele));
		delete_marks = [];
		//check if level is complete, load new level if it is
		if(level_complete){
			curr_level++;
			loadLevel(curr_level);
			level_complete = false;
		}
		//check for buffered input
		if(buffer[0] !== undefined){
			if(applyKey(buffer[0])){//input was successful, clear buffer
				buffer = [];
			}else{//input was not successful, reduce time left in buffer
				buffer[1] -= 1;
				if(buffer[1] === 0){//buffer time ran out, clear buffer
					buffer = [];
				}
			}
		}
		//move the player
		if(player.sprite !== undefined) player.move();
	}

	return {
		player, goal, walls, breakables,
		loadLevel, processKeyDown, update, loadAudio
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
	// Load levels
	G.loadAudio();
	G.loadLevel(1);

	PS.timerStart(4,G.update);
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
	G.processKeyDown(key);
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

