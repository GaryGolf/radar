/// <reference path="Socket.d.ts" />
import * as React from 'react'
import * as IO from 'socket.io-client'

interface Props {}
interface State { image: {src: any} }

export default class StaticMap extends React.Component< Props, State > {

    private socket: SocketIOClient.Socket
    private options: Object
    constructor(props: Props) {

        super(props)

        this.socket = window.socket
        this.state = {image: {src: null} }
        this.options = {

            center:     '56.317530,44.000717',  // 'Нижний Новгород'
            language:   'ru',
            zoom:       '12',
            scale:      '1',        // change crop height for scale=2
            maptype:    'roadmap',          //'roadmap','terrain'  
            size:       '600x622',
            format:     'png',
            style:      [
                'feature:all|saturation:-80',
                'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
                'feature:poi.business|element:labels|visibility:off',
                'feature:poi|element:geometry|lightness:45'
            ]
            // ,
            // markers: [
            //     'color:red|label:A|56.317200,44.000600',
            //     'color:red|label:B|56.319220,44.002000',
            //     'color:red|label:C|56.300477,44.019030'
            // ]
        }
    }

    componentWillMount() {

        this.socket.on('staticmap', (buffer: ArrayBuffer) => {
            const bytes = new Uint8Array(buffer);
            const blob = new Blob([bytes.buffer],{type:'image/png'})
            const src = URL.createObjectURL(blob)
            this.setState({image:{src}})
        }) 
    } 
    
    componentDidMount() {
        this.socket.emit('staticmap', this.options)
    }

    render() {
        return (
            <div>
               { this.state.image.src ? <img src={this.state.image.src}/> : null }
            </div>
        )
    }

} 