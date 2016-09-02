const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const request = require('request').defaults({ encoding: null })
const Jimp = require('jimp')
const Gmap = require('./srv/gmap.js')

var options = config.get('options')

app.use(express.static('public'))



io.on('connection', socket => {

	socket.on('gmap-request', data => {
		Gmap.getMapBase64(data, (error, buffer) => {
			if(!error) socket.emit('gmap', {['gma'+'p']: buffer})
			else console.error('getMapBase64: '+error)
		})
	})
	

	socket.on('autocomplete', data => {
		Gmap.getLocations(data.data, (error, data) => {
			if(!error) socket.emit('autocomplete',data)
			else console.log('Error '+error)
		})
	})
	// new google map request
	socket.on('locate', data => {		// data = {data : 'магазин запчастей, улица Судорожского, Нижний Новгород, Россия'}

	//	var opt = Object.assign({},options, {center: data.data})
	//	console.log(JSON.stringify(opt))
	//	postgres request for markers
	// 	the markers attaching

		options.markers = [
			'color:red|label:A|56.317200,44.000600',
            'color:red|label:B|56.319220,44.002000',
            'color:red|label:C|56.300477,44.019030'
		]
		require('./srv/gmap.js').getMapBase64(options, (error, buffer) => {
			if(!error) socket.emit('gmap', {['gma'+'p']: buffer})
			else console.error('getMapBase64: '+error)
		})
		
	})
})

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})


