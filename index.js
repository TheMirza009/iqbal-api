import express from "express";
import verseRouter from "./routes/verses.js";
import poemRouter from "./routes/poems.js";
import pool from './database/index.js';
import cors from 'cors'

const app = express();

app.use(cors())
app.use('/verses', verseRouter)
app.use('/poems', poemRouter)

app.listen(3000, () => {
    console.log('Origins -> Ultima')
})