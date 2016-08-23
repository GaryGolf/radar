const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const request = require('request').defaults({ encoding: null })


//console.log(config.get('key'))

//const gmap = require('./srv/gmap.js')

app.use(express.static('public'))



const picurl = 'http://images-mediawiki-sites.thefullwiki.org/04/1/7/5/6204600836255205.png'


io.on('connection', socket => {


	request.get(picurl, (error, response, body) => {
	    if (!error && response.statusCode == 200) {
	        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
	       	 socket.emit('gmap',{gmap: data})
	       	// console.log(data)
	    }
	});


	socket.emit('message', {hello: '+   hello world!  +'})
	socket.on('message', data => {
		console.log(data)
	})
})

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})


