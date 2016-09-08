import * as React from 'react'
import * as FreeStyle from 'react-free-style'


interface Menu { id: string; description: string }
interface Props {}
interface State { menu: Menu [] }

export let Style = FreeStyle.create()


const menuStyle = Style.registerStyle({
    backgroundColor: 'white',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: '90%',
    width: '560px',
	boxShadow: '3px 3px 10px #AAAAAA',
    padding: '6px'
})

const inputStyle = Style.registerStyle({
	position: 'relative',
	left: '1px',
	width: '95%',
	margin: '5px',
	border: 'none',
	color: 'black'
})

const menuItemStyle = Style.registerStyle({
	width: 'calc(100%-3px)',
    padding: '4px',
	color: '#333333',
	whiteSpace: 'pre',
	overflow: 'hidden',
    // "&:hover": {
    //     backgroundColor: 'silver'
    // }
})

const selectedStyle = Style.registerStyle({
    backgroundColor: 'silver',
    width: 'calc(100%-3px)',
    padding: '4px',
	color: '#333333',
	whiteSpace: 'pre',
	overflow: 'hidden'
})

const normalStyle = Style.registerStyle({
    backgroundColor: 'white'
})



export class Search extends React.Component<Props,State>{

    private input: HTMLInputElement
    private menu: HTMLDivElement
    private menuItems: HTMLDivElement[]
    private current: number

    constructor(props: Props) {

        super(props)
        this.current = -1
        this.menuItems = new Array()
        this.state =  { menu: [] } 

    }

    componentWillMount() {

    

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

    mouseClickHandler(event :any) {

        this.menuItems.forEach((element, idx) => {
            if(element.id == event.target.id) {
                this.current = idx
                this.request(this.state.menu[this.current].id)
                this.input.value = this.state.menu[this.current].description
                this.setState({menu: []})
            }
        })
    }

    mouseOverHandler(event: any) {

        this.menuItems.forEach((element, idx) => {
            if(element.id == event.target.id) {
                this.current = idx
                element.className = selectedStyle
                return
            }
            element.className = menuItemStyle
        })
    }

    request(id: string) {  console.log(id) }


    render() {
        return (
            <div className={menuStyle} ref={div => this.menu = div}>
                <input className={inputStyle} type="search" placeholder="введите адрес."
                    ref={input => this.input = input}
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

