import ratelimit from "../config/upstash.js";
const  ratelimiter = async(req,res,next)=>{


    try {
        //here rate limit is used for all users trying to use this app but when using user auth, that time use of userid to put
        //rate limit per user , one user's request won't affect another user's rate limit access 
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) {
            return res.status(429).json({message : "Too many requests, please try later"})}
          next();  
    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
}

export default ratelimiter;