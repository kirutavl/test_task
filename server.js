var util = require('util'),
    express = require('express'),
    fs = require('fs'),
    connect = require('connect'),
    app = express(),
    port = process.env.PORT || 1337;

connect.createServer(connect.static(__dirname)).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
fs.readdir('slides', function (err, stats) {
    if (err) throw err;
    console.log('stats: ' + JSON.stringify(stats));
});
app.get('http://localhost:1337', function(req,res) {
    var path = req.url;
    if(path=="/getstring"){
        console.log("request recieved");

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(string);
        console.log("string sent");
    }
});