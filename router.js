//express
const express =require('express')

const userController=require('./controllers/userController')
const projectController=require('./controllers/projectController')


//intance router
const router=express.Router()
//register

//import jwtmiddleware
const jwtMiddleware=require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add project
router.post('/add-project',jwtMiddleware,multerConfig.single("projectimage"),projectController.addProjectController)

//get all project
router.get('/all-project',jwtMiddleware,projectController.getAllprojectController)

//get home project
router.get('/home-project',projectController.getHomeprojectController)

//get user project
router.get('/user-project',jwtMiddleware,projectController.getUsersprojectController)

//delete user project
router.delete('/delete-userproject/:id',jwtMiddleware,projectController.deleteUserProjectController)

//update user project
router.put('/update-userproject/:id',jwtMiddleware,multerConfig.single("projectimage"),projectController.editUserProjectController)

//update userprofile
router.put('/update-userprofile',jwtMiddleware,multerConfig.single("profile"),userController.updateUserProfileController)

module.exports=router