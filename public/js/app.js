//const { response } = require("express")




            const weatherform = document.querySelector('form')
            const search = document.querySelector('input')
            const p1 = document.querySelector('#firstp')
            const p2 = document.querySelector('#secondp')
            const toptop = document.querySelector('#top')
            weatherform.addEventListener("submit", (e)=>{
                e.preventDefault()
                //console.log("testing")
                //console.log(toptop)
            
                const location = search.value  
                

                p2.textContent=''
                p1.textContent='Waiting for weather request'


                fetch('/weather?address=' + location)
                //fetch('http://localhost:3000/weather?address=' + location)
                .then((response) => {
                response.json().then((data) => {
                //console.log(data)

                    if(data.error) {
                    p2.textContent='error'      

            }
                    else{
                        //console.log("City :" + data.City)
                        //console.log("State :" + data.State)
                        //console.log("Weather :" + data.Weather)
             p2.textContent=(" City is:  " + data.City + ".  State is: " + data.State + ".  Weather is: " + data.Weather)


                        }

                        p1.textContent=""

            
            //console.log(location) 

        })
            




            //if(!data) {
                //send("There is an error")
                //}
               // else {
                
              //  document.write("<p>City:"  + data.location.name + "</p>")    
               // document.write("<p>State:"  + data.location.region + "</p>") 
               // document.write("<p>Weather:" + data.current.weather_descriptions[0])
               
                        
    
    
    
        })


})




