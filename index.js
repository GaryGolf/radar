const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const request = require('request').defaults({ encoding: null })
const Jimp = require('jimp')



app.use(express.static('public'))



const picurl = 'http://images-mediawiki-sites.thefullwiki.org/04/1/7/5/6204600836255205.png'
//const mapurl = 'http://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=600x400'

function getmap(socket) {

const mapurl = 'http://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=800x1020'

Jimp.read(mapurl).then(image => {
		const height = image.bitmap.height-20
		const width = image.bitmap.width
	    image
	    //.greyscale()
	   .crop(0,0,width,height)
	    .getBase64(Jimp.MIME_PNG, onBuffer);
	}).catch(function (err) {
	    console.error(err);
	})

	function onBuffer(err, buffer) {
	    if (err) throw err;
	    ///console.log(buffer);
	    socket.emit('gmap',{gmap: buffer})
	}
}

io.on('connection', socket => {

	//getmap(socket)
	

	socket.emit('message', {hello: '+   hello world!  +'})
	socket.on('message', data => {
		console.log(data)
	})
	socket.on('autocomplete', data => {
		require('./srv/autocomplete').getLocations(data.data, (error, data) => {
			if(!error) socket.emit('autocomplete',data)
			else console.log('Error '+error)
		})
	})
})

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})


