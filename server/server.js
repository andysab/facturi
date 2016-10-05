// server/server.js

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
  secret: new Buffer('mlVeO7R1tSA9WMuq3fsWKMl0eWerR2x2Se5Sj7YuOrWux8VKbpqM9m_9e5Fj09h7', 'base64'),
  audience: 'aHq9UuywZPsFNqO3lUHpDkqBq9vCetk2'
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.post('/api/createInvoice', authCheck, function(req, res) {
  res.json({ message: "Hello from a createInvoice endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');