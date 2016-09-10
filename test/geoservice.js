"use strict";
const request = require('request');
const config = require('config');
const API_KEY = config.get('API_KEY');
const CTR = config.get('autocomplete.constraints');
const opts1 = {
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    qs: {
        location: '56.296504,43.936059',
        radius: '1000',
        language: 'ru',
        key: API_KEY,
        types: ['route'],
        input: ''
    },
    headers: { 'User-Agent': 'request' }
};
const opts2 = {
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/place/details/json',
    qs: { key: API_KEY, placeid: ' ' },
    headers: { 'User-Agent': 'request' }
};
function getPlace(input) {
    let data = [];
    return new Promise((resolve, reject) => {
        opts1.qs.input = input;
        request(opts1, (error, response, body) => {
            let info;
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode != 200) {
                reject('status: ' + response.statusCode);
                return;
            }
            try {
                info = JSON.parse(body);
            }
            catch (e) {
                reject(e);
                return;
            }
            if (info.status != 'OK') {
                reject('status: ' + info.status);
                return;
            }
            // new array of place descriptions
            data = info.predictions.map(item => {
                return { description: item.description, id: item.place_id };
            }).filter(obj => CTR.some(place => obj.description.indexOf(place) > 0));
            // filter items remove all outside by autocomplete.constraints 
            resolve(data);
            console.log('status: ' + info.status);
        });
    });
}
exports.getPlace = getPlace;
function getLocation(input) {
    return new Promise((resolve, reject) => {
        opts2.qs.placeid = input;
        request(opts2, (error, response, body) => {
            let data;
            if (!error && response.statusCode == 200) {
                try {
                    data = JSON.parse(body);
                    if (data.status == 'OK') {
                        const lat = data.result.geometry.location.lat;
                        const lng = data.result.geometry.location.lng;
                        resolve({ lat, lng });
                        console.log('status: ' + data.status);
                    }
                    else {
                        reject('status: ' + data.status);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }
            else {
                reject('HTTPstatus: ' + response.statusCode);
            }
        });
    });
}
exports.getLocation = getLocation;
function getMap(input) {
    return new Promise((resolve, reject) => {
        getPlace(input).then(places => {
            getLocation(places[0].id).then(location => {
                resolve(location);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });
}
exports.getMap = getMap;
/*
    @returns base64 image of gle map according options
    @param options object contains size, geoocation lat long or name of the place
    @callback error, buffer (could be null)

    Google Static Maps API URLs are restricted to 8192 characters in size

*/
const Jimp = require('jimp');
function getMapImage(options) {
    return new Promise((resolve, reject) => {
        const uri = 'http://maps.googleapis.com/maps/api/staticmap';
        // const url = uri +'?'+ qs.stringify(options)
        const url = './test/staticmap.png';
        Jimp.read(url).then(image => {
            const height = image.bitmap.height - Number(options.scale) * 22;
            const width = image.bitmap.width;
            image.crop(0, 0, width, height).getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                resolve(buffer);
            });
        }).catch(error => {
            console.error(error);
            reject(error);
        });
    });
}
exports.getMapImage = getMapImage;
