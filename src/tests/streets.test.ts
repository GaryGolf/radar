/// <reference path="../../node_modules/@types/jest/index.d.ts" />

import * as fs from 'fs'
import { getPlace } from '../server/geoservice'



let streets: string[] 

describe('Cache google service test', () => {

    beforeEach(() => {

        // read streets.txt into array
        fs.readFile('./config/streets.txt', 'utf8', (error, data) =>{
            if(error) {
                console.error(error)
                return
            }

            streets = data.split('\n')
            console.log('streets counted: '+ streets.length)
        })
        console.log(streets)
        // for each street find place id
        console.log('serachin for ' + streets[55])
        getPlace(streets[55]).then( data => {
            
            console.log(data)

        }).catch(error => { console.error(error) })
    })

  it('reads file streets.txt', () => {
    
   

  })
})
  

