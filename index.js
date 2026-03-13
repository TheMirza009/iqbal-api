import express from "express";
import verseRouter from "./routes/verses.js";
import poemRouter from "./routes/poems.js";
import bookRouter from "./routes/books.js";
import pool from './database/index.js';
import cors from 'cors'

const app = express();

app.use(cors())

// Entry point
app.get('/', (req, res) => {
  res.json({
    name: 'IqbalAPI',
    version: '1.0.0',
    description: 'A REST API for Allama Iqbal\'s poetry',
    endpoints: {
      books: '/books',
      poems: '/poems',
      verses: '/verses'
    }
  })
})

// Routes
app.use('/books', bookRouter)
app.use('/verses', verseRouter)
app.use('/poems', poemRouter)


app.listen(3000, () => {
    console.log('Origins -> Ultima')
})