const users = require("../model/userModel");
const jwt = require('jsonwebtoken')

//register
exports.register=async(req,res)=>{
    //logic
    console.log('inside register');
    const {username,email,password}=req.body
    console.log(username,email,password);

    try{
        const existinguser=await users.findOne({email})
        if(existinguser)
        {
            res.status(406).json('user aleady exist')
        }
        else{
            const newUser=new users({
                username,
                email,
                password,
                profile:'',
                github:'',
                linkedin:''



            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err)
    {
        res.status(401).json(err)
    }
    
    
  
    

}

//login
exports.login=async(req,res)=>{
    const {email , password}=req.body
    console.log(email,password);
    try{
        const existinguser = await users.findOne({email, password})
        if(existinguser)
        {
           
            const token=jwt.sign({userId:existinguser._id},'secretkey')
            res.status(200).json({existinguser , token})
        }
        else{
            res.status(406).json('Incorrect email id or password')
        }

    }
    catch(error){
        res.status(401).json(error)

    }
    
}

//update user profile

exports.updateUserProfileController=async(req,res)=>{
    const userId=req.payload
    const {username , email , password , profile ,github ,linkedin}=req.body
    const uploadImage=req.file?req.file.filename:profile
    
    try {
        const existinguser=await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile:uploadImage,
            github,
            linkedin

        },{new:true})

        await existinguser.save()
        res.status(200).json(existinguser)
        
    } catch (error) {
        res.status(401).json(error)
    }



}