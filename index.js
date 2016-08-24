const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const request = require('request').defaults({ encoding: null })
const Jimp = require('jimp')


//console.log(config.get('key'))

//const gmap = require('./srv/gmap.js')

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

	getmap(socket)
	// var url = "https://upload.wikimedia.org/wikipedia/commons/0/01/Bot-Test.jpg";

	// Jimp.read(url).then(image => {
	// 	const height = image.bitmap.height-image.bitmap.height/20
	// 	const width = image.bitmap.width
	//     image
	//     //.greyscale()
	//     .crop(0,0,width,height)
	//     .getBase64(Jimp.MIME_JPEG, onBuffer);
	// }).catch(function (err) {
	//     console.error(err);
	// })

	// function onBuffer(err, buffer) {
	//     if (err) throw err;
	//     ///console.log(buffer);
	//     socket.emit('gmap',{gmap: buffer})
	// }

	// request map.png
	// request.get(mapurl, (error, response, body) => {
	//     if (!error && response.statusCode == 200) {
	//     	Jimp(new Buffer(body)).then(function(image) {
	//     		image.greyscale()
	//     		//else console.log(img.bitmap.width)
	//     		//this.crop(200,200,400,200)
	    		
	//   	    })
	//         // data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
	//        	// 	 socket.emit('gmap',{gmap: data})
	//     }
	// });


	socket.emit('message', {hello: '+   hello world!  +'})
	socket.on('message', data => {
		console.log(data)
	})
})

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})


