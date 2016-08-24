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
        const options = [
        	'trusting',
        	'tresspassing',
        	'transfering',
        	'tresspassing'
        	// 'trangladith',
        	// 'tresures',
        	// 'transitioning'
        ]

        this.setState({options})
       
        this.socket.on('autocomplete', data => {
        	
        	if(!data) return
        	var options = JSON.parse(data).data
        	this.setState({options})
			console.log('Data from autocomplete:\n'+options)   
		})
    }

    inputHandler(event) {

    	if(event.keyCode === 13) {
    		event.target.value=''
    	}else{
    		
    		if(this.socket) this.socket.emit('autocomplete', {data: event.target.value})
    	}

    }
    render() {
        return (
        	<div className="autocomplete">
        		<input className="autocomlete" list="autocomplete" ref="autocomplete" onKeyDown={this.inputHandler.bind(this)}/>
        		<datalist id="autocomplete" className="autocomplete">
        			{this.state.options.map((option, index) => {
        				return <option key={index} value={option}/>
        			})}
        		</datalist>
        	</div>
        )
    }
}
