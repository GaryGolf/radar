// <reference path="./Socket.d.ts" />

import * as React from 'react'
// import * as IO from 'socket.io-client'
import * as FreeStyle from 'react-free-style'
import { Style, prepareAnimation, wrapperStyle, titleStyle,subtitleStyle, descriptionStyle, tagStyle } from './ListItem.css'

interface EstateDescription {title?: string, subtitle?: string, description: string, img?: Array<string>, tag: string}
interface Props { info: EstateDescription}
interface State {}


export default class ListItem extends React.Component <Props, State> {

    private container: HTMLDivElement
    private esd: EstateDescription
    private containerStyle: string

    constructor(props: Props) {

        super(props)
        this.esd = this.props.info
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