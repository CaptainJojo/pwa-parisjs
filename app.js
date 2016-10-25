var path = require('path');
var express = require('express');
var app = express();
var firebase = require('firebase');
var request = require('request');

firebase.initializeApp({
  databaseURL: 'https://pwa-test-1362.firebaseio.com/',
  serviceAccount: 'PWA-test-9fb647b6916f.json'
});

app.use(express.static(path.join(__dirname, 'public'), {index: false}))

app.get('/sender', function(req, res){
  var allToken = firebase.database().ref('/token');
  Promise.all([allToken.once('value')]).then(function(resp) {
    var allToken = resp[0].val();
    tokenRep = '';
    Object.keys(allToken).forEach(function(uid) {
      var token = allToken[uid];
      request({
        url: 'https://android.googleapis.com/gcm/send',
        method: 'POST',
        headers: {
          'Content-Type' :' application/json',
          'Authorization': 'key=AIzaSyAmNUGZHF2A-KqHAUXmE4YEbfkrBghznxM',
        },
        body: JSON.stringify(
          {
            "registration_ids" : [token.subscriptionId]
          }
        )
      }, function(error, response, body) {
          res.send(response);
      });
    });
  }).catch(function(error) {
    console.log('Failed to start weekly top posts emailer:', error);
  });
});

app.use('/', function (req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
