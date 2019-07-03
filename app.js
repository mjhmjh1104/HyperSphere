var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('HyperSphere');
});

app.listen(port, function(req, res) {
  console.log('Server on');
});
