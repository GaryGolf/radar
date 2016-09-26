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


import {Location, Place, getPlace, getLocation, getMapImage, searchMap } from './geoservice'
import { getNear, getPlacesFromDB } from './estate'



io.on('connection', socket => {

    // get array of addresses looks like input 
    socket.on('search-places', async (input: string) => {  
        
        try {

            let places: Place[] = []
           
            if (input.length < 5) places = await getPlacesFromDB(input)
            if (!places.length || input.length > 4)  places = await getPlace(input)
            socket.emit('search-places', places )

        } catch (error)  { console.error(error) }
    })

    socket.on('search-map', async (place: Place) => {

        try {
            const buffer = await searchMap(place)
            socket.emit('staticmap', buffer)
        } catch (error) { console.error(error) }
        
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

server.listen(8080, () => {
	console.log('http.server started at port 8080;')
})

