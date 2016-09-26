// <reference path="./Socket.d.ts" />

import * as React from 'react'
// import * as IO from 'socket.io-client'
import * as FreeStyle from 'react-free-style'
import { Style, prepareAnimation, wrapperStyle, titleStyle,subtitleStyle, descriptionStyle, tagStyle } from './ListItem.css'

interface EstateDescription {title?: string, subtitle?: string, description: string, img?: Array<string>, tag: string}
interface Props { EstateDescription: EstateDescription}
interface State {}


export default class ListItem extends React.Component <Props, State> {

    private container: HTMLDivElement
    private esd: EstateDescription
    private containerStyle: string

    constructor(props: Props) {

        super(props)
        this.esd = this.props.EstateDescription
        // {
        //         title: 'Шикарный офис в центре',
        //         subtitle: 'Оффисный центр, четвертый этаж, 25кв.м', 
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quia quos odio fugiat qui. Eaque ea reprehenderit doloremque. Odit distinctio nisi eos delectus eaque provident consequuntur perferendis maiores, saepe doloribus suscipit quasi ad aut nam sapiente quas iste quo quidem, reiciendis, accusamus quam eligendi.\nUllam earum doloribus recusandae, quis, minus ipsa obcaecati dolores modi odio, beatae iusto, quaerat. Dicta architecto in perferendis ut modi velit consequatur itaque suscipit, reiciendis officia laborum praesentium numquam fuga labore ea cum eius soluta sit magni eaque unde perspiciatis asperiores? Cupiditate minus quis distinctio sequi placeat dolores reiciendis, inventore officiis eos quas quo illum perspiciatis?',
        //         img: ['img/1ee70cab09e65d1bf_900.jpg','img/c3bae5812bc053fd4_900.jpg'],
        //         tag: 'A'
        //     } 
        this.containerStyle = prepareAnimation(this.esd.img)
    }

    componentWillMount () {
    }

    componentDidMount () {

        Style.inject(this.container)
    }

    render() {
        const description = this.esd.description.split('\n').map((paragraph, idx) => <p className={descriptionStyle} key={idx}>{paragraph}</p>)
        return (
            <div className={this.containerStyle} ref={element => this.container = element}>
                <div className={wrapperStyle}>
                    <div className={titleStyle}>{this.esd.title}</div>
                    <div className={subtitleStyle}>{this.esd.subtitle}</div>
                    {description}
                    <div className={tagStyle}>{this.esd.tag}</div>    
                </div>
                
            </div>
        )
    }
}