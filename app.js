var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public'), {index: false}))

app.use('/', function (req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
