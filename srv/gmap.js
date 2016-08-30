const Jimp = require('jimp')
const qs = require('querystring')
/*
	@returns base64 image of gle map according options
	@param options object contains size, geoocation lat long or name of the place
	@callback error, buffer (could be null)

	Google Static Maps API URLs are restricted to 8192 characters in size

*/

options1 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off',
		'feature:water|visibility:simplified|saturation:-50',
		'feature:landscape.man_made|visibility:simplified|saturation:-50'
	]
}
options2 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'terrain',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off'
	]
}
options3 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off',
		'feature:poi|element:geometry.fill|saturation:-50|visibility:on'
	]
}
options5 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off',
		'feature:road|element:geometry.fill|saturation:-50|visibility:on'
	]
}
options6 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off',
		'feature:transit|element:geometry.fill|saturation:-50|visibility:on'
	]
}
options7 = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'14',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',  
	size: 		'1024x790',
	format: 	'png',
	style: [

		'visibility:off',
		'feature:all|element:labels|saturation:-10|visibility:on'
	]
}

exports.getMapBase64 = (options, callback) => {

const uri = 'http://maps.googleapis.com/maps/api/staticmap'
const opts = {

	center: 	'56.317530,44.000717',  // 'Нижний Новгород'
	language: 	'ru',
	zoom: 		'15',
	scale:  	'1',		// change crop height for scale=2
	maptype:    'roadmap',			//'roadmap','terrain'  
	size: 		'1000x1022',
	format: 	'png',
	style: 		[
		'feature:all|saturation:-80',
		'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
		'feature:poi.business|element:labels|visibility:off',
		'feature:poi|element:geometry|lightness:45'
	] 

}

//options = options ? options : opts

var url = uri +'?'+ qs.stringify(options)

	Jimp.read(url).then(image => {
		
		const height = image.bitmap.height-Number(options.scale)*22
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
