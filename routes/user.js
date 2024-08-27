import express from "express";
const router = express.Router();
import {
  login,
  loginpost,
  signup,
  signuppost,
  home,
  logout,
  forget
} from "../controller/userController.js";
import isUser from "../middleware/user.js";

router.get("/", login);
router.post("/login", loginpost);

router.get("/signup", signup);
router.post("/signup", signuppost);
router.get('/forget',forget)

router.get("/home", isUser, home);
router.get('/logout',logout )

// router.get("/welcome/:username/:age",function(req,res){
//   res.send(`Welcome,${req.params.username}, I hope you are ${req.params.age} years old`)
// })  

export default router;
