
import { getPlace, getLocation, getMap, getMapImage } from './geoservice'


console.log('test')

// getMap('Звезд').then( location => {

//     console.log(location)

// }).catch(error => {

//     console.log('Some error occured during map request.')

// })

getMapImage({}).then(buffer => {

    console.log(buffer)

}).catch(error => { console.error(error) })
