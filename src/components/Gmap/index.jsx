import React from 'react'
import io from 'socket.io-client'

import './gmap.css'
import PlusIcon from './plus-outline.svg'
import MinusIcon from './minus-outline.svg'


export default class Gmap extends React.Component {
    constructor(props) {
        super(props)
      
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
            ],
            markers: [
                'color:red|label:A|56.317200,44.000600',
                'color:red|label:B|56.319220,44.002000',
                'color:red|label:C|56.300477,44.019030'
            ]
        }

        this.socket = io.connect('/')
        this.state = {gmap: null}
    }

    componentWillMount() {

        this.socket.on('gmap', data =>{
            //data = {gmap:string} componentDidMount
            this.setState(data)
        })
          
    }

    componentDidMount() {
       
        this.socket.emit('gmap-request', this.options)
          
    }

    zoomInHandler(event) {

        if(Number(this.options.zoom) < 20) {
            this.options.zoom = Number(this.options.zoom) + 1
            this.socket.emit('gmap-request', this.options)
        }
    }

    zoomOutHandler(event) {

        if(Number(this.options.zoom) > 10) {
            this.options.zoom = Number(this.options.zoom) - 1
            this.socket.emit('gmap-request', this.options)
        }

    }

    render() {
        return (
        	<div className="gmap">
             <span className="gmap">
                    <div className="gmap zoom" onClick={this.zoomInHandler.bind(this)}><img src={PlusIcon} /></div>
                    <div className="gmap zoom" onClick={this.zoomOutHandler.bind(this)}><img src={MinusIcon} /></div>
               </span>
        		{this.state.gmap ?<div className="gmap-level-0"><img src={this.state.gmap} className="gmap"/></div> : null}
        	  
            </div>
        )
    }
}
