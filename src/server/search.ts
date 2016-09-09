import * as request from 'request'
import * as qs from 'querystring'
import * as config from 'config'

const API_KEY = config.get('API_KEY')
const CTR = config.get('autocomplete.constraints')
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

export  function getPlace(input: string) {

    opts.qs.input = input


    return new Promise<string>(( resolve, reject ) => {

        request( opts, (error, response, body) => {
		    if (!error && response.statusCode == 200) {
			 
			    console.log(body)
                resolve('status code: ' + response.statusCode)
            } else {
                reject(error)
            }
        })
    })
}   