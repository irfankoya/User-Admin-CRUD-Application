import collection from "../model/userSchema.js";

const login = (req, res) => {
  try {
    res.render("user/login", { title: "Login Page" });
  } catch (error) {
    console.log(`error while render login page ${error}`);
  }
};

const loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await collection.findOne({ email });
    if (user && user.password === password) {
      req.session.user ={
        id: user._id,
      }
      console.log(req.session.user);
      res.redirect("/home");
    } else {
      req.flash("alert", "invalid credentials");
      res.redirect("/");
    }
  } catch (error) {
    console.log(`error while login post ${error}`);
  }
};

const signup = (req, res) => {
  try {
    res.render("user/signup", { title: "Signup" });
  } catch (error) {
    console.log(`error while signup page render ${error}`);
  }
};

const signuppost = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  const data = {
    username,
    email,
    password,
  };console.log(data)
  try {
    await collection.insertMany([data]);
    res.redirect("/");
  } catch (err) {
    console.error("error insering the data", err);
    res.status(500).send("Try later");
  }
};

const home = (req, res) => {
  try {
    res.render("user/homepage", { title: "home page"});
  } catch (error) {
    console.log(`Error while home page render ${error}`);
  }
};

const logout = (req,res)=>{
  try{
    req.session.destroy((err)=>{
      if(err){
        console.log("Error while Logout")
      }else{
        res.redirect("/")
      }
    })
  }catch(error){
    console.log(`Something went ${error}`)
  }
}
const forget = (req,res)=>{
  try{
    res.render('user/forget',{title:"Idiot"})

  }catch(error){
    console.log(`Error while forgetting ${error}`)
  }
}       

export { login, loginpost, home, signup, signuppost, logout, forget};
