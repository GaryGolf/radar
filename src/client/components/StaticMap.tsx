/// <reference path="Socket.d.ts" />
import * as React from 'react'
import * as IO from 'socket.io-client'

interface Props {}
interface State { image: {src: any} }

export default class StaticMap extends React.Component< Props, State > {

    private socket: SocketIOClient.Socket
    constructor(props: Props) {

        super(props)

        this.socket = window.socket
        this.state = {image: {src: null} }
    }

    componentDidMount() {

        this.socket.on('staticmap', (buffer: ArrayBuffer) => {
            const bytes = new Uint8Array(buffer);
            const blob = new Blob([bytes.buffer],{type:'image/png'})
            const src = URL.createObjectURL(blob)
            this.setState({image:{src}})
        })  

        this.socket.emit('staticmap', null)
    }

    render() {
        return (
            <div>
               { this.state.image.src ? <img src={this.state.image.src}/> : null }
            </div>
        )
    }

} 