// connection info
var host = "localhost";
var port = 9000;
var path = "/peerjs";

// peers
var peers = {};

var peer = new Peer({
	host: host,
	port: port,
	path: path
});

peer.on('open', function(id){
	document.getElementById("peer_info").innerHTML = 'my id: ' + id;
});