const request=require('request')



const forecast=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=0a3ea37da13ed43779284feabf67d018&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=m`
   request({url,json:true},(error,{body})=>{
       if(error){
           callback('unable to connect to service',undefined)
       }else if(body.error){
           callback(body.error.info,undefined)
       }
       else {
          // const data=response.body.current
           const {temperature,precip,weather_descriptions:desc}=body.current
           callback(undefined,`current temperature: ${temperature}  and chance of rain is: ${precip} and weather description: ${desc[0]}`)
       }
   })
    
}

module.exports=forecast




