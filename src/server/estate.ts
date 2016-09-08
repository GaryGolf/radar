import * as config from 'config'
import * as qs from 'querystring'
import * as pg from 'pg'



export default class Estate {

    private client: pg.Client
    
    constructor() {

        const conString = config.get('PG_CON_STRING').toString()
        try {
            this.client = new pg.Client(conString)
            console.log('db.client connected')
        } catch(error) {
            console.log('DB connection error: ' + error)
        }
    }

    async getNear(lat:number = 56.317530, lng: number = 44.000717, radius: number = .01 ) {


        return new Promise<pg.QueryResult>((resolve, reject) => {

            try{
                console.log('trying to connect');
                
                this.client.connect()
                this.client.query('SELECT name, location FROM estate WHERE (location <-> point(' + lat + ',' + lng + ')) < ' + radius, ( error, result) => {
         
                    console.log('got results')
                    if(error) reject( error )
                    else resolve( result )
                    this.client.end()
                })

            } catch (error) {

                reject(error)
            }

           
        })
    }
}


/* result

{"command":"SELECT","rowCount":30,"rows":[],
"fields":[{"name":"","tableID":16385,"columnID":1,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":84,"format":"text"},
{"name":"location","tableID":16385,"columnID":2,"dataTypeID":600,"dataTypeSize":16,"dataTypeModifier":-1,"format":"text"}],
"_parsers":[null,null],"rowAsArray":false}
}
*/         