import * as request from 'request'
import * as qs from 'querystring'
import * as config from 'config'



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



interface Place { id: string, description: string }

export function getPlace(input: string) {

    let data: Place[] = []
    
    return new Promise<any>(( resolve, reject ) => {

        opts1.qs.input = input

        request( opts1, (error, response, body) => {

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
            
            resolve(data)
            console.log('status: ' + info.status ) 
        })
    })
}   


export function getDetails(input) {
	//var data: any = null
    return new Promise<any>((resolve, reject) => {

        opts2.qs.placeid = input
        request(opts2, (error, response, body) => {
             
             let data: any

		    if(error) { reject(error); return }
            
            if(response.statusCode != 200) { reject('status: ' + response.statusCode ); return }

            try { data  = JSON.parse(body) }
            catch(e) { reject(e); return }

			if(data.status != 'OK') { reject('status: '+ data.status); return }
            //if(!error && response.statusCode == 200) data = JSON.parse(body)

            resolve(data)

        })
	})
}
