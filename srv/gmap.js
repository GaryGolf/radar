const Jimp = require('jimp')
const qs = require('querystring')
/*
	@returns base64 image of gle map according options
	@param options object contains size, geoocation lat long or name of the place
	@callback error, buffer (could be null)

	Google Static Maps API URLs are restricted to 8192 characters in size

*/

exports.getMapBase64 = (options, callback) => {

const mapurl = 'http://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x270'
const uri = 'http://maps.googleapis.com/maps/api/staticmap'
 options = {

	center: 	'56.327530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'250x272',
	format: 	'png',
	// Letters only , wipe all geometry
	//style: 		'feature:all|element:geometry|visibility:off'
	//style: 		'feature:road.local%7Celement:geometry%7Ccolor:0x00ff00%7Cweight:1%7Cvisibility:on'
	style: [

		'visibility:off',
		'feature:water|visibility:simplified|saturation:-50',
		'feature:landscape.man_made|visibility:simplified|saturation:-50'
	]

/*	// water and base terrain
	style:     [
		'feature:transit|visibility:off',
		'feature:road|visibility:off',
		'feature:poi|visibility:off',
		'feature:administrative|visibility:off',
		'feature:landscape|saturation:50',
		'feature:water|geometry.fill|saturation:100'
	]
*/
}

var url = uri +'?'+ qs.stringify(options)
//var a = '&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff00%7Cweight:1%7Cvisibility:on&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000%7Cvisibility:on'


	Jimp.read(url).then(image => {
		
		const height = image.bitmap.height-22
		const width = image.bitmap.width
	   
	    image .crop(0,0,width,height).getBase64(Jimp.MIME_PNG, callback)

	}).catch(function (error) {
	    console.error(error)
	    callback(error, null)
	})
}


exports.test = () => {

const uri = 'http://maps.googleapis.com/maps/api/staticmap'

	 options = {

		center: 	'56.327530,44.000717',  // 'Нижний Новгород'
		lang: 		'ru',
		zoom: 		'14',
		size: 		'250x270',
		format: 	'png',
		style:    ['first','second','third', 'forth']

	}
	
	console.log(qs.stringify(options))
}
