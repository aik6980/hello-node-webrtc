var Express = require('express');
var app = Express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next){
    // has to redirect this to the client first page
    res.send('Hello From Server');
});

var options = {
    debug: true
}

var server = require('http').createServer(app);
app.use('/peerjs', ExpressPeerServer(server, options));

// process.env.PORT for Heroku
server.listen(process.env.PORT || 9000);

server.on('connection', function(id){
    console.log('someone connected' + id);
});

server.on('disconnect', function(id){
    console.log('someone disconnected' + id);
});