"use strict";
const http = require('http');
const config = require('config');
const express = require('express');
const socketio = require('socket.io');
//import * as Jimp from 'jimp'
const bmap_1 = require('./srv/bmap');
const app = express();
const server = http.createServer(app);
const options = config.get('options');
const io = socketio(server);
const bmap = new bmap_1.default();
//bmap.getResponse()
bmap.getNearEstates().then(val => {
    console.log(val);
});
// app.use(express.static('public'))
// io.on('connection', socket => {
// 	console.log('websocket connection established')
// })
// server.listen(3000, () => {
// 	console.log('http.server started at port 3000;')
// })
//# sourceMappingURL=app.js.map