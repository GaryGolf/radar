/// <reference path="./Socket.d.ts" />

import * as React from 'react'
import * as IO from 'socket.io-client'
import { Style, menuStyle, inputStyle, menuItemStyle, selectedStyle } from './Search.css'


interface Location { lat: string, lng: string }
interface Menu { id: string; description: string, location?: Location }
interface Props {}
interface State { menu: Menu [] }
interface MouseEvent extends Event { target: HTMLElement }


export default class Search extends React.Component<Props,State>{

    private input: HTMLInputElement
    private menu: HTMLDivElement
    private socket: SocketIOClient.Socket
    private current: number

    constructor(props: Props) {

        super(props)

        this.socket = window.socket
        this.current = -1
        this.state =  { menu: [] } 

    }

    componentWillMount() {

        // setup data receiver 
		this.socket.on('search-places', (menu: Menu[]) => { 
             this.setState({menu})
             this.current = -1 
        })
    }

    componentDidMount() {
        Style.inject(this.menu)
        this.input.focus()
    }

    clearSelectedStyle() {
          
        var divs = this.menu.getElementsByClassName(selectedStyle)
        for(var i=0; i< divs.length; i++) {  
            divs.item(i).className = menuItemStyle 
        }
    }

    keyDownHandler(event:KeyboardEvent) {

        const len: number = this.state.menu.length;
        const divs = this.menu.getElementsByTagName('div')
        if(len < 1 || len != divs.length ) return

        switch(event.keyCode) {

            case 13:    //Enter
                if(this.current ==-1) this.current = 0
                this.request(this.state.menu[this.current])
                this.input.value = this.state.menu[this.current].description
                this.setState({menu: []})
                break
            case 40:    //Down
                this.clearSelectedStyle()

                this.current = ++this.current % len
                divs.item(this.current).className = selectedStyle
                this.input.value = this.state.menu[this.current].description
                break
            case 38:    //Up
                
                this.clearSelectedStyle()

                this.current = this.current > 0 ? --this.current : len-1
                divs.item(this.current).className = selectedStyle
                this.input.value = this.state.menu[this.current].description
                break
            default :
                return
        }
    }

    mouseClickHandler(event: MouseEvent) {

        this.state.menu.forEach(item => {

            if(item.id === event.target.id) {
                this.request(item)
                this.input.value = item.description
                this.setState({menu: []})
            }
        })
       
        
    }

    mouseOverHandler(event: MouseEvent) {

        
        const divs = this.menu.getElementsByTagName('div')
        for(var i=0; i < divs.length; i++ ) {
            if(divs.item(i) == event.target) { this.current = i; break }
        }
        this.clearSelectedStyle()
        event.target.className = selectedStyle
    }

    inputHandler(event: KeyboardEvent) {
        this.socket.emit('search-places', this.input.value)
    }

    request(data: Object) { 
        this.socket.emit('search-map', data) 
    }

    render() {

        return (
            <div className={menuStyle} ref={div => this.menu = div}>
                <input className={inputStyle} type="search" placeholder="введите адрес."
                    ref={input => this.input = input}
                    onInput={this.inputHandler.bind(this)} 
                    onKeyDown={this.keyDownHandler.bind(this)}/>
                {(this.state.menu.length > 0) ? (this.state.menu.map((item,idx) => (
                        <div className={menuItemStyle} id={item.id} key={idx}
                        onClick={this.mouseClickHandler.bind(this)}
                        onMouseOver={this.mouseOverHandler.bind(this)} >
                            {item.description}
                        </div>
                ))) : null }
            </div>
        )
    }

}

