// import Note from "../models/note.js"
import { db } from "../config/sql_db.js"


export async function getAllNotes(req, res) {
    try {
        // const notes = await Note.find().sort({ createdAt: -1 })
        // const [rows] = await db.execute(`select*from users `);
        // const [name] = await db.execute('SELECT username FROM users')
        // const [email] = await db.execute('SELECT email FROM users')

        const [rows] = await db.execute('SELECT id, username, email FROM users');
        console.log()
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body
        // const newNote = new Note({ title: title, content: content })
        // await newNote.save();
        const [newNote] = await db.execute(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [title, content]
        );

        res.status(201).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}



export async function updateNotes(req, res) {
    try {
        const { username, email } = req.body
        const id = req.params.id
        // const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true })

        const [rows] = await db.execute(
            "SELECT id FROM users WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        const [updatedNote] = await db.execute(
            "UPDATE users SET username = ?, email = ? WHERE id = ?",
            [username, email, id]
        );


        
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
export async function deleteNotes(req, res) {
    try {
        const id = req.params.id
        // const del = await Note.findByIdAndDelete(id)
        const [del] = await db.execute(
            "DELETE from users where id = ?", [id]
        );

        res.status(200).json(del)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export async function getNoteById(req, res) {
    try {
        // const del = await Note.findById(req.params.id)
        const id = req.params.id
        const [rows] = await db.execute(
            "SELECT id, username, email FROM users where id = ?", 
            [id]
        );
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}