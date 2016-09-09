import * as io from 'socket.io-client'

export default class IO {
   
    static socket: SocketIOClient.Socket  = io.connect('/') 

}