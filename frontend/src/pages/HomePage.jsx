import React from 'react'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import NoteCard from './components/NoteCard.jsx'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'
import axios from "axios"
import { useState } from 'react'
import toast from "react-hot-toast"

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await axios.get("http://localhost:3000/api/notes")
        setNotes(res.data);
        console.log(res.data); 
      } catch (error){
        toast.error("Failed to load notes")
        console.log("error fetching data");
      } finally {
        setLoading(false)
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-600">Nothing yet...</h1>
          <h1 className="text-2xl font-semibold text-gray-600 ">Enter Employee data</h1>
          <div className='flex items-center '>
            <Link to={"/create"} className='btn btn-success'>
              <PlusIcon className='size-5' />
              <span>Create Note</span>
            </Link>

          </div>


        </div>
      ) : (
        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center text-primary py-10'>Loading Notes....</div>}

          {notes.length > 0 && (
            <div className='grid grind-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((n) => (
                <div>
                  <NoteCard key={n._id} note={n} />
                  {/* {n.title} | {n.content} */}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default HomePage
