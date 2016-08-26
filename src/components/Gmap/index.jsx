import React from 'react'
import io from 'socket.io-client'

import css from './gmap.css'

export default class Gmap extends React.Component {
    constructor(props) {
        super(props)

        this.socket = io.connect('/')
        this.state = {options:{}, gmap: null, gmap0: null, gmap1: null, gmap2: null}
 
    }

    componentWillMount() {

        this.socket.on('gmap', data =>{
            //data = {gmap:string}
            this.setState(data)
        })
          
    }

    componentDidMount() {

        this.socket.emit('gmap-request', null)
          
    }
    render() {
        return (
        	<div className="gmap">
        		{this.state.gmap ?<div className="gmap-level-0"><img src={this.state.gmap} className="gmap"/></div> : null}
        	</div>
        )
    }
}
