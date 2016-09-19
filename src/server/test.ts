
import { Location, getPlace, getLocation, getMap, getMapImage } from './geoservice'

import { getNear, savePlace } from './estate'

console.log('test')

// getMap('Звезд').then( location => {

//     console.log(location)

// }).catch(error => {

//     console.log('Some error occured during map request.')

// })


// getNear(56.3162757,43.9973229).then(result => {
//     const rows = result.rows
//     console.log(rows)
// }).catch(error => { console.error(error) })

// read file streets txt

import * as fs from 'fs'

let list: string[]
var i: number = 0
// read streets.txt into array list
fs.readFile('./config/streets.txt', 'utf8', (error, data) =>{
    if(error) {
        console.error(error)
        return
    }

    // import data to array
    list = data.split('\n')

    
    setInterval(() => {
        if(i> 1334) {
            console.log('Thats all, perss Ctrl C') 
            return
        }
        testSave(list[i++])
    },1000)
    
})

function testSave(street: string): void {
    // looking for place_id from google service
    getPlace(street).then( (data: any[]) => {

        let id = data[0].id
        let description = data[0].description
        let location: Location

        // finding geocode 

        getLocation(id).then( (data: Location) => {

            location = data
            
            // save places to db
            console.log(id)
            console.log(description+'    '+location)
            try{ 
                savePlace( description, location.lat, location.lng, id)
               // savePlace( street+', Нижний Новгород', location.lat, location.lng, id)
            } catch (error) {
                console.log('have got error from db')
                console.error(error)
            }

        }).catch(error => { console.error(error) })
    }).catch( error => { console.error(error) })
}

// console.log()