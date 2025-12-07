import React from 'react'
import HomePage from './pages/HomePage'
import {Route, Routes} from "react-router"
import CreatePage from './pages/CreatePage'
import NoteDetails from './pages/NoteDetails'
// import toast from 'react-hot-toast'
const App = () => {
  return (
    <div className= "relative h-full w-full " data_theme="dim">
  <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
  {/* return those routes  */}
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/create" element={<CreatePage/>}/>
    <Route path="/note/:id" element={<NoteDetails/>}/>
  </Routes>
    </div>
  )
}

export default App