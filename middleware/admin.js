import dotenv from 'dotenv'
dotenv.config()

function adminMiddleware(req,res,next){
    try{
        if(req.session.admin){
            next()
        }else{
            res.redirect("/admin")
        }
    }catch(error){
        console.log(`eroor while inn admin middleware ${error}`)
    }


}
export default adminMiddleware

