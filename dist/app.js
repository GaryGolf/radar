"use strict";
const http = require('http');
const config = require('config');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const options = config.get('options');
const io = socketio(server);
app.use(express.static('public'));
server.listen(3000, () => {
    console.log('http.server started at port 3000;');
});
//# sourceMappingURL=app.js.map