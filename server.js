var express = require('express');
var bodyParser = require('body-parser');

var hash = require('./index.js').hash;

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('Hello World!');
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

  res.json({uri: uri});
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = {app: app};
