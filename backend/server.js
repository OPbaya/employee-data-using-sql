import express from "express";
import dotenv from "dotenv"
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

connectDB();

//middleware                ==> we are able to to use req.body because of the middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);


app.use("/api/notes", notesRoutes);


app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
})