
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

        req.user = user;
        next();
    } catch (error) {
        console.log(`Error in isUser middleware: ${error}`);
        res.redirect('/');
    }
};

export default isUser;
