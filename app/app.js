"use strict";
const http = require('http');
const config = require('config');
const express = require('express');
const socketio = require('socket.io');
//import * as Jimp from 'jimp'
const estate_1 = require('./src/server/estate');
const app = express();
const server = http.createServer(app);
const options = config.get('options');
const io = socketio(server);
const est = new estate_1.default();
//bmap.getResponse()
// bmap.getNearEstates().then(val => {
// 	const rows: Object[] = val.rows
// 	console.log(rows[0])
// })
est.getNear()
    .then(result => {
    console.log(JSON.stringify(result));
})
    .catch(error => {
    console.log(error);
});
// app.use(express.static('public'))
// io.on('connection', socket => {
// 	console.log('websocket connection established')
// })
// server.listen(3000, () => {
// 	console.log('http.server started at port 3000;')
// })
