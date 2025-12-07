import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected successfully")
    }catch(err){
        console.log("Error connecting to mongodb" , err)
        process.exit(1) //exit with failure
    }
}