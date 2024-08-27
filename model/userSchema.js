
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/datas")
.then(function(){
    console.log("Mongo connected")
})
.catch(function(){
    console.log("Something error in Mongo");
})

const userschema=new mongoose.Schema({
    username:{
        type:String,                                                                                
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection=new mongoose.model("userdata",userschema)

export default collection