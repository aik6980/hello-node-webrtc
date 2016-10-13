// connection info
var host = document.location.hostname;
var port = document.location.port;
var path = "/peerjs";

console.log(host);
console.log(port);

// peers
var peers = {};

var peer = new Peer({
	host: '/',
	port: '',
	path: path
});

peer.on('open', function(id){
	document.getElementById("peer_info").innerHTML = 'my id: ' + id;
});