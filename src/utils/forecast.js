const request = require('request')

const forecast =(la , lo , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7624340604ba3b6d71b1e704f71d57f6&query='+ la +','+ lo +'&units=m'
    request({ url, json:true}, (error,{ body })=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error){
            callback('Unable to find weather. Please try another search item!', undefined)
        }
        else 
        {
            callback(undefined, 
                body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature +' degrees out. It feels like '+body.current.feelslike +' degrees out.'+
                ' The Humidity is  ' +body.current.humidity +'  Observation time is  ' + body.current.observation_time
            )
    }
    })
    
    }
   
    module.exports = forecast
