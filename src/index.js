import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'


class  Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        	hello: 'Hello World',
        	gmap: ''
    	}
    }
    componentDidMount(){
    	console.log('components did mount')
    	this.socket = io.connect('/')
		this.socket.on('message', data => {
		    console.log(data)
		    this.setState(data)
		    this.socket.emit('message', { my: 'ok' })
		  })
		this.socket.on('gmap', data => {
			this.setState(data)
		})
    }
    render() {
        return ( 
        	<div>
        		<img src={this.state.gmap} />
        		<h1>{this.state.hello}</h1>
        	</div>
        )
    }
}

ReactDOM.render(<Test/>,document.getElementById('root'))