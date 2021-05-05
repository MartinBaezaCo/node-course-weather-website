const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
const { query } = require('express')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

console.log(partialsPath)

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Martin Baeza',
        text: 'Use this site to get your weather'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Martin Baeza'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        text: 'This is the help page',
        name: 'Martin Baeza'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide a search term!',
        })
     }
    
     geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if (error) {
            return res.send ({
             error,
            })
        }
    
        forecast(latitude,longitude, (error, {description, temperature, feelslike, humidity} = {}) => {
            if (error) {
                return res.send({
                error,
                })
            }
            
            res.send ({
                location,
                name: 'Martin Baeza',
                description,
                temperature,
                feelslike,
                humidity,
            })
            
            
        })
    })




    // res.send({
    //     forecast: 'frio',
    //     location:'São Paulo',
    //     address: req.query.address
    // })
})





app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }
    console.log(req.query)
    res.send({
        products: [req.query]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: 'Ooooops.. 404',
        text: 'Help article not found!',
        name: 'Martin Baeza'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: 'Ooooops.. 404',
        text: 'Page not found!',
        name: 'Martin Baeza'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})