
import Note from "../models/Note.js"
//if value is not used use _
export  async function getAllNotes(_,res){

    //interact with db
    //on get request , send the response back to user 
    try{
        const notes = await Note.find().sort({createdAt : -1}) // show the newly added note first 
        res.status(200).json(notes)
    }catch(err){
        console.log("Error in fetching notes", err)
        res.status(500).json({message: "Internal Server Error "})
    }
}

export async function getNote(req,res) {
try{
 const note = await Note.findById(req.params.id)
 if(!note) return res.status(404).json({message: "Note not found"})
  res.status(200).json(note)
}catch(err){
     console.log("Error in fetching note", err)
        res.status(500).json({message: "Internal Server Error "})
}
}
export async function createNote (req,res){

   
    //on get request , send the response back to user 
    try{

        
        const {title, content} = req.body
        const note = new Note({title,content})

        const savedNote = await note.save();
        res.status(201).json(savedNote)
        //by default can't
        console.log(title, content)
    }catch(err){
          console.log("Error in creating notes", err)
        res.status(500).json({message: "Internal Server Error "})
    }


}

//PUT request
export async function updateNote (req,res){
    try{
        const {title,content} = req.body
        //in route whatever in params it is used to specify content 
       const updatedNote =  await Note.findByIdAndUpdate(req.params.id, {title,content}, {new:true})
       if(!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updateNote)
    }catch(err){
        console.log("Error in updating note", err)
        res.status(500).json({message: "Internal Server Error "})
    }
}

export async function deleteNote  (req,res){
    try{
        // const {title,content} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({message : "Note deleted Successfully!"})
     }catch(err){
        console.log("Error in deleting note", err)
        res.status(500).json({message: "Internal Server Error "})
    }
  
}