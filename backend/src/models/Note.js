import mongoose from "mongoose";

//1. Create schema
const noteSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    content:{
        type: String,
         required:true
    },

    
},{
    timestamps: true //mongodb by default gives createdAt, updatedAt fields 
})

//2.create model based on schema

const  Note = mongoose.model("Note", noteSchema)

export default  Note