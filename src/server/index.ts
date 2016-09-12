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


import {Location, getPlace, getLocation, getMapImage } from './geoservice'
import { getNear } from './estate'



io.on('connection', socket => {

    // get array of addresses looks like input 
    socket.on('search-places', input => {  
        getPlace(input).then(places => {
            socket.emit('search-places', places )
        }).catch(error => { console.error(error) })
    })

    // get map image with markers nearby place with input.id
    socket.on('search-map', input => {
        // get location point
        getLocation(input).then((location: Location) => {
            // find estates nearby location
            getNear(Number(location.lat), Number(location.lng)).then(rows => {
                // prepare markers 
                let options =<any>config.get('options')
                const markers: string[] = new Array()
                for(var i = 0, char = 65; i< rows.length; i++, char++){
                     markers.push(`color:red|label:${String.fromCharCode(char)}|${rows[i].location.x},${rows[i].location.y}`)
                }
                options.markers = markers
                //  map image request
                getMapImage(options).then(buffer => {
                     socket.emit('staticmap', buffer)
                }).catch(error => { console.error(error) })
            }).catch(error => { console.error(error) })
        }).catch(error => { console.error(error) })
    })

    socket.on('staticmap', input => {
        getMapImage(input).then(buffer => {
            socket.emit('staticmap', buffer)
        }).catch(error => {
            console.error(error)
        })
    })

})

app.use(express.static('public'))



server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})

