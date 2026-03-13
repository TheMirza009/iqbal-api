import { Router } from "express";
import pool from "../../database/index.js";

const router = Router()

///==========================================================
/// QUERIES
///==========================================================

const bookWithPoems = `
    SELECT
        books.*,
        json_agg(
            json_build_object(
                'id', poems.id,
                'poem_no', poems.poem_no,
                'name', poems.name,
                'name_urdu', poems.name_urdu,
                'verses', (
                    SELECT json_agg(
                        json_build_object(
                            'id', verses.id,
                            'verse_no', verses.verse_no,
                            'urdu', verses.urdu,
                            'english', verses.english
                        ) ORDER BY verses.verse_no
                    )
                    FROM verses
                    WHERE verses.poem_id = poems.id
                )
            ) ORDER BY poems.poem_no
        ) as poems
    FROM books
    JOIN poems ON poems.book_id = books.id
`

///==========================================================
/// BOOKS METHODS
///==========================================================

// Returns all books with their poems and verses
// Query params: count, page
router.get('/', async (request, response) => {
    const { count, page } = request.query;

    if (count && page) {
        const offset = (parseInt(page) - 1) * parseInt(count);
        const total = await pool.query("SELECT COUNT(*) FROM books");
        const result = await pool.query(`${bookWithPoems} GROUP BY books.id ORDER BY books.id ASC LIMIT $1 OFFSET $2`, [count, offset]);
        return response.json({
            page: parseInt(page),
            count: parseInt(count),
            total: parseInt(total.rows[0].count),
            books: result.rows
        })
    }

    if (count) {
        const result = await pool.query(`${bookWithPoems} GROUP BY books.id ORDER BY books.id ASC LIMIT $1`, [count]);
        return response.json(result.rows);
    }

    const result = await pool.query(`${bookWithPoems} GROUP BY books.id ORDER BY books.id ASC`);
    response.json(result.rows);
})

// Returns a single random book with its poems and verses
// Query param: none
router.get('/random', async (req, res) => {
    const result = await pool.query(`${bookWithPoems} GROUP BY books.id ORDER BY RANDOM() LIMIT 1`)
    res.json(result.rows[0]);
})

// Returns a single book by its ID with its poems and verses
// Route param: id (integer)
// Error: 404 if book does not exist
router.get('/:id', async (request, response) => {
    const result = await pool.query(`${bookWithPoems} WHERE books.id = $1 GROUP BY books.id`, [request.params.id])
    
    if (result.rows.length === 0) {
        return response.status(404).json({ error: "No such book exists" })
    }
    response.json(result.rows[0])
})

export default router