import * as request from 'request'
import * as qs from 'querystring'
import * as config from 'config'



const API_KEY = config.get('API_KEY')
const CTR = <string[]> config.get('autocomplete.constraints')
const opts = {
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

interface Place { id: string, description: string }

export function getPlace(input: string) {

    let data: Place[] = []
    
    return new Promise<string>(( resolve, reject ) => {

        opts.qs.input = input

        request( opts, (error, response, body) => {

            let info: any

		    if(error) { reject(error); return }
            
            if(response.statusCode != 200) { reject('status: ' + response.statusCode ); return }

            try { info  = JSON.parse(body) }
            catch(e) { reject(e); return }

			if(info.status != 'OK') { reject('status: '+ info.status); return }

			// new array of place descriptions
            data = info.predictions.map(item => { 
                return {description: item.description, id: item.place_id }
            }).filter(obj => CTR.some(place => obj.description.indexOf(place)>0)) 	
            // filter items remove all outside by autocomplete.constraints 
            
            resolve(JSON.stringify({data}))
            console.log('status: ' + info.status ) 
        })
    })
}   