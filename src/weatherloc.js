const request = require ('request')


const coords = (locale, callback) => {
const coordslink = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + locale + '.json?&limit=1&access_token=pk.eyJ1Ijoiam9obm11c2siLCJhIjoiY2tqa3dkc3M0MDZ1MDMwbjhibWF4aW14aiJ9.XTYhSdDVcCPQd7Zzbo7Ckg'

request({url:coordslink,json:true}, (error, response) => {
//return console.log(response.body.success)

    if(error)  {
    console.log("There is some kind of network problem")
    callback(error, undefined)
}
    else if (response.body.features.length===0)  {  
    
    console.log("Apparently the address you typed is not valid")
     
  callback(response.body, undefined) 
}
    else 
    
    {
    //console.log(locale)
    //console.log(response.body.features[0].bbox[2])
    //const longitude = response.body.features[0].center[0]
    //const latitude = response.body.features[0].center[1]
    //console.log(longitude + "," + latitude)
    //return longitude

    //console.log(response.body)


        const {center, place_name} = response.body.features[0]

    callback(undefined, {
                            longitude:center[0],   
                            latitude:center[1],
                            location:place_name
                        })


}
    
})
}



const forecast=(location5, callback) =>  {

    //console.log(longitude + "," + latitude)

    const url = 'http://api.weatherstack.com/current?access_key=bf540d368d2527172c3eb446b8687f23&query=' + location5 + '&units=f'
    
    console.log(":The URL is " + url)
    
    request({url:url,json:true}, (error,response) => {

        
    
    if(error)  {
        callback("There is some kind of network problem", undefined)
    }
    else if(response.body.success === false) 
        {
       callback("Something is wrong with the location and it needs to be fixed", undefined) 
    }
    else {
        //callback(undefined, name + ", " + region + ". " + weather_descriptions[0] + ".  The current temperature is  " + temperature + " degrees."  + "  It feels like " + feelslike + " degrees.")
        const {name, region} = response.body.location
        const {temperature, feelslike, weather_descriptions} = response.body.current
        
               
        callback(undefined, {
                                City: name,
                                State: region,
                                Weather: weather_descriptions[0],
                                Temperature: temperature 


        }) 
          
        }
    })
    }     












module.exports = {
    
    forecast:forecast,
    coords:coords
}
