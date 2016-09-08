"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const config = require('config');
const pg = require('pg');
class Estate {
    constructor() {
        const conString = config.get('PG_CON_STRING').toString();
        try {
            this.client = new pg.Client(conString);
            console.log('db.client connected');
        }
        catch (error) {
            console.log('DB connection error: ' + error);
        }
    }
    getNear(lat = 56.317530, lng = 44.000717, radius = .01) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    console.log('trying to connect');
                    this.client.connect();
                    this.client.query('SELECT name, location FROM estate WHERE (location <-> point(' + lat + ',' + lng + ')) < ' + radius, (error, result) => {
                        console.log('got results');
                        if (error)
                            reject(error);
                        else
                            resolve(result);
                        this.client.end();
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Estate;
/* result

{"command":"SELECT","rowCount":30,"rows":[],
"fields":[{"name":"","tableID":16385,"columnID":1,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":84,"format":"text"},
{"name":"location","tableID":16385,"columnID":2,"dataTypeID":600,"dataTypeSize":16,"dataTypeModifier":-1,"format":"text"}],
"_parsers":[null,null],"rowAsArray":false}
}
*/ 
