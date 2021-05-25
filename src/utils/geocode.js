const request = require('request')

const geocode = (address, callback) => {
    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWRhbnRwIiwiYSI6ImNrb3k3a3Y1dzBnNWoycW1jZjVzZGRkbTIifQ.gfIFPvunTs4INjwcWteF6Q&limit=1'
    request({url:geocodingUrl}, (error, response) => {
        if(error){
            callback('Error: Unable to connect weather service.', undefined)
        } else{
            // connection to service succeeded
            const body = JSON.parse(response.body)
            if(body.features === undefined || body.features.length == 0){
                // Bad output
                callback('Error: Couldn\'t find the specific location, please enter a new one.', undefined)
            } else{
                // check
                const data = body.features[0]
                callback(undefined, {
                    location: data.place_name,
                    longitude: data.center[0],
                    latitude: data.center[1]
                })
            }
        }
    })
}

module.exports = geocode