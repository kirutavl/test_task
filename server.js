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

    app.get('/', function(req,res) {
        res.send(JSON.stringify(stats));
    });
});
