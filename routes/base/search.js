import { Router } from "express";
import pool from "../../database/index.js";

const router = Router();

///==========================================================
/// SEARCH METHODS
///==========================================================

// Searches across verses and poems
// Query param: term (string)
// Example: /search?term=khudi
router.get('/', async (request, response) => {
    const term = `%${request.query.term}%`;

    const result = await pool.query(`
        SELECT 
            verses.id as verse_id,
            verses.verse_no,
            verses.urdu,
            verses.english,
            poems.id as poem_id,
            poems.name as poem_name,
            poems.name_urdu as poem_name_urdu,
            books.id as book_id,
            books.name as book_name,
            books.name_urdu as book_name_urdu
        FROM verses
        JOIN poems ON verses.poem_id = poems.id
        JOIN books ON verses.book_id = books.id
        WHERE verses.english ILIKE $1
          OR verses.urdu ILIKE $1
          OR poems.name ILIKE $1
          OR poems.name_urdu ILIKE $1
        ORDER BY verses.id ASC
    `, [term])

    if (result.rows.length === 0) {
        return response.status(404).json({ error: 'No results found' })
    }

    // reshape into grouped structure
    const books = [...new Map(result.rows.map(row => [
        row.book_id,
        { id: row.book_id, name: row.book_name, name_urdu: row.book_name_urdu }
    ])).values()]

    const poems = [...new Map(result.rows.map(row => [
        row.poem_id,
        { id: row.poem_id, name: row.poem_name, name_urdu: row.poem_name_urdu }
    ])).values()]

    const verses = result.rows.map(row => ({
        id: row.verse_id,
        verse_no: row.verse_no,
        urdu: row.urdu,
        english: row.english
    }))

    response.json({ books, poems, verses })
})

export default router;