const Jimp = require('jimp')
const qs = require('querystring')
const request = require('request')
const config = require('config')

const API_KEY = config.get('API_KEY')
const CTR = config.get('autocomplete.constraints')


/*
	@returns base64 image of gle map according options
	@param options object contains size, geoocation lat long or name of the place
	@callback error, buffer (could be null)

	Google Static Maps API URLs are restricted to 8192 characters in size

*/

exports.getMapBase64 = (options, callback) => {

const uri = 'http://maps.googleapis.com/maps/api/staticmap'

var url = uri +'?'+ qs.stringify(options)

	Jimp.read(url).then(image => {
		
		const height = image.bitmap.height-Number(options.scale)*22
		const width = image.bitmap.width
	   
	    image.crop(0,0,width,height).getBase64(Jimp.MIME_PNG, callback)

	}).catch(function (error) {
	    console.error(error)
	    callback(error, null)
	})
}

exports.getMapDetais = (options, callback) => {


}
/*
	https://maps.googleapis.com/maps/api/place/autocomplete/json
	get list of places = 
	{
	predictions:[
		{
			description: 'address , Nizhny Novgorod, Russia',
			id:
			plase_id:
			types: [ "route", geocode]
		}
	]
	}
*/
exports.getLocations = (input, callback) => {
	var data = null
	var reqobj = {
		method: 'GET',
		uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
		qs: {
			location: '56.296504,43.936059',
			radius: 1000,
			language: 'ru',
			key: API_KEY,
			types: ['route'],
			input: input
		},
		headers: {'User-Agent': 'request'}
	}
	request(reqobj ,(error, response, body) => {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body)

			if(info.status === 'OK') {
			// new array of place descriptions
				data = info.predictions.map(item => { 
					return {description: item.description, id: item.place_id }
				}).filter(obj => CTR.some(place => obj.description.indexOf(place)>0)) 	
				// filter items remove all outside by autocomplete.constraints 
				data = JSON.stringify({data})
			} 
			console.log('Autocomplete req.status: '+info.status)
		}
	callback(error, data)
	})
}
/* get autocomplete details
		{
			result: {
				formatted_address:
				geometry: {
					location: { lat:  lng:  }
				}
				id:
				place_id:
				name:
				types: ["route"]
			}
			status: "OK"
		}
*/
exports.getDetails = (input, callback) => {
	var data = null
	var reqobj = {
		method: 'GET',
		uri: 'https://maps.googleapis.com/maps/api/place/details/json',
		qs: { key: API_KEY, placeid: input },
		headers: { 'User-Agent': 'request'}
	}
	request(reqobj, (error, response, body) => {
		if(!error && response.statusCode == 200) data = JSON.parse(body)
		callback(error, data)
	})
}
