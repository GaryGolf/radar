import React from 'react'
import io from 'socket.io-client'

import css from './autocomplete.css'

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.socket = io.connect('/')
        this.state = {options:[]}

    }

    componentWillMount() {
     
        this.socket.on('autocomplete', data => {
        	// get data from server {data:data} or null
        	if(!data) return
        	var options = JSON.parse(data).data
        	this.setState({options})
			
		})
    }

    inputHandler(event) {

    	if(event.keyCode === 13) {
    		// in case enter key is pressed send special request to server

            this.socket.emit('locate', {data:event.target.value})

    		// reset input sring
    		event.target.value=''
    	}else{
    		
    		// request more
    		this.socket.emit('autocomplete', {data: event.target.value})
    	}

    }
    render() {
        return (
        	<div className="autocomplete">
        		<input className="autocomlete" list="autocomplete" 
        		ref="autocomplete" onKeyDown={this.inputHandler.bind(this)} />
        		<datalist id="autocomplete" className="autocomplete">
        			{this.state.options.map((option, index) => {
        				return <option key={index} value={option}/>
        			})}
        		</datalist>
        	</div>
        )
    }
}
