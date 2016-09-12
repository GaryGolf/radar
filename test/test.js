"use strict";
const estate_1 = require('./estate');
console.log('test');
// getMap('Звезд').then( location => {
//     console.log(location)
// }).catch(error => {
//     console.log('Some error occured during map request.')
// })
estate_1.getNear(56.3162757, 43.9973229).then(result => {
    const rows = result.rows;
    console.log(rows);
}).catch(error => { console.error(error); });
