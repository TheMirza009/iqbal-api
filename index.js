import express from "express";
import rootRouter from "./routes/root.js";
import verseRouter from "./routes/verses.js";
import poemRouter from "./routes/poems.js";
import bookRouter from "./routes/books.js";
import pool from './database/index.js';
import cors from 'cors'
import { limiter } from "./utils/limiter.js";

const app = express();

// Config
app.use(cors())
app.use(limiter);

// Entry point
app.use('/', rootRouter)

// Routes
app.use('/books', bookRouter)
app.use('/verses', verseRouter)
app.use('/poems', poemRouter)


app.listen(3000, () => {
    console.log('Origins -> Ultima')
})