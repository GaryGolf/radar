/// <reference path="Socket.d.ts" />
import * as React from 'react'
import * as IO from 'socket.io-client'
import * as ReactFreeStyle from 'react-free-style'

import Search from './Search'


interface Props {}
interface State { image: {src: any} }
interface Location { lat: string, lng: string}
interface Place { id: string, description: string, location?: Location, rows?: any }
interface Options {
    center: string,
    language: string,
    zoom: string,
    scale: string,
    maptype: string,
    size: string,
    format: string,
    style?: Array<string>,
    markers?: Array<string>
}

// if (!Number.prototype.toRadians) {
//             Number.prototype.toRadians = () => { return this * Math.PI / 180; };
// }

export default class StaticMap extends React.Component< Props, State > {

    private socket: SocketIOClient.Socket
    private options: Options
    private container: HTMLDivElement
    private Style: ReactFreeStyle.ReactFreeStyle
    private styles: {container?: string, staticmap?: string}
    private place: Place

    constructor(props: Props) {

        super(props)

        this.socket = window.socket
        this.place = null
        this.state = {image: {src: null} }
        this.Style = ReactFreeStyle.create()
        this.styles = {}
        this.options = {

            center:     '56.27,44.00',  // 'Нижний Новгород'
            language:   'ru',
            zoom:       '12',
            scale:      '1',        // change crop height for scale=2
            maptype:    'roadmap',          //'roadmap','terrain'  
            size:       '600x622',
            format:     'png',
            style:      [
                'feature:all|saturation:-80',
                'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
                'feature:poi.business|element:labels|visibility:off',
                'feature:poi|element:geometry|lightness:45'
            ]
            // markers: ['color:red|label:A|56.317200,44.000600','color:red|label:B|56.319220,44.002000','color:red|label:C|56.300477,44.019030']
        }
        
    }

    prepreStyle() {

        this.styles.container = this.Style.registerStyle({
            width: '100%',
            height: '100%',
            overfow: 'hidden',
            background: 'white',
            '@media only screen and (min-width: 1024px)': {
                width:'600px',
                height: '600px'
             }
        })

        this.styles.staticmap = this.Style.registerStyle({
            width: '100%',
            height: 'auto'
        })
    }

    prepareOptions() {

        const options: Options = {

            center:     '56.2965,43.9361',  // 'Нижний Новгород'  56.2965
            language:   'ru',
            zoom:       '12',
            scale:      '1',        // change crop height for scale=2
            maptype:    'roadmap',          //'roadmap','terrain'  
            size:       '600x622',
            format:     'png',
            style:      [
                'feature:all|saturation:-80',
                'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
                'feature:poi.business|element:labels|visibility:off',
                'feature:poi|element:geometry|lightness:45'
            ]
            // markers: ['color:red|label:A|56.317200,44.000600','color:red|label:B|56.319220,44.002000','color:red|label:C|56.300477,44.019030']
        }
        
        if(!this.container) return null
        
        const width: number = this.container.clientWidth || 600
        const height: number = this.container.clientHeight || 600
        const ratio = width / height

        if(this.place) {

            const markers: Array<string> = new Array()
            for(var i = 0, char = 65; i < this.place.rows.length; i++, char++){
                markers.push(`color:red|label:${String.fromCharCode(char)}|${this.place.rows[i].location.x},${this.place.rows[i].location.y}`)
            }
            options.zoom = '15'
            if(markers.length > 0) options.markers = markers
            options.center = this.place.location.lat+','+this.place.location.lng
        }

        if(width > 640 || height > 618 ) {
            
            if( 618 * ratio > 640 ) {  options.size = 640 + 'x' + (Math.ceil(640/ratio) + 22 ) 
            } else { options.size = Math.ceil(618*ratio) + 'x'+ 640 }

        } else {
            options.size = width + 'x'+ (height + 22)
        }
        console.log(options.size);
        
        return options
    }

    componentWillMount() {
        
        this.socket.on('staticmap', (buffer: ArrayBuffer) => {
            const bytes = new Uint8Array(buffer);
            const blob = new Blob([bytes.buffer],{type:'image/png'})
            const src = URL.createObjectURL(blob)
            this.setState({image:{src}})
        })

        this.socket.on('staticmap-rows', (place: Place) =>{ // import interface place Place
            this.place = place
            const options: Options = this.prepareOptions()
            if(options) this.socket.emit('staticmap',options)
        })

        window.addEventListener('resize',this.windowResizeHandler.bind(this)) 

        this.prepreStyle()
    } 
    
    componentDidMount() {

        this.Style.inject(this.container)
        const options = this.prepareOptions()
        if(options) this.socket.emit('staticmap', options)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandler.bind(this))
    }

    windowResizeHandler(event: Event) {
        const options = this.prepareOptions()
        if(options) this.socket.emit('staticmap', options)
    }

    render() {
        let areas: Array<React.ReactNode> = null
        
        if(this.place && this.place.rows && this.place.rows.length > 0) {
            const center: Location = { lat: this.place.location.lat, lng: this.place.location.lng } 

            const toRad = (f:string)=>  Number(f) * Math.PI / 180

            areas = new Array()    
            areas = this.place.rows.map((item: any, idx: number) => {

                const Cx = 300
                const Cy = 322
                const dx = (Math.ceil((item.location.x - Number(center.lat))* 22000)) + 12 + Cx
                const dy = (Math.ceil((Number(center.lat) - item.location.x)* 44000))  + Cy

                console.log (dx+'x'+dy)

                // console.log(dx+'x'+dy)
                const coords = `${dx},${dy},30`
                return <area key={idx} shape="circle" coords={coords} alt={item.name} href={'javascript:console.log("'+item.name+'")'}/>
            })
        }
        return (
            <div className={this.styles.container} ref={element => this.container = element} >
               { this.state.image.src ? <img className={this.styles.staticmap} useMap="#staticmap" src={this.state.image.src}/> : null }
               { areas ? <map name="staticmap" > {areas} </map> : null }
                <Search/>
            </div>
        )
    }

} 