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

const G = (function(){
	// ------ Constants ------

	const player_plane = 5;
	const player_color = 0x00DD99;
	const wall_plane = 1;
	const wall_color = 0x000000;
	const door_plane = 2;
	const egg_plane = 3;

	// ------ Rooms ------

	const rooms = {
		start: {
			size: {x:5, y:7},
			layout: [
				[1,1,1,1,1],
				[1,0,2,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,0,0,0,1],
				[1,1,3,1,1],
			],
			key: {
				'0': {type: null},
				'1': {type: 'wall'},
				'2': {type: 'player'},
				'3': {type: 'door', dir: {x:0,y:1}, goto: 'room1'}
			},
			onEnter: function(){
				PS.statusText("You're now locked in here. Excellent work.");
			},
			onExit: function(){}
		},
		room1: {
			size: {x:9, y:10},
			layout: [
				[1,1,1,1,3,1,1,1,1],
				[1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[4,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1],
				[1,1,5,1,1,1,1,1,1],
			],
			key: {
				'0': {type: null},
				'1': {type: 'wall'},
				'3': {type: 'door', dir: {x:0,y:-1}, goto: 'start'},
				'4': {type: 'door', dir: {x:-1,y:0}, goto: 'wester_egg'},
				'5': {type: 'door', dir: {x:0,y:1}, goto: 'big_room'}
			},
			onEnter: function(){
				PS.statusText("Maybe there's an easter egg with the key in it.");
			},
			onExit: function(){}
		},
		wester_egg: {
			size: {x:7, y:6},
			layout: [
				[1,1,1,1,1,1,1],
				[1,0,0,0,0,0,4],
				[1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,0,2,0,0,0,1],
				[1,1,1,1,1,1,1],
			],
			key: {
				'0': {type: null},
				'1': {type: 'wall'},
				'2': {
					type: 'egg', 
					color: PS.COLOR_VIOLET, 
					pickup: function(){
						PS.statusText("Hmmm... Nope, that's a wester egg.");
						rooms.wester_egg.key[2].picked_up = true;
					},
					picked_up: false
				},
				'4': {type: 'door', dir: {x:1,y:0}, goto: 'room1'}
			},
			onEnter: function(){
				if(!rooms.wester_egg.key[2].picked_up){
					PS.statusText("Oh look, there's an easter egg!")
				}else{
					PS.statusText("Hmmm.");
				}
			},
			onExit: function(){}
		},
		big_room: {
			size: {x:16,y:16},
			layout: [
				[1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1],
			],
			key:{
				'0': {type: null},
				'1': {type: 'wall'},
				'2': {type: 'door', dir: {x:1,y:0}, goto: 'perlenspiel'},
				'3': {type: 'door', dir: {x:0,y:1}, goto: 'proto_win_room'},
				'5': {type: 'door', dir: {x:0,y:-1}, goto: 'room1'}
			},
			onEnter: function(){
				PS.statusText("Woah, this is a big room...");
				rooms.big_room.wait_id = waitTicks(17, function(){
					PS.statusText("At least it's only 16x16.");
				})
			},
			onExit: function(){
				cancelWait(rooms.big_room.wait_id);
				rooms.big_room.wait_id = -1;
			},
			wait_id: -1
		},
		perlenspiel: {
			size: {x:10,y:10},
			layout: [
				[1,1,1,1,1,1,1,1,1,1],
				[1,0,7,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,1],
				[1,0,0,6,0,0,0,0,6,1],
				[1,0,0,0,0,0,0,5,0,1],
				[1,0,0,0,0,0,0,0,0,1],
				[1,4,0,0,4,0,4,0,0,1],
				[1,0,0,0,0,3,0,0,0,1],
				[2,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1],
			],
			key:{
				'0': {type: null},
				'1': {type: 'wall'},
				'2': {type: 'door', dir: {x:-1,y:0}, goto: 'big_room'},
				'3': {type: 'egg', color: 0x87578E, pickup: function(){
					PS.audioPlay("l_hchord_db4");
				}},
				'4': {type: 'egg', color: 0x6A98BA, pickup: function(){
					PS.audioPlay("l_hchord_d4");
				}},
				'5': {type: 'egg', color: 0xA1C93A, pickup: function(){
					PS.audioPlay("l_hchord_e4");
				}},
				'6': {type: 'egg', color: 0xF4782B, pickup: function(){
					PS.audioPlay("l_hchord_f4");
				}},
				'7': {type: 'egg', color: 0xEFEB42, pickup: function(){
					PS.audioPlay("l_hchord_a4");
				}}
			},
			onEnter: function(){
				PS.statusText("That's a lot of eggs!");
			},
			onExit: function(){}
		},
		proto_win_room: {
			size: {x:7, y:9},
			layout: [
				[1,1,1,3,1,1,1],
				[1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,0,4,0,0,0,1],
				[1,0,0,0,0,0,1],
				[1,1,1,1,1,1,1],
			],
			key:{
				'0': {type: null},
				'1': {type: 'wall'},
				'3': {type: 'door', dir: {x:0,y:-1}, goto: 'big_room'},
				'4': {type: 'egg', color: 0xffcc00, pickup: function(){
					PS.statusText("You found the key! It does nothing for now.");
					rooms.proto_win_room.key[4].picked_up = true;
				}, picked_up: false}
			},
			onEnter: function(){
				if(!rooms.proto_win_room.key[4].picked_up) PS.statusText("Pick up the egg to win(?)");
				else PS.statusText("You found the key! It does nothing for now.");
			},
			onExit: function(){}
		}
	};

	// ------ Engine ------

	//called on game startup
	const init = function(){
		loadRoom('start');
		PS.timerStart(6, G.update);
	};

	//called whenever a new room is loaded. initializes a new grid with predefined formatting
	const gridInit = function(width, height){
		PS.gridSize(width, height);
		PS.border(PS.ALL, PS.ALL, 0);
	}
	
	//A control is true when it is currently pressed, and false when it is not.
	const controls = {
		up: false,
		down: false,
		left: false,
		right: false,
		interact: false
	};

	//Switches a control to true if is_down is true, switches a control to false
	//if is_down is false. Called in both keyDown and keyUp.
	const handleInput = function(key, is_down){
		switch(key){
			case 119: //w
			case PS.KEY_ARROW_UP:
				controls.up = is_down;
				break;
			case 97: //a
			case PS.KEY_ARROW_LEFT:
				controls.left = is_down;
				break;
			case 115: //s
			case PS.KEY_ARROW_DOWN:
				controls.down = is_down;
				break;
			case 100: //d
			case PS.KEY_ARROW_RIGHT:
				controls.right = is_down;
				break;
			case PS.KEY_SPACE:
				controls.interact = is_down;
				break;
		}
	};

	//called every tick
	const update = function(){
		//delete objects queued for deletion
		to_delete.forEach(ele => PS.spriteDelete(ele));
		to_delete = [];

		updateWaitTicks();

		//update player
		player.update();
	};

	const wait_queue = {};
	let next_id = 0;
	//wait a given number of game ticks, then call exec. returns the id of the wait request
	const waitTicks = function(num, exec){
		wait_queue[next_id] = {count:0, max:num, exec};
		next_id++;
		return next_id - 1;
	};
	//cancel waiting to execute a function, without executing that function, given the id of the wait request
	const cancelWait = function(id){
		delete wait_queue[id];
	}
	const updateWaitTicks = function(){
		for(const id of Object.getOwnPropertyNames(wait_queue)){
			wait_queue[id].count++;
			if(wait_queue[id].count === wait_queue[id].max){
				wait_queue[id].exec();
				delete wait_queue[id];
			}
		}
	};

	let current_room = null;
	let load_room_next_tick = null;
	const loadRoom = function(room_name){
		//disable collision with doors
		player.door_collision = false;

		//call onExit for this room
		if(current_room !== null) rooms[current_room].onExit();

		//delete sprites/objects
		if(player.sprite !== undefined){
			PS.spriteDelete(player.sprite);
			player.sprite = undefined;
		}
		walls.forEach(ele => PS.spriteDelete(ele.sprite));
		walls = [];
		for(const sprite of Object.getOwnPropertyNames(egg_ids)){
			PS.spriteDelete(sprite);
			delete egg_ids[sprite];
		}
		for(const sprite of Object.getOwnPropertyNames(door_ids)){
			PS.spriteDelete(sprite);
			delete door_ids[sprite];
		}

		//get room to be loaded
		const room = rooms[room_name];

		//initialize grid
		gridInit(room.size.x, room.size.y);

		//place objects
		for(let y = 0; y < room.size.y; y++){
			for(let x = 0; x < room.size.x; x++){
				//PS.debug("Place " + x + ", " + y + ", " + room.layout[y][x] + "\n");
				const obj = room.key[room.layout[y][x]];

				//skip over placing the player object if not the first room loaded
				if(current_room !== null && obj.type === 'player'){
					continue;
				}

				//place player at the correct door when entering a room
				if(obj.type === 'door' && obj.goto === current_room){
					place({type: 'player'}, x, y);
				}

				place(obj, x, y);
			}
		}

		if(room.onEnter !== undefined){
			room.onEnter();
		}

		current_room = room_name;
	}

	const place = function(obj, x, y){
		switch(obj.type){
			case 'player':
				player.init(x,y);
				break;
			case 'wall':
				new Wall(x,y);
				break;
			case 'door':
				new Door(x,y,obj);
				break;
			case 'egg':
				if(!obj.picked_up) new Egg(x,y,obj);
				break;
		}
	}

	let to_delete = [];
	const markDelete = function(sprite){
		if(!to_delete.includes(sprite)){
			to_delete.push(sprite);
		}
	}

	// ------ Objects ------

	const player = {
		sprite: undefined,
		direction: {x:0,y:0},
		door_collision: false,
		init: function(x,y){
			this.collide = this.collide.bind(this);
			this.getInput = this.getInput.bind(this);
			this.move = this.move.bind(this);
			this.update = this.update.bind(this);

			this.sprite = PS.spriteSolid(1,1);
			PS.spritePlane(this.sprite, player_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, player_color);
			PS.spriteSolidAlpha(this.sprite, 255);
			PS.spriteCollide(this.sprite, this.collide);
		},
		collide: function(s1, p1, s2, p2, type){
			if(type === PS.SPRITE_OVERLAP){
				if(p1 === wall_plane || p2 === wall_plane){//collide with wall
					this.direction.x = -this.direction.x;
					this.direction.y = -this.direction.y;
					this.move();
					this.direction.x = 0;
					this.direction.y = 0;
				}
				if(this.door_collision && (p1 === door_plane || p2 === door_plane)){//collide with door
					if(p2 === door_plane){
						s1 = s2;
					}
					const door = door_ids[s1];
					if(this.direction.x === door.direction.x && this.direction.y === door.direction.y){
						load_room_next_tick = door.goto;
					}
				}
				if(p1 === egg_plane || p2 === egg_plane){//collide with egg
					if(p2 === egg_plane){
						s1 = s2;
					}
					const egg = egg_ids[s1];
					egg.pickup();
					markDelete(egg.sprite);
					delete egg_ids[egg.sprite];
				}
			}
		},
		getInput: function(){
			const dir = {x:0,y:0}
			if(controls.up){
				dir.y -= 1;
			}
			if(controls.down){
				dir.y += 1;
			}
			if(controls.left){
				dir.x -= 1;
			}
			if(controls.right){
				dir.x += 1;
			}
			this.direction = dir;
		},
		move: function(){
			const curr_x = PS.spriteMove(this.sprite).x;
			const curr_y = PS.spriteMove(this.sprite).y;

			if((this.direction.x === -1 && curr_x === 0) || 
			   (this.direction.x === 1 && curr_x === PS.gridSize().width-1) || 
			   (this.direction.y === -1 && curr_y === 0) || 
			   (this.direction.y === 1 && curr_y === PS.gridSize().height-1)){
				return;
			}

			PS.spriteMove(
				this.sprite,
				curr_x+this.direction.x,
				curr_y+this.direction.y);
			
			if(this.direction.x !== 0 || this.direction.y !== 0){
				this.door_collision = true;
			}
		},
		update: function(){
			if(load_room_next_tick !== null){
				loadRoom(load_room_next_tick);
				load_room_next_tick = null;
			}
			this.getInput();
			this.move();
		}
	};

	class Wall{
		constructor(x, y){
			this.sprite = PS.spriteSolid(1,1);
			PS.spritePlane(this.sprite, wall_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, wall_color);
			PS.spriteSolidAlpha(this.sprite, 255);

			walls.push(this);
		};
	};
	let walls = [];

	class Door{
		constructor(x, y, obj){
			this.sprite = PS.spriteSolid(1,1);
			this.goto = obj.goto;
			this.direction = obj.dir;
			PS.spritePlane(this.sprite, door_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidAlpha(this.sprite, 0);

			door_ids[this.sprite] = this;
		}
	}
	//uses the sprite idenifier as a key to access the door object it is a part of
	let door_ids = {};

	class Egg{
		constructor(x, y, obj){
			this.sprite = PS.spriteSolid(1,1);
			PS.spritePlane(this.sprite, egg_plane);
			PS.spriteMove(this.sprite, x, y);
			PS.spriteSolidColor(this.sprite, obj.color);
			PS.spriteSolidAlpha(this.sprite, 255);

			this.pickup = obj.pickup;

			egg_ids[this.sprite] = this;
		}
	}
	let egg_ids = {};

	return {
		update, handleInput, init
	};
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
	G.init();
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
	G.handleInput(key, true);
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
	G.handleInput(key, false);
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

