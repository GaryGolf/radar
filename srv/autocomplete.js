const request = require('request')
const querystring = require('querystring')
const config = require ('config')


const API_KEY = config.get('API_KEY')

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
		    //console.log(info)
		    //check error_code
		    if(info.status === 'OK') {
		    	data = info.predictions.map(item => item.description)
		    	data = data.filter(item => { return item.indexOf('Нижний Новгород')>0})
		    	data = JSON.stringify({data})
		    } 

		}
		callback(error, data)
	})
}
