import express from "express"
import { getAllNotes , createNote, updateNote, deleteNote , getNote} from "../controllers/notesController.js";
const router = express.Router();

//controllers 
//get request 
router.get("/", getAllNotes)
router.get("/:id",getNote)
//post request 

router.post("/",createNote )

//put request 
router.put("/:id", updateNote )

//delete request 

router.delete("/:id",deleteNote)

export default router