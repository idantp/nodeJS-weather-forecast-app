const request = require('request')

const getWeather = (longitude, latitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=0d3057f494683876cb063304476d0fb3&query=' + encodeURIComponent(latitude +','+ longitude) + '&units=m'
    request({url:weatherUrl},(error, response)=>{
        let myError = undefined
        let data = undefined
        if(error){
            // Unable to connect
            myError = 'Error: Unable to connect weather service.'
            callback(myError , data);
        } else if(badOutput = JSON.parse((response).body).error){
            // Bad output
            myError = 'Error Code: ' + badOutput.code + '.\n' + badOutput.info
            callback(myError, data);
        } else{
            const respData = JSON.parse((response).body).current 
            data = ('Weather: ' + respData.weather_descriptions[0] +'.\n' + 
            'Current temp: ' + respData.temperature +'.\n' + 
            'Current humidity: ' + respData.humidity +'.\n' + 
            'Feels like: ' + respData.feelslike +'.\n'
            )
            callback(myError, data);
        }
    })
}

module.exports = getWeather