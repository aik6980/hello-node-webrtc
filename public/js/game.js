// connection info
// https://github.com/sugendran/webrtc-tanks/blob/master/js/game.js
var host = document.location.hostname;
var port = document.location.port;
var path = "/peerjs";

console.log(host);
console.log(port);

// peers
var my_peer_id = '';
var peers = {};

var peer = new Peer({
	host: host,
	port: port,
	path: path
});

/// handle peerjs events
peer.on('open', function(id){
	document.getElementById("peer_info").innerHTML = 'my id: ' + id;

	// store my peer id
	my_peer_id = id;
	connect_to_existing_players();

	// create a new player
	create_new_player();
});

peer.on('connection', function(conn){
	console.log('new connection ' + conn.peer);
	
	conn.on('data', function(data){
		console.log('data');
		var t = MESSAGE_TYPE[data.type];
		if(!t){
			console.err('unrecognised msg: ' + data);
			return;
		}
		handle_msg(t, data);
	});
	
	conn.on('close', function(){
		// need to tell the server I'm out? 
		console.log('connection closed');
	});
});

function connect_to_player(id){
	console.log('peers: ' + peers);
	if(!_.has(peers, id)){
		var conn = peer.connect(id);
		peers[id] = conn;
		
		// make sure we waited for the connection to be succesfully opened before sending data
		conn.on('open', function(){
			send_to_peer(id, MESSAGE_TYPE.HELLO);
			console.log('connecting to peer ' + id);
		});
	}
}

function connect_to_existing_players(){
	// the following address is defined when we start the server;
	var peerjs_local_address = path;
	
	var url = window.location.protocol + '//' + host + ':' + port + peerjs_local_address + '/peerjs/peers';
	$.getJSON(url, function(ps){
		_.each(ps, function(p){
			//console.log('peer list: ' + p);
			if(p === my_peer_id){
				return;
			}
			connect_to_player(p);
		});
	});
}

function send_to_peer(id, msg_type, data){
	var peer = peers[id];
	if(peer == null){
		console.log('unrecognised peer id ' + id);
		return;
	}

	console.log('send_to_peer ' + id);
	// let look up this function
	peer.send(_.extend(data, {
		id: my_peer_id,
		type: msg_type
	}));
}

var MESSAGE_TYPE = {
	HELLO: 'HELLO',
	POSITION: 'POSITION'
};

function handle_msg(msg_type, data){
	console.log('handle_msg ' + data);
	if(msg_type === MESSAGE_TYPE.HELLO){
		handle_hello(data);
	}
}

function handle_hello(data){
	console.log('hello from ' + data.id);
	connect_to_player(data.id);
}

// resources
var game;
var cursors; // kb

var players = [];

function create_new_player(){
	var player = game.add.sprite(10,10,game.cache.getBitmapData('white32'));
	player.tint = Math.random() * 0xffffff;

	players.push(player);
}

// phaser game
// http://www.lessmilk.com/tutorial/2d-platformer-phaser
var main_state = {
	
	preload: function(){
		
	},

	create: function (){
		// create a bitmap data
		// http://phaser.io/examples/v2/bitmapdata/cached-bitmapdata
		var bmd = game.add.bitmapData(32, 32);
		bmd.context.fillStyle =  'rgb(255,255,255)';
		bmd.context.fillRect(0,0,32,32);

		game.cache.addBitmapData('white32', bmd);
		
		// keyboard control
		cursors = game.input.keyboard.createCursorKeys();
	},

	update: function(){
		
	}
};

game = new Phaser.Game(256, 256);
game.state.add('main', main_state);
game.state.start('main');
