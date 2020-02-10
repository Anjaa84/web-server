const request = require('request')


const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/ee3d22e9ed7c85d714cad15eda2573b8/'+longitude+','+latitude

    request ({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        } else if (response.body.error){
            calllback('Unable to find location',undefined)

        } else{
            callback(undefined,response.body.daily.data[0].summary + ' It is currently ' +
                     response.body.currently.temperature + ' degrees out. There is a ' +
                     response.body.currently.precipProbability + '% chance of rain')

        }

    })


}


module.exports = forecast