const projects = require("../model/projectModel");


//add project
exports.addProjectController=async(req,res)=>{
    console.log('inside add project controller');


    const {title , language , github , website , overview}=req.body
    console.log(title , language , github , website , overview);

    const projectimage=req.file.filename
    console.log(projectimage);
    const userId=req.payload

    try {
        const existingproject=await projects.findOne({github})
        if(existingproject)
        {
            res.status(406).json('project already exist')
        }
        else{
            const newProject=new projects({
                title , language , github ,website , overview , projectimage , userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (error) {
        res.status(401).json('project adding failed due to', error)
        
    }
    
    
  
    

}

//get all project

exports.getAllprojectController=async(req,res)=>{
    try {
        //path parameter - req.params
        //query parameter - req.query
        const secretkey=req.query.search
        console.log(secretkey);

        const query={
            language:{
                $regex:secretkey,$options:"i"
            }
        }
        

        const allproject=await projects.find(query)
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

//get home project

exports.getHomeprojectController=async(req,res)=>{
    try {

        const allproject=await projects.find().limit(3)
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

//get users project
exports.getUsersprojectController=async(req,res)=>{
    try {
        const userId=req.payload

        const allproject=await projects.find({userId})
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}
//delete user project

exports.deleteUserProjectController=async(req,res)=>{
    const {id} = req.params
    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
        
    } catch (error) {
        res.status(401).json(error)
    }

}
//update user project
exports.editUserProjectController=async(req,res)=>{

    const {id}=req.params
    const userId=req.payload
    const {title , language ,github , website , overview , projectimage}=req.body
    const uploadImage=req.file?req.file.filename:projectimage

    try {

        const existingproject=await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectimage:uploadImage,
            userId
        },{new:true})

        await existingproject.save()
        res.status(200).json(existingproject)
        
    } catch (error) {
        res.status(401).json(error)
    }

}