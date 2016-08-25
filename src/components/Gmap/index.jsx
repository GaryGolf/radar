import React from 'react'
import io from 'socket.io-client'

export default class Gmap extends React.Component {
    constructor(props) {
        super(props)

        this.socket = io.connect('/')
        this.state = {options:{}, gmap: null}
 
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
        		{this.state.gmap ? <img src={this.state.gmap} className="gmap"/> : null}
        	</div>
        )
    }
}
