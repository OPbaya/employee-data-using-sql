import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast'

const NotePage = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

  

  const navigate = useNavigate();
  const { id } = useParams();

  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNotes(response.data)
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false)
      }
    }

    fetchNotes();
  }, [id])



  const handleSave = async () => {
    if (!notes.title.trim() || !notes. content.trim()) {
      toast.error("All fields are required")
      return;
    }

    // e.preventDefault();
    setSaving(true)
    try{
      await axios.put(`http://localhost:3000/api/notes/${id}`, notes);
      navigate("/")
      toast.success("Note Updated successfully")
      
    } catch(error){
      console.error("error, msg : ", error.message)
    } finally{
      setSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <Link to={"/"} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5' />Back to Notes
        </Link>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>
              Create New Note
            </h2>
            <form>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>

                <input type="text" placeholder='Note Title'
                  className='input input-bordered'
                  value={notes.title}
                  onChange={(e) => setNotes({ ...notes, title: e.target.value })} />
                

              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>

                <textarea type="text" placeholder='Note Content'
                  className='input input-bordered'
                  value={notes.content}
                  onChange={(e) => setNotes({...notes, content: e.target.value})} />

              </div>
              <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default NotePage
