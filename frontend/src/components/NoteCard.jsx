import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
const NoteCard = ({note,setNotes}) => {

  const handleDelete = async (e,id)=>{
 e.preventDefault() //stop the default navigaiton

 if(!window.confirm("Are you sure to delete this note?")) return
try{
      await api.delete(`/notes/${id}`)
      //get all prev notes and filter where note id is not matched with this deleted id 
      setNotes((prev)=> prev.filter(note=> note._id !== id) ) //get rid of deleted note from arr UI 
      toast.success("Note deleted successfully")
      
    }catch(err){
      console.log("Error deleteing note " ,err)
      toast.error("Error deleting note")
    }
}
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
      <div className='card-body'>

        <h3 className='card-title text-base-contnet'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>

        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
            <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4'/>
            <button className='btn btn-ghost btn-xs text-center' onClick={(e)=> handleDelete(e,note._id)}> <Trash2Icon className='size-4'/></button>
            </div>
        </div>
      </div></Link>
  )
}

export default NoteCard