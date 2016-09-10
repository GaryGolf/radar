"use strict";
const geoservice_1 = require('./geoservice');
console.log('test');
// getMap('Звезд').then( location => {
//     console.log(location)
// }).catch(error => {
//     console.log('Some error occured during map request.')
// })
geoservice_1.getMapImage({}).then(buffer => {
    console.log(buffer);
}).catch(error => { console.error(error); });
