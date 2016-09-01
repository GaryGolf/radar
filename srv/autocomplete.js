const request = require('request')
const querystring = require('querystring')
const config = require ('config')


const API_KEY = config.get('API_KEY')
const CTR = config.get('autocomplete.constraints')


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

		THEN
		https://maps.googleapis.com/maps/api/place/details/json?placeid=

		{
			result: {
	
				formatted_address:
				geometry: {
					location: {
						lat:
						lng:
					}
				}
				id:
				place_id:
				name:
				types: ["route"]
			}
			status: "OK"

		}
*/


exports.getLocations = (input, callback) => {
	var data = null


	request({
			method: 'GET',
			uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
			qs: {
				location: '56.296504,43.936059',
				radius: 1000,
				language: 'ru',
				key: API_KEY,
				types: ['route'],
				input: 'Минина'//input
			},
			headers: {
				'User-Agent': 'request'
			}
		},(error, response, body) => {
		if (!error && response.statusCode == 200) {
		    var info = JSON.parse(body)

		     if(info.status === 'OK') {
		    	// new array of place descriptions
		    	data = info.predictions.map(item => { 
		    		return {description: item.description, id: item.place_id }
		    	})  
		    	// filter items remove all outside by autocomplete.constraints
		    	.filter(obj => CTR.some(place => obj.description.indexOf(place)>0)) 
		    	data = JSON.stringify({data})
		    } 
		   console.log('Autocomplete req.status: '+info.status)
		  // console.log('Autocomplete obj: '+ data)

		    //check error_code
		    // if(info.status === 'OK') {
		    // 	// new array of place descriptions
		    // 	data = info.predictions.map(item => item.description)  
		    // 	// filter items remove all outside by autocomplete.constraints
		    // 	.filter(description => CTR.some(place => description.indexOf(place)>0)) 
		    // 	data = JSON.stringify({data})
		    // } 

		}
		callback(error, data)
	})
}
