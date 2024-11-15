//import mongoose
const mongoose=require('mongoose')

connctionstring=process.env.DATABASE

mongoose.connect(connctionstring).then((res)=>{
    console.log('mongodb connected successfully');
    
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
    
})