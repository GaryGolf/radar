"use strict";
var http = require('http');
var config = require('config');
var express = require('express');
var socketio = require('socket.io');
var app = express();
var server = http.createServer(app);
var options = config.get('options');
var io = socketio(server);
app.use(express.static('public'));
server.listen(3000, function () {
    console.log('http.server started at port 3000;');
});
//# sourceMappingURL=app.js.map