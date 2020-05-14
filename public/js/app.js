console.log("client side is loaded");


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message_1=document.querySelector('#message-1')
const message_2=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message_1.textContent="loading"
    const location=search.value
  //console.log(location);

    if(location.length==0)
    {
        message_1.textContent="enter your location"
        return ;
        
    }
  

    
fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           message_1.textContent=data.error;
            
        }else{
            message_1.textContent=data.location;
            message_2.textContent=data.forecast
            
            
        }
    })
})

    
})