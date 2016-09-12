import * as config from 'config'
import * as qs from 'querystring'
import * as pg from 'pg'



export default class Bmap {

    private client: pg.Client
    
    constructor() {

        const conString = config.get('PG_CON_STRING').toString()
        try {
            this.client = new pg.Client(conString)
        } catch(error) {
            console.log('DB connection error: ' + error)
        }
    }

    async getResponse() {
       const i: pg.QueryResult = await this.getNearEstates()
       console.log('waited for  ' + i +'  sry.')
    }

    public async getNearEstates() {

        const lat: number = 56.317530
        const lng: number = 44.000717 

     //   this.client.connect()
       // const query = this.client.query('SELECT name, location FROM estate WHERE (location <-> point('+lat+','+lng+')) < 0.1')

        return new Promise<pg.QueryResult>((resolve, reject) => {
           

            try{

                this.client.connect()
                this.client.query('SELECT name, location FROM estate WHERE (location <-> point('+lat+','+lng+')) < 0.1', ( error, result) => {
                  
                    if(error) reject( error )
                  
                    resolve( result )
                    this.client.end()
                })
            } catch (error) {

                console.log( error )
                reject(error)
            }
        })
    }
}

/*
var conString = config.get('PG_CON_STRING')


var client = new pg.Client(conString)

exports.nearEstates = (lat, lng, callback) => {
    
    var data = new Array()
    
    client.connect()
    // 'SELECT name, location FROM estate WHERE (location <-> point(56.317530,44.000717)) < 0.01'
    var query = client.query('SELECT name, location FROM estate WHERE (location <-> point('+lat+','+lng+')) < 0.1')

    //fired after last row is emitted

    query.on('row', row => {

        data.push(row)
        //console.log(row.name+'  {'+row.location.x+','+row.location.y+'}');
    })
    query.on('error', error => {
         console.log(error)
         callback(error,null)
    })

    query.on('end', result => {
        client.end()
        callback(null, data)
    })
}
*/
