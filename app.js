import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import adminRouter from './routes/admin.js'
import router from "./routes/user.js";
import  dotenv from 'dotenv'
import flash from "connect-flash"
import nocache from "nocache"

const app = express(); // Initialize Express application
dotenv.config({path:'config.env'})

// Use __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3003;
app.use(nocache())

// Middleware for parsing request bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); // Ensure to use bodyParser for JSON requests

// Static file serving
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/assets")));

// Set up view engine and layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts); // Use expressLayouts for layouts
app.set("layout", "./layouts/layout"); // Layout path configuration

// Session middleware
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: uuidv4(), // Secret for session encryption
}));

app.use(flash())
app.use((req,res,next)=>{
  res.locals.alert = req.flash("alert");
  next()
})

// Use routes
app.use("/", router);
app.use("/admin",adminRouter )


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
