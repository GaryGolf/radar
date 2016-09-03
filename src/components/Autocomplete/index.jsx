import React from 'react'
import io from 'socket.io-client'
import css from './autocomplete.css'

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.curItem = 0
		this.reminder = null
		this.socket = io.connect('/')
        this.state = {menu:[]}
    }
    componentWillMount() {
        
		// setup data receiver 
		this.socket.on('autocomplete', data => {
        	// get data from server {data:data} or null
        	if(!data) return
        	const menu = JSON.parse(data).data
        	this.setState({menu})   // {menu:[{id: description:},...]}
			if(this.reminder) {
				clearTimeout(this.reminder)
				this.refs.menu.children[0].placeholder = 'поиск'
			}
		})
    }
    componentDidMount() {
		const input = this.refs.menu.children[0]

		this.reminder = setTimeout(() => {
			input.placeholder = 'введите адрес'
			this.reminder = setTimeout(() => {
				input.placeholder = 'например, Московский вокзал'
				this.reminder = setTimeout(() => {
					let i = 0
					let str = 'Московский вокзал'
					const running = () => {
						if( i >= str.length) {
							clearInterval(this.reminder)
							setTimeout(() => {input.placeholder = 'поиск'}, 6000)
							return str
						}
						return str.substr(0,i++)
					}
					this.reminder = setInterval(() => { input.placeholder = running(str)},200)
				},1500)
			},2000)		
		}, 4000)
    }
    request(place){
        console.log(place)
/*
	todo

	1. request place details
	2. get JSON then take lag lat
	3. requset postgres estates nearby lat: lng:
	4. take postgres response then use geocode lat: lng: for mapReq
	5. request Google Map with estate markers
	6. send map to client

*/
    }
    //Clear all selection
    clear() {
        for(var i=1;i<this.refs.menu.children.length; i++)
            this.refs.menu.children[i].className = 'normal'
    }
    mouseOverHandler(event){
        this.clear()
        event.target.className = 'selected'
		this.state.menu.forEach((element, idx) => {
			if(element.id == event.target.id) {
				this.curItem = idx+1
				return false
			}
		})
    }
    clickHandler(event){
        this.refs.menu.children[0].value = event.target.innerText
        this.request(event.target.id)
        // delete menu
        this.setState({menu:[]})
    }

    //takes keyboard input KeyUp, Down and Enter
    keyDownHandler(event) {
        // items array can't be empty
        const len = this.state.menu.length;
        if(len < 1) return false

		const input = this.refs.menu.children[0]
                
        switch (event.keyCode) {
            case 13:
                // check curItem, if == 0
                 if(this.curItem != 0) {  
					 this.request(this.refs.menu.children[this.curItem].id)
				 } else {
                	// if user doesnot care take first element from menu
					input.value = this.state.menu[0].description
                	this.request(this.refs.menu.children[1].id)
				 }
                this.setState({menu:[]})
                break
            case 40: 
                // Down key restore background color then make darker on item below
                //clear all
                this.clear()
                this.curItem = this.curItem < len ? this.curItem + 1 : 1
                this.refs.menu.children[this.curItem].className='selected'
                // change input value
                input.value = this.state.menu[this.curItem-1].description
                break
            case 38:
                // Up key is pressed
                //clear all
                this.clear()
                //find next element
                this.curItem = this.curItem > 1 ?  this.curItem - 1 : len
                //make darker background
                this.refs.menu.children[this.curItem].className='selected'
                // change input value
                input.value = this.state.menu[this.curItem-1].description
                break
            default:
        }
    }
	inputHandler(event) {
		//  more
		this.socket.emit('autocomplete', {data: event.target.value})
	}
    drawMenu(){
        if(this.state.menu.length > 0) {
            return this.state.menu.map(item => {
                return (
                    <div key={item.id} id={item.id} 
                     onClick={this.clickHandler.bind(this)} 
                     onMouseOver={this.mouseOverHandler.bind(this)}>
                        {item.description}
                    </div>
                )})
        }
        return null
    }
    render(){
        return (
            <div className="menu" ref="menu">
                <input ref="menuinput"  autoFocus={true} placeholder="поиск"
					onKeyDown={this.keyDownHandler.bind(this)} 
					onInput={this.inputHandler.bind(this)}/>
               {this.drawMenu()}
            </div>
        )
    }
}