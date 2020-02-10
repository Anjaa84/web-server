const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Anjanan '

    })
})
 
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anjanan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Anjanan',
        msg:'Aandava ena kaapathu'
    }

    )
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })

    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})

        } 
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'It is hot',
    //     location:'Colombo',
    //     address:req.query.address 
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products:[]
    })


})



app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title:'404 error',
        name:'Anjanan',
        errorMsg:'Help artice not found'
        
    })
})


app.get('*',(req,res)=>{
    res.render('404error',{
        title:'404 error',
        name:'Anjanan',
        errorMsg:'Page not found'
        

    })
})



//app.com
//app.com/about
//app.com/help

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})