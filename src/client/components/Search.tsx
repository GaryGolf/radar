/// <reference path="./Socket.d.ts" />

import * as React from 'react'
// import * as IO from 'socket.io-client'

import { Style, css } from './Search.css'


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
    private backspace: boolean

    constructor(props: Props) {

        super(props)

        this.socket = window.socket
        this.current = -1
        this.backspace = false
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

    keyDownHandler(event:KeyboardEvent) {

        const len: number = this.state.menu.length;
        const divs = this.menu.getElementsByTagName('div')
        if(len < 1 || len !== divs.length )  { return } 

        const clearSelected = () => {
            const selected = this.menu.getElementsByClassName(css.selected)
            for(var i=0; i< selected.length; i++) { selected.item(i).classList.remove(css.selected) }
        }

        switch(event.keyCode) {

            case 13:    //Enter
                if(this.current === -1)  { this.current = 0 }
                this.request(this.state.menu[this.current])
                this.input.value = this.state.menu[this.current].description
                this.setState({menu: []})
                break
            case 40:    //Down
                
                clearSelected()
                this.current = ++this.current % len
                divs.item(this.current).classList.add(css.selected)
                this.input.value = this.state.menu[this.current].description
                break
            case 38:    //Up
                
                clearSelected()
                this.current = this.current > 0 ? --this.current : len-1
                divs.item(this.current).classList.add(css.selected)
                this.input.value = this.state.menu[this.current].description
                break
            case 8:  // backspace

                if(this.backspace) {
                    // first time pressed - removes last symbol | second time - removes whole string
                    this.input.value = ''
                    this.setState({menu: []})
                    this.backspace = false
                }   else {

                    this.backspace = true
                } 
                break
            case 27 : //escape
                // this.input.value = ''
                this.setState({menu: []})
                // this.backspace = false
                break
            default :
                // this.socket.emit('search-places', this.input.value)
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

    inputHandler(event: KeyboardEvent) {
       this.socket.emit('search-places', this.input.value)
    }

    request(data: Object) { 
        this.socket.emit('search-map', data) 
    }

    render() {

        const inputHandlers = {
            onInput: this.inputHandler.bind(this),
            onKeyDown: this.keyDownHandler.bind(this) 
        }

        const menuHandlers = {
            onClick: this.mouseClickHandler.bind(this)
        }

        return (
            <div className={css.menu} ref={div => this.menu = div}>
                <input className={css.input} type="text" placeholder="введите адрес"
                    ref={input => this.input = input} {...inputHandlers} />
                {(this.state.menu.length > 0) ? (this.state.menu.map((item,idx) => (
                        <div className={css.menuItem} id={item.id} key={idx} {...menuHandlers} >
                            {item.description}
                        </div>
                ))) : null }
            </div>
        )
    }
}

