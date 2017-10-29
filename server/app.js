var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var calculations = require('./routes/calculations');

var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/calculations', calculations);

app.listen(port, function () {
    console.log('Running on port', port);
});