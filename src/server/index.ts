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


import { getPlace, getDetails } from './search'

    getPlace('Звез')
    .then(data => {
        console.log(data)
        const id = data[0].id
        console.log('id: ' + id)

        getDetails(id)
            .then(chunk => {
                const lat: string = chunk.result.geometry.location.lat
                const lng: string = chunk.result.geometry.location.lng
                console.log('lat: '+lat+' lng: '+lng)
            })
            .catch(err => {
                console.log(err)
                console.log('--------------------')
            })
    })
    .catch(error => {
        console.log(error)

        console.log('--------------------')
    })

// app.use(express.static('public'))

// io.on('connection', socket => {
// 	console.log('websocket connection established')
// })



// server.listen(3000, () => {
// 	console.log('http.server started at port 3000;')
// })

