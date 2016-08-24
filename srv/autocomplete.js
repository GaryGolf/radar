const request = require('request')
const querystring = require('querystring')
const config = require ('config')

const API_KEY = config.get('API_KEY')

const form ={
	
	location: '56.296504,43.936059',
	radius: 20000,
	language: 'ru',
	key: API_KEY,
	input: 'Сенная',

}

const url = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json'

var qs = querystring.stringify(form)

var qs = url+'?'+qs

console.log(qs)

request.get(qs).on('response', response => {
	console.log(response.statusCode)
	console.log(response.headers['content-type'])
})