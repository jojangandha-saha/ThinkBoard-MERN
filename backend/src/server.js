//package imports 
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
// const express = require("express")

//local imports
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import ratelimiter from "./middleware/rateLimitier.js";
//configure dotenv file 
dotenv.config();
console.log(process.env.MONGO_URI)
const app = express()
const __dirname = path.resolve() //pat of backend by default
const PORT = process.env.PORT || 5001


//ADDING MIDDLEWARE 
app.use(express.json()) //this middleware will parse json body response  : acess to req.body

//custom middleware
// app.use((req,res,next)=>{
// console.log(`Request method is ${req.method} & request url is ${req.url}`)
// next()
// })

//CORS config should be before ratelimiter  
//use cors only in development as in prod both frontend and backend domains are same

if(process.env.NODE_ENV !== "production"){
app.use(cors({
    origin: "http://localhost:5173"
})) 
}

//using ratelimiter
app.use(ratelimiter)
//allow every url to resolve cors issue 
app.use("/api/notes", notesRoutes)


//middleware to serve frontend under same domain as backend
//serve frontend as a static asset 
//do this process only in produciton 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend", "dist","index.html"))
})
}
// we are listening to routes 
//listening for get request 

//Endpoint - /api/notes

//GET request/ Read from server 
// app.get("/api/notes", (req,res)=>{

//     //interact with db
//     //on get request , send the response back to user 

//  res.status(200).send("you got 15 notes")
// })

// //CREATE / POST request to server 
// app.post("/api/notes", (req,res)=>{
//     res.status(201).json({message : "note created successfully"})
// })

// //UPDATE/ PUT request to server 
// //update based on Id - which notes user wants to update to 
// app.put("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message : "note updated successfully"})
// })


// app.delete("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message : "note deleted successfully"})
// })
// //ex path : http://localhost:5001?api/notes/20


//CONNECTING MONGODB
//once db is connected then only go and listen to server and start the server 
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started on port :", PORT)
})

});


