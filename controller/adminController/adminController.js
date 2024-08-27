import userSchema from "../../model/userSchema.js";

const adminLogin = (req, res) => {
  try {
    res.render("admin/Login", { title: "Admin Login" });
  } catch (error) {
    console.log(`The user is not found ${error}`);
  }
};
const adminLoginPost = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      req.session.admin = true;
      res.redirect("/admin/dashboard");
    } else {
      res.render('admin/Login', { title: "Admin Login", errorMessage: "Invalid username or password" })  
    }
  } catch (error) {
    console.log(`Something went Wrong ${error}`);
    res.render('admin/Login', { title: "Admin Login", errorMessage: "An error has occured" })
  }
};

const adminDashboard = async (req, res) => {
  try {
    const  user  = req.query.search || ""
    const userDetails = await userSchema.find({username: { $regex: user, $options: "i" }})
    if (req.session.admin) {
      res.render("admin/dashboard", { title: "Dashboard" ,userDetails});
    }
  } catch (error) {
    console.log(`error while render the dashboard ${error}`);
  }
};

const adminlogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(`Something with logout ${error}`);
    } else {
      res.redirect("/admin");
    }
  });
};

export { adminLogin, adminLoginPost, adminDashboard, adminlogout };
