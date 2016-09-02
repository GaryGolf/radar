import React from 'react'
import css from './menu.css'

export default class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.curItem = 0
        this.state = {menu:[]}
    }
    componentWillMount() {
        const items = [
            {id:"123456", description: "Orange"},
            {id:"443456", description: "Apple"},
            {id:"957922", description: "Banana"},
            {id:"567730", description: "Grapefruit"}
        ]

        this.setState({menu:items})
    }
    componentDidMount() {
        // Set focus on input
    }
    request(place){
        console.log(place)
    }
    //Clear all selection
    clear() {
        for(var i=0;i<this.refs.menu.children.length; i++)
            this.refs.menu.children[i].className = 'normal'
    }
    mouseOverHandler(event){
        this.clear()
        event.target.className = 'selected'
        this.refs.menu.children[0].value = event.target.innerText
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
                
        switch (event.keyCode) {
            case 13:
                console.log('Enter')
                // check curItem, if == 0
                 if(this.curItem != 0)  this.request(this.refs.menu.children[this.curItem].id)
                // if user doesnot care take first element from menu
                else  this.request(this.refs.menu.children[1].id)
                this.setState({menu:[]})
                break
            case 40: 
                // Down key restore background color then make darker on item below
                //clear all
                this.clear()
                this.curItem = this.curItem < len ? this.curItem + 1 : 1
                this.refs.menu.children[this.curItem].className='selected'
                // change input value
                this.refs.menu.children[0].value = this.state.menu[this.curItem-1].description
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
                this.refs.menu.children[0].value = this.state.menu[this.curItem-1].description
                break
            default:
        }
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
                <input ref="menuinput" onKeyDown={this.keyDownHandler.bind(this)} autoFocus={true}/>
               {this.drawMenu()}
            </div>
        )
    }
}