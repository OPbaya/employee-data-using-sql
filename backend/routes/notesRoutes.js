import express from "express";
import { createNotes } from "../controllers/notesControllers.js";
import { getAllNotes } from "../controllers/notesControllers.js";
import { updateNotes } from "../controllers/notesControllers.js";
import { getNoteById } from "../controllers/notesControllers.js";
import { deleteNotes } from "../controllers/notesControllers.js";
const router = express.Router();


router.get("/", getAllNotes);                   //get
router.post("/", createNotes);                  //post
router.put("/:id", updateNotes);                //put
router.delete("/:id", deleteNotes);             //delete
router.get("/:id", getNoteById);                //find by id

export default router;