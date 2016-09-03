var pg = require('pg');
var config = require('config')

var conString = config.get('PG_CON_STRING')


var client = new pg.Client(conString)
client.connect()

//queries are queued and executed one after another once the connection becomes available
// var x = 1000;

// while (x > 0) {
//     client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
//     client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
//     x = x - 1;
// }

var query = client.query('SELECT name, location FROM estate WHERE (location <-> point(56.317530,44.000717)) < 0.01')


 //fired after last row is emitted

query.on('row', function(row) {

    console.log(row.name+'  {'+row.location.x+','+row.location.y+'}');
})

query.on('end', function(result) {

    client.end()
})
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