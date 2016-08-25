const request = require('request')
const querystring = require('querystring')
const config = require ('config')


const API_KEY = config.get('API_KEY')
const CTR = config.get('autocomplete.constraints')

exports.getLocations = (input, callback) => {
	var data = null


	request({
			method: 'GET',
			uri: 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json',
			qs: {
				location: '56.296504,43.936059',
				radius: 200,
				language: 'ru',
				key: API_KEY,
				input: input
			},
			headers: {
				'User-Agent': 'request'
			}
		},(error, response, body) => {
		if (!error && response.statusCode == 200) {
		    var info = JSON.parse(body)
		    console.log('Autocomplete req.status: '+info.status)
		    //check error_code
		    if(info.status === 'OK') {
		    	// new array of place descriptions
		    	data = info.predictions.map(item => item.description)  
		    	// filter items remove all outside by autocomplete.constraints
		    	.filter(description => CTR.some(place => description.indexOf(place)>0)) 
		    	data = JSON.stringify({data})
		    } 

		}
		callback(error, data)
	})
}
