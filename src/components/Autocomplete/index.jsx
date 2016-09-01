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
    		
		// request more
		this.socket.emit('autocomplete', {data: event.target.value})

    }
	changeHandler(event) {
    	if(event.keyCode === 13) {
    		// in case enter key is pressed send special request to server
			console.log(this.refs.acdatalist)
			/*
				there is 3 options:
				1. user enter 4 letters then select option then enter

				2. user select option then change it

				3. user enter text despite options 

			*/
			// 1.
			
            this.socket.emit('locate', {data:event.target.value})
    		// reset input sring
    		event.target.value=''
    	}
	}
	clickHandler(event) {

        console.log('click')
        console.log(event.target)
    }
	menu() {
		return (
			<div  className="autocompletemenu" onMouseOut={ (event)=> {delete event.target} } >
				{this.state.options.map( (option, index) => {
					return <div className="acmenuitem" key={index}> {option.description}</div>
				})}
			</div>
		)

	}
    render() {
        return (
        	<div className="autocomplete">
        		<input className="autocomlete"  type="search" 
        		onInput={this.inputHandler.bind(this)} onKeyDown={this.changeHandler.bind(this)}/>
				{this.state.options.length ? this.menu(): null }
        	</div>
        )
    }
}
