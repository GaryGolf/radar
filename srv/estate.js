var pg = require('pg');
var config = require('config')

var conString = config.get('PG_CON_STRING')


var client = new pg.Client(conString)

exports.nearEstates = (lat, lng, callback) => {
    
    var data = new Array()
    
    client.connect()
    // 'SELECT name, location FROM estate WHERE (location <-> point(56.317530,44.000717)) < 0.01'
    var query = client.query('SELECT name, location FROM estate WHERE (location <-> point('+lat+','+lng+')) < 0.1')

    //fired after last row is emitted

    query.on('row', row => {

        data.push(row)
        //console.log(row.name+'  {'+row.location.x+','+row.location.y+'}');
    })
    query.on('error', error => {
         console.log(error)
         callback(error,null)
    })

    query.on('end', result => {
        client.end()
        callback(null, data)
    })
}
/*

	client:    "value", request for any map ?
	client: 	request for location
 
	server: 	1)request for near estates select name, location from estate where ..
	server: 		.then request for photos and estate descriptions
						.then serve data to client
	server: 		.then attach marker list to googlemap request
						.then serve picture to client
	server: 	request for map picture




*/