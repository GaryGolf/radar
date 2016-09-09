import * as request from 'request'
import * as qs from 'querystring'
import * as config from 'config'

const API_KEY = config.get('API_KEY')
const CTR = config.get('autocomplete.constraints')

export default class Search {

    constructor() { }

    printTitle(): void {
        console.log('Google maps locations autocomplete service .')
    }
}