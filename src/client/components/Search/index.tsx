import * as React from 'react'

interface Menu { id: string; description: string }
interface Props {}
interface State { menu: Menu [] }

export default class Search extends React.Component<Props,State>{

    private input: HTMLInputElement
    private menu: HTMLDivElement

    constructor(props: Props) {

        super(props)

       
        this.state =  { menu: [] } 

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

    }


    render() {
        return (
            <div className="search" ref={div => this.menu = div}>
                <input type="search" placeholder="введите адрес"
                    ref={input => this.input = input}/>
                {(this.state.menu.length > 0) ? (this.state.menu.map(item => (
                        <div id={item.id} key={item.id} >
                            {item.description}
                        </div>
                ))) : null }
            </div>
        )
    }

}