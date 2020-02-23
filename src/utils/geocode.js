const request = require('request');

const geoCode = (address, callback = () => { }) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3VkaGVlci1rbCIsImEiOiJjazZ0ZXNubzkwNm05M2dwNXlvY2Q1Zm5nIn0.p-UsTaX5elwjGxQPyS-Y6g&limit=1`;
    request({ url: url, json: true }, (error, response) => {
        debugger;
        if (response != undefined) {
            if (response.body.message != undefined) {
                callback(response.body.message, undefined);
                return
            } else if (response.body.features.length == 0) {
                callback("No location found, pls try another...", undefined);
                return;
            } else {
                const coords = (response.body.features[0].center.reverse().join(','));
                console.log(coords);
                console.log(response.body.features[0].place_name);
                if (callback != undefined) {
                    callback(undefined, {
                        coords: coords,
                        place: response.body.features[0].place_name
                    });
                }
            }
        } else {
            console.log(error);
        }
    });
}

module.exports = geoCode;