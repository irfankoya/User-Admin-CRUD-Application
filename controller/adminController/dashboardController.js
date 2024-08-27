import collection from "../../model/userSchema.js";


const editUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const userData = await collection.findById(userID);
    res.render("admin/editUser", {
      title: "Edit User",
      alertMessage: req.flash("alert"),
      userData  
    });
  } catch (err) {
    console.log(`Theres some Error ${err}`);
  }
};
//edit User Post
const editUserPost = async (req, res) => {
  try {
    const userID = req.params.id;
    const updateUser = await collection.findByIdAndUpdate(userID, {
      username: req.body.editName,
      email: req.body.editMail,
    },
    { new: true, runValidators: true }
);
    if (updateUser === undefined) {
      req.flash("alert", "User Update Error");
      res.redirect("/admin/dashboard");
    }
    req.flash("alert", "User data Updated");
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(`Error while user Updation${error}`);
  }
};
// create user render
const createUser = async (req, res) => {
  try {
    res.render("admin/addUser", {
      title: "Add User",
      alertMessage: req.flash("alert"),
    });
  } catch (error) {
    console.log(`Something Error occured ${error}`);
  }
};

//create and save new user
const createUserPost = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const checkUserExist = await collection.find({ email: req.body.email });
    if (checkUserExist.length == 0) {
      await collection.insertMany(user);
      req.flash("alert", "User added successfully");
      res.redirect("/admin/dashboard");
    } else {
      req.flash("alert", "User already exists");
      res.redirect("/admin/createUser");
    }
  } catch (err) {
    console.log(`Error while inserting new user ${err}`);
    req.flash("alert", "An error occurred");
    res.redirect("/admin/createUser");
  }
};

// delete User
const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const deleteUser = await collection.findByIdAndDelete(userID);
    if (deleteUser === undefined) {
      req.flash("alert", "Not able to delete");
      res.redirect("/admin/dashboard");
    } else {
      req.flash("alert", "Deleted");
      res.redirect("/admin/dashboard");
    }
  } catch (error) {
    console.log(`Something error occured ${error}`);
  }
};

export {
  // dashboard,
  createUserPost,
  editUser,
  editUserPost,
  createUser,
  deleteUser,
};
