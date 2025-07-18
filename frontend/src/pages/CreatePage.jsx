import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast'
import axios from 'axios';


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required")
      return;
    }
    
    setLoading(true)
    try{
      const data = await axios.post("http://localhost:3000/api/notes",
        {title, content}
      )
      toast.success("Note added successfully")
      navigate("/")
    } catch(error){
      console.log("errorrr")
      toast.error("error creating note")
    } finally{
      setLoading(false)
    }

  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <Link to={"/"} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5'/>Back to Employee List
        </Link>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>
              Enter Details for New Employee
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>

                <input type="text" placeholder='Note Title' 
                  className='input input-bordered' 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}/>

              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>

                <textarea type="text" placeholder='Note Content'
                  className='input input-bordered'
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />

              </div>
              <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? 'Loading...' : 'Create Note'}
                </button>
              </div>
            </form>

          </div>
        </div>
      
      </div>
    </div>
  )
}

export default CreatePage
