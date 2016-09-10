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


import { getPlace, getLocation, getMapImage, getTestImage } from './geoservice'


io.on('connection', socket => {

    
    socket.on('autocomplete', input => {
        getPlace(input).then(places => {
            socket.emit('autocomplete', places )
        }).catch(error => { console.log(error) })
    })

    socket.on('staticmap', input => {
        getTestImage({}).then(buffer => {
            socket.emit('staticmap', buffer)
        }).catch(error => {
            console.error(error)
        })
    })

})

app.get('/over', (req, res) => {

    getMapImage({}).then( buffer => {
        console.log('over')
        res.type('image/png')
         res.send(buffer)
    })
   
})

app.use(express.static('public'))



server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})

