const multer=require('multer')

//The disk storage engine gives you full control on storing files to disk.

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{

        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}` //now(): number
        //Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        callback(null,filename)
        
        
    }
})

//file filter

const filefilter=(req,file,callback)=>{
    if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg")
    {
        callback(null,true)
    }
    else
    {
        callback(null,false)
        return callback(new Error('only png , jpg ,jpeg files are accepted'))
    }
}

//multer configuration

const multerConfig=multer({
    storage,
    filefilter
})

//exports

module.exports=multerConfig