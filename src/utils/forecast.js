const request = require('request');

const getForeCast = (coords, callback) => {
    var url = `https://api.darksky.net/forecast/b8c174235203feebf69f78eb1fb8bfd7/${coords}`;
    request({ url: url, json: true }, (error, response) => {
        //console.log(response.body);
        if (error) {
            return callback('unable to connect weather service')
        } else if (response.body.error) {
            return callback(response.body.error);
        } else {
            var temperature = (response.body.currently.temperature - 32) * (5 / 9)
            callback(undefined, response.body.daily.data[0].summary +
                ' It is currently ' + temperature.toFixed(1) + "°C degrees out." +
                ' So there are ' + response.body.currently.precipProbability + '% chances to rain'
            );
        }
    });
}

module.exports = getForeCast;