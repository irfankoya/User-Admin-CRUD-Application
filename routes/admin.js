import express from "express"
const adminRouter = express.Router()
import {adminLogin, adminLoginPost , adminDashboard, adminlogout} from '../controller/adminController/adminController.js'
import{createUserPost,editUser, editUserPost,createUser,deleteUser} from '../controller/adminController/dashboardController.js'
import adminMiddleware from '../middleware/admin.js'

adminRouter.get("/",adminLogin)
adminRouter.post('/',adminLoginPost)
adminRouter.get ('/dashboard/',adminMiddleware, adminDashboard )

adminRouter.get('/logout',adminlogout)


// adminRouter.get("/edit-user",dashboard)
adminRouter.get("/createUser",adminMiddleware,createUser)
adminRouter.post("/createUser",createUserPost)
adminRouter.get("/editUser/:id",adminMiddleware,editUser)
adminRouter.post("/editUser/:id",adminMiddleware,editUserPost)
adminRouter.get("/deleteuser/:id",deleteUser)


export default adminRouter
