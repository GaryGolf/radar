import * as http from 'http'
import * as config from 'config'
import * as express from 'express'
import * as socketio from 'socket.io'
import * as pg from 'pg'
//import * as Jimp from 'jimp'


//import Estate from  './estate'

const app = express()
const server = http.createServer(app)
const options = config.get('options')
const io: SocketIO.Server = socketio(server)


import Search from './search'

const s = new Search()
s.printTitle()

// app.use(express.static('public'))

// io.on('connection', socket => {
// 	console.log('websocket connection established')
// })



// server.listen(3000, () => {
// 	console.log('http.server started at port 3000;')
// })

