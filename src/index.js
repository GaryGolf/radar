import react from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'



 var socket = io.connect('/')
		  socket.on('news', function (data) {
		    console.log('data:  '+data)
		    socket.emit('my other event', { my: 'data' })
		  })