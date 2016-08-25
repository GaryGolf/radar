const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const request = require('request').defaults({ encoding: null })
const Jimp = require('jimp')


app.use(express.static('public'))

//const mapurl = 'http://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=600x400'


io.on('connection', socket => {

	//getmap(socket)

	socket.on('gmap-request', data => {
		require('./srv/gmap.js').getMapBase64({}, (error, buffer) => {
			if(!error) socket.emit('gmap', {gmap: buffer})
			else console.error('getMapBase64: '+error)
		})
	})
	

	socket.emit('message', {hello: '+   hello world!  +'})

	socket.on('message', data => {
		console.log(data)
	})
	socket.on('autocomplete', data => {
		// require('./srv/autocomplete').getLocations(data.data, (error, data) => {
		// 	if(!error) socket.emit('autocomplete',data)
		// 	else console.log('Error '+error)
		// })
	})
})

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})


