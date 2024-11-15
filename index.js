//dotenv
require('dotenv').config()

//express

const express=require('express')


//import cors
const cors =require('cors')

//import router
const router=require('./router')

//import connection
require('./connection')

//create server using express() method
const pfServer=express()

//serving using cors
pfServer.use(cors())

//parse the data -middleware-parse the data
pfServer.use(express.json())

//use router
pfServer.use(router)

//exporting upload folder
pfServer.use('/upload',express.static('./uploads'))

//port
const PORT = 4001 || process.env.PORT
//listen
pfServer.listen(PORT,()=>{
    console.log(`server is running at port number ${PORT}`);
    
})

//get



/*  pfServer.get('/',(req,res)=>{
    res.send('get request received')
})


 pfServer.put('/',(req,res)=>{
    res.send('put request received')
})

 pfServer.delete('/',(req,res)=>{
    res.send('delete request received')
})


pfServer.post('/',(req,res)=>{
    res.send('post request received')
})
 */