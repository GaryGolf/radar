import * as config from 'config'
import * as qs from 'querystring'
import * as pg from 'pg'


const conString = config.get('PG_CON_STRING').toString()

interface Estate {name: string, location: {x: string, y: string}}

export function getNear(lat:number = 56.317530, lng: number = 44.000717, radius: number = .01 ) {

    return new Promise<Estate[]>((resolve, reject) => {

        try{
            console.log('trying to connect');
            const client = new pg.Client(conString)            
            client.connect()
            client.query('SELECT name, location FROM estate WHERE (location <-> point(' + 
                lat + ',' + lng + ')) < ' + radius, ( error, result) => {
        
                console.log('got results')
                if(error) {
                    reject(error)
                } else { 
                    const rows: Estate[] = result.rows
                    resolve(rows)
                }
                client.end()
            })
        } catch(error) { reject(error) }
    })
}



/* result

{"command":"SELECT","rowCount":30,"rows":[],
"fields":[{"name":"","tableID":16385,"columnID":1,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":84,"format":"text"},
{"name":"location","tableID":16385,"columnID":2,"dataTypeID":600,"dataTypeSize":16,"dataTypeModifier":-1,"format":"text"}],
"_parsers":[null,null],"rowAsArray":false}
}
*/         

export function savePlace(description: string, lat: string, lng: string, place_id: string): void {

    try{
        const client = new pg.Client(conString)            
        client.connect()
        client.query('INSERT INTO places (description, location, place_id) VALUES ($1, $2, $3)',[description, '('+lat+','+lng+')', place_id], ( error, result) => {
            if(error) throw error
            client.on('error', error => { console.error(error) })
            client.end()
        })
        } catch(error) { console.error(error) }

}
import { Location } from './geoservice'

interface Places {description: string, location: Location, id: string}

export function getPlacesFromDB(input: string) {

    // prepare first letter
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()

    return new Promise<Places[]>((resolve, reject) => {

        const client = new pg.Client(conString)            
        client.connect()
        client.query('SELECT description, location, place_id FROM places WHERE description LIKE \'%'+input+'%\' ORDER BY modified DESC LIMIT 5', ( error, result) => {
            if(error) reject(error)
                resolve(result.rows)
            client.end()
        })
    })
}