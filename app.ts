import * as http from 'http'
import * as config from 'config'
import * as express from 'express'
import * as socketio from 'socket.io'
//import * as Jimp from 'jimp'

import Bmap from  './srv/bmap'

const app = express()
const server = http.createServer(app)
const options = config.get('options')
const io: SocketIO.Server = socketio(server)

const bmap: Bmap = new Bmap()

//bmap.getResponse()
bmap.getNearEstates().then(val => {
	console.log(val)
})

// app.use(express.static('public'))

// io.on('connection', socket => {
// 	console.log('websocket connection established')
// })



// server.listen(3000, () => {
// 	console.log('http.server started at port 3000;')
// })

