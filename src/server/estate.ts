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

export function savePlace(place: Place) {

    return new Promise<string>((resolve, reject) => {
        const client = new pg.Client(conString)            
        client.connect()
        client.query('INSERT INTO places (description, location, place_id) VALUES ($1, $2, $3)',
            [place.description, '('+place.location.lat+','+place.location.lng+')', place.id], ( error, result) => {
            if(error) reject(error)
            if(result) resolve('OK')
            client.end()
        })
    })
}

import { Location, Place } from './geoservice'

export function getPlacesFromDB(input: string) {

    // prepare first letter
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()

    return new Promise<Place[]>((resolve, reject) => {

        const client = new pg.Client(conString)            
        client.connect()
        client.query('SELECT description, location, place_id FROM places WHERE description LIKE \'%'+input+'%\' ORDER BY modified DESC LIMIT 5', ( error, result) => {
            if(error)   reject(error)
            if(result)  {
                resolve(result.rows.map(place => {
                    const location: Location = {lat: place.location.x, lng: place.location.y}
                    const description: string = place.description
                    const id: string = place.place_id
                    return { id, description, location }
                }))
            }
            client.end()
        })
    })
}

export function isAddressExist(input: string) {

    return new Promise<boolean>((resolve, reject) => {
        
        const client = new pg.Client(conString)            
        client.connect()
        client.query('SELECT place_id FROM places WHERE description = \'' + input + '\' LIMIT 5', ( error, result) => {
            if(error)   reject(error)
            if(result) resolve(true)
            client.end()
        })
    })
}

export function popPlace(input: string) {

    return new Promise<string>((resolve, reject) => {

        const client = new pg.Client(conString)
        client.connect()
        client.query('UPDATE places SET modified = LOCALTIMESTAMP WHERE description = \'' + input + '\'', (error, result) => {
            if(error) reject(error)
            if(result) { 
                resolve('OK')
            }
            client.end() 
        })
    })
}