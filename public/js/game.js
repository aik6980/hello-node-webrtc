// connection info
var host = document.location.hostname;
var port = parseInt(document.location.port);
var path = "/peerjs";

console.log(host);
console.log(port);

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