"use strict";
const config = require('config');
const pg = require('pg');
const conString = config.get('PG_CON_STRING').toString();
const client = new pg.Client(conString);
function getNear(lat = 56.317530, lng = 44.000717, radius = .01) {
    return new Promise((resolve, reject) => {
        try {
            console.log('trying to connect');
            client.connect();
            client.query('SELECT name, location FROM estate WHERE (location <-> point(' +
                lat + ',' + lng + ')) < ' + radius, (error, result) => {
                console.log('got results');
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
                client.end();
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getNear = getNear;
/* result

{"command":"SELECT","rowCount":30,"rows":[],
"fields":[{"name":"","tableID":16385,"columnID":1,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":84,"format":"text"},
{"name":"location","tableID":16385,"columnID":2,"dataTypeID":600,"dataTypeSize":16,"dataTypeModifier":-1,"format":"text"}],
"_parsers":[null,null],"rowAsArray":false}
}
*/ 
