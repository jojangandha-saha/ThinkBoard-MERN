import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUi from '../components/RateLimitUi'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
const HomePage = () => {
    const [israteLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const fetchNotes = async ()=>{
            try {

                //USING FETCH TWO STEP JSON PARSING
                // const res = await fetch("http://localhost:5001/api/notes")
                // const data = await res.json()

                //USING AXIOS
                const res = await api.get("/notes")
                setNotes(res.data)
                setIsRateLimited(false)
                // setLoading(false)
                console.log(res.data)
            } catch (err) {
                console.log("Error in fetching notes",err)
                if(err.response?.status === 429 ){
                    setIsRateLimited(true)
                }else{
                    toast.error("Failed to fetch notes")
                    setIsRateLimited(false)
                }
            }finally{
                setLoading(false)
            }
        }

        fetchNotes()
    },[])
  return (
    <div className='min-h-screen'>
    <Navbar/>
    
    {israteLimited ? <RateLimitUi/> : null}
    <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading..</div>}
        {notes.length === 0 && !israteLimited ? <NotesNotFound/> : null}
        {notes.length > 0 && !israteLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {notes.map((item)=>(

                  <NoteCard key={item._id} note={item} setNotes={setNotes}/>
            ))}
         
            </div>
          )  }
    </div>
    </div>
  )
}

export default HomePage