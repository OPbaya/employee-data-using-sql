import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router'; 

const NoteCard = ({ note }) => {

    const navigate = useNavigate();

    const handleClick = async (e, id) => {
        e.preventDefault();

        try {
            if (window.confirm("Are you sure you want to delet this note?")) {
                await axios.delete(`http://localhost:3000/api/notes/${id}`)
                toast.success("note deleted")
                window.location.reload()
                         
            }
            else {
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Link to={`/note/${note.id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#3eb185]">
            <div className='card-body'>

                {/* <h3 className='card-title text-base-content'>{note.id}</h3> */}
                <h3 className='card-title text-base-content'>{note.username}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.email}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    {/* <span className='text-sm text-base-content/60'>
                {formatDate(new Date(note.createdAt))}
            </span> */}
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4' />
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleClick(e, note.id)}>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>

                </div>
            </div>

        </Link>
    )
}

export default NoteCard
