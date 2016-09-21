import * as request from 'request'
import * as qs from 'querystring'
import * as config from 'config'

import { getNear, savePlace, getPlacesFromDB, isAddressExist, popPlace } from './estate'



const API_KEY = config.get('API_KEY')
const CTR = <string[]> config.get('autocomplete.constraints')
const opts1 = {
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    qs: {
        location: '56.296504,43.936059',
        radius: '1000',
        language: 'ru',
        key: API_KEY,
        types: ['route'],
        input: ''
    },
    headers: {'User-Agent': 'request'}
}
const opts2 = {
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/place/details/json',
    qs: { key: API_KEY, placeid: ' ' },
    headers: { 'User-Agent': 'request'}
}



export interface Place { id: string, description: string, location?: Location }

export function getPlace(input: string) {

    let data: Place[] = []
    
    return new Promise<Place[]>(( resolve, reject ) => {

        opts1.qs.input = input

        request( opts1, (error, response, body) => {

            let info: any

		    if(error) { reject(error); return }
            
            if(response.statusCode != 200) { reject('status: ' + response.statusCode ); return }

            try { info  = JSON.parse(body) }
            catch(e) { reject(e); return }

			if(info.status != 'OK') { reject('status: '+ info.status); return }

			// new array of place descriptions
                data = info.predictions.map((item: any) => { 
                // remove Нижегородская обл, Россия
                
                const description = cut(item.description)
                const id = item.place_id

                return {description, id}
            }).filter((obj: any) => CTR.some(place => obj.description.indexOf(place)>0)) 	
            // filter items remove all outside by autocomplete.constraints 
            
            resolve(data)
            console.log('status: ' + info.status ) 
        })
    })

    function cut(address: string): string {
        
        let idx = address.indexOf(', Нижегородская обл')
        if(idx != -1) address = address.substr(0, idx)
        idx = address.indexOf(', Россия')
        if(idx != -1) address = address.substr(0, idx)
        return address

    }
}   

export interface Location { lat: string, lng: string}

export function getLocation(placeid: string) { 
	
    return new Promise<Location>((resolve, reject) => {

        opts2.qs.placeid = placeid
        request(opts2, (error, response, body) => {
             
            let data: any
             
		    if(!error && response.statusCode == 200) { 

                try { 
                    data  = JSON.parse(body) 
                    if(data.status == 'OK') { 
                        
                        const lat = data.result.geometry.location.lat
                        const lng = data.result.geometry.location.lng      

                        resolve({lat, lng})  
                        console.log('status: ' + data.status )
                    } else {
                        reject('status: ' + data.status )
                    }
                } catch(error) { 
                    reject(error) 
                }
            } else {   
                reject('HTTPstatus: ' + response.statusCode )
            }
        })
	})
}

export function getMap(input: string) {

    return new Promise((resolve, reject) => {

        getPlace(input).then(places => {

            getLocation(places[0].id).then(location => {

                resolve(location)

            }).catch(error => {
                reject(error)
            })
        }).catch( error => {
            reject(error)
        }) 
    })
}

/*
	@returns base64 image of gle map according options
	@param options object contains size, geoocation lat long or name of the place
	@callback error, buffer (could be null)

	Google Static Maps API URLs are restricted to 8192 characters in size

*/
import * as Jimp from 'jimp'

export function getMapImage(options: any) {

    options = options ? options : {
            center:     '56.317530,44.000717',  // 'Нижний Новгород'
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
            // markers: ['color:red|label:A|56.317200,44.000600',    
        }

    return new Promise<any>((resolve, reject) => {
       
        const uri = 'http://maps.googleapis.com/maps/api/staticmap'
        const url = uri +'?'+ qs.stringify(options)

        Jimp.read(url).then(image => {
            
            const height = image.bitmap.height-Number(options.scale)*22
            const width = image.bitmap.width
        
            image.crop(0,0,width,height)
            .getBuffer(Jimp.MIME_PNG,(error, buffer) => {
                
                if(!error) {
                    resolve(buffer)
                } else {
                    reject(error)
                }

            })
        }).catch(error => {
            reject(error)
        })
    })
}
/*
*   Gets place, search for estates near it
*   saves place to DB or makes it most popular
*   returns map image bitmap array
*
*/
export async function searchMap(place: Place): Promise<any> {

    const options =<any>config.get('options')
    const markers: string[] = new Array()
    let location: Location // = {lat: '56.317530', lng: '44.000717'}
    let rows: any
    try {
        // if location is unknown request location()
        if (!place.location) location = await getLocation(place.id)
        else location = place.location
        place.location = location

        isAddressExist(place.description).then(exist => {
            if (exist) {    // if this place exist in DB change modified Date to NOW
                popPlace(place.description).then(status => { console.log('popStatus:'+status) }).catch(error => { console.error(error) })
             } else {       // If not Save New Place to DB
                savePlace(place).then(status => { console.log('saveStatus:'+status) }).catch(error => { console.error(error) })
             }
        }).catch(error => { console.error(error) })
        // search closest properties from DB
        rows = await getNear(Number(location.lat), Number(location.lng))

     } catch(error) { console.error(error) }
    // adding location of map center
    options.center = location.lat+','+location.lng
    // prepare array of markers color:red|markers:(from A to Z)|location.lat,location.lng
    for(var i = 0, char = 65; i< rows.length; i++, char++){
            markers.push(`color:red|label:${String.fromCharCode(char)}|${rows[i].location.x},${rows[i].location.y}`)
    }
    // add markers of properies at map
    if(markers.length > 0) options.markers = markers
    //  map image request
    return await getMapImage(options)
}   // searchMao