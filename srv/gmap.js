const Jimp = require('jimp')
/*
	@returns base64 image of gle map according options
	@param options object contains size, geoocation lat long or name of the place
	@callback error, buffer (could be null)

*/

exports.getMapBase64 = (options, callback) => {

const mapurl = 'http://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x270'

	Jimp.read(mapurl).then(image => {
		
		const height = image.bitmap.height-20
		const width = image.bitmap.width
	   
	    image .crop(0,0,width,height).getBase64(Jimp.MIME_PNG, callback)

	}).catch(function (error) {
	    console.error(error)
	    callback(error, null)
	})
}