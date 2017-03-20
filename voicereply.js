
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.all('/*', function(req, res, next){
  console.log("URL:: " + req.path);
  console.log("Method:: " + req.method);
    next();
});

app.get('/api/voice', function (req, res, next) {
    res.status(200).send(JSON.stringify({"status" : "success"}));
    next();
});

app.post('/api/getanswer', function (req, res, next) {
    q = req.body.question;
    console.log(q);
    /* XXX get reply from Google's AI bot */
    res.status(200).send(JSON.stringify({resp: "I am good"}));
    next();
});
app.get('/*', function(req, res, next){
  res.sendFile(__dirname + '/public/speech_AI.html');
});


var port = 2300;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});


