const http = require('http')

function main(){
	http.get('http://images-mediawiki-sites.thefullwiki.org/04/1/7/5/6204600836255205.png', (res) => {
  		console.log(`Got response: ${res.statusCode}`);
 		 // consume response body
  	res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  	})
	}).on('error', (e) => {
  		console.log(`Got error: ${e.message}`);
	});
}
//module.export = main()

main()