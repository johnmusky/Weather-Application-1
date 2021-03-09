const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require ('request')
const forecast = require ('./weatherloc.js')
const coords = require ('./weatherloc.js')
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(publicDirectoryPath)


const app = express()
const port=process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.get('', (req,res) => {
res.render('index',{

    name:'Muck Sucker',
    title:'totally useless',
    phrase:'dunken mackdown muncher'
    
})

})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'HELP ME',
        name: 'Johnny Musko'
    })
    
    })

app.get('/about', (req,res) => {
    res.render('about', {
        title:'ABOUT PAGE',
        name: 'THE SCARLET WITCH'

    })
        
        })  
        
/
app.get('/weather', (req,res) => {
    if(!req.query.address) 
        return res.send({
         
            Error:  "You must provide an address"
        })
      
        coords.coords(req.query.address, (error, data) => {
                //return res.send(req.query.address)
            //res.send(error)
            //res.send('Data', data)
           // console.log(data)
           
           
           //res.send("You better check the name of your town")
            if (error) return res.send(error)


                //return console.log("Something is wrong with your address")    
                //return res.send("The address you provided is not valid")
                //if (!data.location)  return  res.send("The address is messed up. try again")
        
            forecast.forecast(data.location, (error, forecastData) => {
              
                //if(!data.location)   res.send("It looks like the data is bad")
                //   res.send('Error', error)
              

                res.send(forecastData)
             })
            
        }


    
        
          
        )
            
            }) 
app.get('/help/*', (req,res) => {
    res.render("error", {
        name:"The Great Oxen Bohemia", 
        title:"THIS HELP PAGE DOES NOT EXIST",
        message:"THIS LOCATION IS NOT A KNOWN HELP PAGE.  PLEASE USE A KNOWN HELP PAGE"

    }
    )
                     })            

app.get('*', (req,res) => {
    res.render('error',{
            name:"The Great Oxen Bohemia",
            title:"THIS PAGE DOES NOT EXIST",
            message:"THIS LOACTION IS UNKNOWN.  PLEASE USE A KNOWN LOCATION" 

    })
         })


app.listen(port, () => {
console.log('The Server is Running')

})






