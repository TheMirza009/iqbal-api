import express from "express";
import rootRouter from "./routes/base/root.js";
import searchRouter from "./routes/base/search.js";
import verseRouter from "./routes/content/verses.js";
import poemRouter from "./routes/content/poems.js";
import bookRouter from "./routes/content/books.js";
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
app.use('/search', searchRouter)
app.use('/books', bookRouter)
app.use('/verses', verseRouter)
app.use('/poems', poemRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log('Origins -> Ultima')
})