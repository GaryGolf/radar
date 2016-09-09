import * as React from 'react'
//import * as io from 'socket.io-client'
import { Style, menuStyle, inputStyle, menuItemStyle, selectedStyle } from './Search.css'
import IO from './socket'


interface Menu { id: string; description: string }
interface Props {}
interface State { menu: Menu [] }
interface MouseEvent extends Event { target: HTMLElement }

interface So extends Window { socket: SocketIOClient.Socket }


export default class Search extends React.Component<Props,State>{

    private input: HTMLInputElement
    private menu: HTMLDivElement
    private menuItems: HTMLDivElement[]
    private socket: SocketIOClient.Socket
    private current: number

    constructor(props: Props) {

        super(props)
        this.socket = IO.socket
        this.current = -1
        this.menuItems = new Array()
        this.state =  { menu: [] } 
    }

    componenWillMount() {

        // setup data receiver 
		this.socket.on('autocomplete',( data: any ) => {
        	// get data from server {data:data} or null
            console.log(data)
        	if(!data) return
        	const menu = JSON.parse(data).data
        	this.setState({menu})   // {menu:[{id: description:},...]}
		})
    }

    componentDidMount() {

        const items:Menu[] = [
            {id: '21', description: "New York City"},
            {id: '33', description: "New Jersey"},
            {id: '24', description: "New Orlean"},
            {id: '34', description: "New Hampshire"}
        ]

        setTimeout(() => {
            this.setState({menu: items})
            this.input.focus()
        }, 2000)

        Style.inject(this.menu)
    }

    keyDownHandler(event:KeyboardEvent) {

        const len: number = this.state.menu.length;
         if(len < 1) return

        let clear = () => {
            this.menuItems.forEach(element => {
                element.className = menuItemStyle
            })
        }

        switch(event.keyCode) {

            case 13:    //Enter
                if(this.current ==-1) this.current = 0
                
                this.request(this.state.menu[this.current].id)
                this.input.value = this.state.menu[this.current].description
                this.setState({menu: []})
                break
            case 40:    //Down
                clear()
                this.current = this.current < len-1 ? this.current + 1 : 0
                this.menuItems[this.current].className = selectedStyle
                this.input.value = this.state.menu[this.current].description
                break
            case 38:    //Up
                clear()
                 this.current = this.current > 0 ?  this.current - 1 : len-1
                this.menuItems[this.current].className= selectedStyle
                this.input.value = this.state.menu[this.current].description
                break
            default :
                return
        }
    }

    mouseClickHandler(event: MouseEvent) {

        this.menuItems.forEach((element, idx) => {
            if(element.id == event.target.id) {
                this.current = idx
                this.request(this.state.menu[this.current].id)
                this.input.value = this.state.menu[this.current].description
                this.setState({menu: []})
            }
        })
    }

    mouseOverHandler(event: MouseEvent) {

        this.menuItems.forEach((element, idx) => {
            if(element.id == event.target.id) {
                this.current = idx
                element.className = selectedStyle
                return
            }
            element.className = menuItemStyle
        })
    }

    inputHandler(event: KeyboardEvent) {

        console.log('change')
        this.socket.emit('autocomplete', this.input.value)
    }

    request(id: string) {  console.log(id) }


    render() {
        return (
            <div className={menuStyle} ref={div => this.menu = div}>
                <input className={inputStyle} type="search" placeholder="введите адрес."
                    ref={input => this.input = input}
                    onInput={this.inputHandler.bind(this)} 
                    onKeyDown={this.keyDownHandler.bind(this)}/>
                {(this.state.menu.length > 0) ? (this.state.menu.map((item,idx) => (
                        <div className={menuItemStyle} id={item.id} key={idx}
                        ref={element => this.menuItems[idx] = element } 
                        onClick={this.mouseClickHandler.bind(this)}
                        onMouseOver={this.mouseOverHandler.bind(this)} >
                            {item.description}
                        </div>
                ))) : null }
            </div>
        )
    }

}

