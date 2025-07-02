import Note from "../models/note.js"



export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title: title, content: content })
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}



export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body
        const id = req.params.id
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true })



        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
export async function deleteNotes(req, res) {
    try {
        const id = req.params.id
        const del = await Note.findByIdAndDelete(id)
        res.status(200).json(del)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export async function getNoteById(req, res) {
    try {
        const del = await Note.findById(req.params.id)
        res.status(200).json(del)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}