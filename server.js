var express = require('express');
var bodyParser = require('body-parser');

var hash = require('./index.js').hash;

var db   = require('./db.js');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get(/u\/.*/, function(req, res) {
  res.redirect(301, db.get(req.url));
});

app.post('/api/v1/url', function (req, res) {
  if (! req.is('application/json'))
    res.status(404).send('Sorry you need to send a JSON request');

  var urlData = req.body;
  var uri;
  if (urlData.customKey)
    uri = urlData.customKey
  else
    uri = hash(urlData.url).toString(27)

  uri = '/u/' + uri

  db.save(uri, urlData.url)
  res.json({uri: uri});
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = {app: app};
