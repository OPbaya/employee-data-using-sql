import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react';
import { Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';



const NotePage = ({ note }) => {

  const [notes, setNotes] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)



  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNotes(response.data[0])
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
    if (!notes.username.trim() || !notes.email.trim()) {
      toast.error("All fields are required");
      return;
    }


    // e.preventDefault();
    setSaving(true)
    try {
      await axios.put(`http://localhost:3000/api/notes/${id}`, notes);
      navigate("/")
      toast.success("Note Updated successfully")

    } catch (error) {
      console.error("error, msg : ", error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleClick = async (e, id) => {
    e.preventDefault();

    try {
      if (window.confirm("Are you sure you want to delet this note?")) {
        await axios.delete(`http://localhost:3000/api/notes/${id}`)
        toast.success("note deleted")
        navigate("/")
      }
      else {
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <Link to={"/"} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5' />Back to Employee List
        </Link>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>
              Update Employee Details
            </h2>
            <form>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>

                <input type="text" placeholder='Note Title'
                  className='input input-bordered'
                  value={notes.username}

                  onChange={(e) => setNotes({ ...notes, username: e.target.value })} />


              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>

                <textarea type="text" placeholder='Note Content'
                  className='input input-bordered'
                  value={notes.email}
                  onChange={(e) => setNotes({ ...notes, email: e.target.value })} />

              </div>
              <div className='card-actions justify-end'>
                <div className='flex items-center gap-1'>
                  <button type="button" className="btn btn-error" onClick={(e) => handleClick(e, id)}>
                    <Trash2Icon className="size-4 mr-1" />
                    Delete
                  </button>

                </div>
                <button type='submit' className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  Save Changes
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
