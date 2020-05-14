const requset=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'rishu sahu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'rishu sahu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        text:'this is help text',
        name:'rishu sahu'
    })
}) 

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'rishu',
        errormessage:'help article not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address||req.query.address.length==0){
        return res.send({
            error:'addresss must be provided'
        })
    }

    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error)
        {
           return res.send({
                error:error
            })
        }

        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send({
                location:location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })





  

    // res.send({
    //     forecast:"temperature is 40 celcius",
    //     location:"kanpur",
    //     address:req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'rishu',
        title:'404',
        errormessage:'page not found'
    })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'rishu'
//     },{
//         name:'subhash'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2> Weather updates </h2>')
// })



app.listen(3000,()=>{
    console.log('server is listening on port on 3000');
    
})
