// import collection from "./model/mongo";

// const login = (req, res) => {
//   try {
//     res.render("/user/login", { title: "Login Page" });
//   } catch (error) {
//     console.log(`The Page can't be rendered ${error}`);
//   }
// };
// const loginpost = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await collection.findOne({ email });
//     if (user && user.password === password) {
//       req.session.user = user._id;
//       console.log(req.session.user);
//       res.redirect("/homepage", { title: "Home Page" });
//     } else {
//       res.redirect("/");
//     }
//   } catch (error) {
//     console.log(`Somrthing wrong ${error}`);
//   }
// };

// const signup = (req, res) => {
//   try {
//     res.render("user/signup", { title: "Sign Up" });
//   } catch (error) {
//     console.log(`Something Went Wrong ${error}`);
//   }
// };
// const signuppost = async (req, res) => {
//   const { username, email, password } = req.body;
//   const data = {
//     username,
//     email,
//     password,
//   };
//   try {
//     await collection.insertMany([data]);
//     res.redirect("/");
//   } catch {
//     console.log(`Something Went Wrong ${error}`);
//   }
// };

// export { login, loginpost, signup, signuppost };
