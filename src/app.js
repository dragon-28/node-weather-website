const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { callbackify } = require('util')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../temp/views')
const partialsPath = path.join(__dirname,'../temp/partials')

// Setup handlebars engine and views engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Punitha'
    })
})

app.get('/about',(req,res) => {
    res.render('about',  {
        title: 'About Me',
        name: 'Punitha'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Page',
        name: 'Punitha'
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please Provide Address'
        })
    }
    geocode(req.query.address , (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
                res.send([{
                forecast : forecastData,
                location: location,
                address: req.query.address
           }])
        })
    })

 })

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide search term'
        })
    }
     res.send([{
        products: []
    }])
})

app.get('/help/*',(req,res) =>{
    res.render('404page',{
        title: '404page',
        name:'Punitha',
        errorMessage: 'Help Article not found'
    })

})

app.get('*',(req,res) => {
    res.render('404page',{
        title: '404page',
        name:'Punitha',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})