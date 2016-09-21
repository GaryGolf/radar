
import { Location, getPlace, getLocation, getMap, getMapImage } from './geoservice'

import { getNear, savePlace, getPlacesFromDB, isAddressExist, popPlace } from './estate'

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

/*

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

    
    setInterval(async () => {
        if(i > list.length) {
            console.log('Thats all, perss Ctrl C') 
            return
        }
        await testSave(list[i++])
    },1000)
    
})



async function testSave (street: string) {

    let id: string
    let description: string
    let location: Location

    try {
        
        const places = await getPlace(street)

        // if(!places || places.length == 0 ) return

        id = places[0].id
        description = places[0].description
        console.log(description)

        location = await getLocation(id)
        // if(!location) return
        console.log(JSON.stringify(location))

        var status = await savePlace({id, description, location})
        console.log(status)

     } catch(error) {
         console.error(error)
     }
}

*/
async function test() {

    const street = 'Минеральная улица, Нижний Новгород'
    try {
       var boo =  await isAddressExist(street)
       console.log('exist '+ boo)
       var foo = await popPlace(street)
       console.log('update status:'+ foo)
    } catch (error) {
        console.error(error)
    }
}

test()
