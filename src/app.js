const path = require('path')
// contains a single function
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express configurations
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set handlebars engine, views location for express
// config partials path for hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve static assets directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Idan'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About page',
        name: 'Idan'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Idan'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Idan',
        message: 'Help page not found.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        // address param is empty
        return res.send({
            error: 'Please insert address.'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        getWeather(longitude, latitude, (error, weatherData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: weatherData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Idan',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(chalk.bgGreen('Server is up using port: ' + port));
})