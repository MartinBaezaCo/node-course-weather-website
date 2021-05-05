const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =   'http://api.weatherstack.com/current?access_key=4da2e442245e8ef3776b6e527ab8fc42&units=m&query='+latitude+','+longitude
    request ({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback ('Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location! Coordinates not found, try another search. If this error persists, contact developer!', undefined)
        }
        else {
            callback (undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
            })
        }
        

    })
}

module.exports = forecast