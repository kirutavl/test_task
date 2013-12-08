var util = require('util'),
   
   connect = require('connect'),
    port = process.env.PORT || 1337;
var fs = require('fs');
connect.createServer(connect.static(__dirname)).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
fs.readdir('slides', function (err, stats) {
    if (err) throw err;
    console.log('stats: ' + JSON.stringify(stats));
});
