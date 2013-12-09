var util = require('util'),
    app = require('express'),
    fs = require('fs'),
    port = process.env.PORT || 1337;

var server = app();

util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
server.configure(function(){
    server.use(app.static(__dirname));
});
server.listen(port);

server.get('/getfiles', function(req, res){
    fs.readdir('slides', function (err, stats) {
        if (err) throw err;
        console.log('stats: ' + JSON.stringify(stats));
        var response = JSON.stringify(stats);
        console.log('stats: ');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('_testcb('+response+')');
    });
});
