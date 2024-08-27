// import userschema from "../model/mongo"


    // import collection from "../model/userSchema.js"


    // async function userMiddleware(req,res,next){
    // try{
    //     const userId =req.session.user
    // const user = await collection.findById(userId)
    // if(user){
    //     next();
    // }else{
    //     res.redirect("/")
    // }
    // }catch(error){
    //     console.log(`error in user middleware ${error}`)
    // }
    // }

    // export default userMiddleware

    import { ObjectId } from "mongodb";
import collection from "../model/userSchema.js";

const isUser = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/');
        }

        const userId = req.session.user.id;
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.redirect('/');
        }

        req.user = user; // Attach user object to request for later use
        next();
    } catch (error) {
        console.log(`Error in isUser middleware: ${error}`);
        res.redirect('/');
    }
};

export default isUser;
