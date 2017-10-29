var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var calculations = require('./routes/calculations');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/calculations', calculations);

io.on('connection', function (socket) {
    socket.on('requestAllCalculations', function (message) {
        io.emit('sendAllCalculations', message);
    });
});

server.listen(port, function () {
    console.log('Running on port', port);
});