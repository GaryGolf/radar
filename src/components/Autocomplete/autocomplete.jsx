import React from 'react'
import io from 'socket.io-client'

import css from './autocomplete.css'

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props)

		this.currentMenu = -1
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
	keyDownHandler(event) {
		const length = this.state.options.length
		
		console.log(React.Children.toArray(this.refs.menu.children))
		switch(event.keyCode) {

			case  38 : // Up
				console.log('up')
				
				break;
			case  40 : // Down
				console.log('down')
				break;
			default :

		}

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
	overHandler(event) {
		//this.currentMenu = event.target.data-idx
		this.state.options.forEach((item, index) => {
			if(item.id == event.target.ref) this.currentMenu = index
		})

	}
	menu() {
		return (
			<div  className="menu" ref="menu">
				{this.state.options.map( (option, index) => {
					return <div className="menuitem" key={index}  
					onMouseOver={this.overHandler.bind(this)} 
					ref={option.id}>
								{option.description}
						</div>
				})}
			</div>
		)

	}
    render() {
        return (
        	<div className="autocomplete">
        		<input className="autocomlete"  type="search" 
        		onInput={this.inputHandler.bind(this)} onKeyDown={this.keyDownHandler.bind(this)}/>
				{this.state.options.length ? this.menu() : null }
        	</div>
        )
    }
}
