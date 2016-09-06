import * as http from 'http'
import * as config from 'config'
import * as express from 'express'
import * as socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const options = config.get('options')
const io = socketio(server)

app.use(express.static('public'))

server.listen(3000, () => {
	console.log('http.server started at port 3000;')
})

