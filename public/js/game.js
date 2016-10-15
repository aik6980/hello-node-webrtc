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

peer.on('open', function(id){
	document.getElementById("peer_info").innerHTML = 'my id: ' + id;
	connect_to_existing_players();
});

function connect_to_existing_players(){
	// the following address is defined when we start the server;
	var peerjs_local_address = '/peerjs';
	
	var url = window.location.protocol + '//' + host + ':' + port + peerjs_local_address + '/peerjs/peers';
	$.getJSON(url, function(ps){
		_.each(ps, function(p){
			console.log('peer list: ' + p);
		});
	});
}


// resources
var game;

// phaser game
// http://www.lessmilk.com/tutorial/2d-platformer-phaser
var main_state = {
	
	preload: function(){

	},

	create: function (){
		// create a bitmap data
		// http://phaser.io/examples/v2/bitmapdata/cached-bitmapdata
		var bmd = game.add.bitmapData(32, 32);
		bmd.context.fillStyle =  'rgb(255,0,0)';
		bmd.context.fillRect(0,0,32,32);

		game.cache.addBitmapData('red32', bmd);

		game.add.sprite(10,10,game.cache.getBitmapData('red32'));
	},

	update: function(){

	}
};

game = new Phaser.Game(256, 256);
game.state.add('main', main_state);
game.state.start('main');
