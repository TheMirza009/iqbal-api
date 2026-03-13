import { Router } from "express";
import pool from "../../database/index.js";

const router = Router()

///==========================================================
/// QUERIES
///==========================================================

const poemWithVerses = `
    SELECT 
        poems.*,
        json_agg(
            json_build_object(
                'id', verses.id,
                'verse_no', verses.verse_no,
                'urdu', verses.urdu,
                'english', verses.english
            ) ORDER BY verses.verse_no
        ) as verses
    FROM poems
    JOIN verses ON verses.poem_id = poems.id
`

///==========================================================
/// POEMS METHODS
///==========================================================

// Returns all poems with their verses
// Query params: count, page
router.get('/', async (request, response) => {
    const { count, page } = request.query;

    if (count && page) {
        const offset = (parseInt(page) - 1) * parseInt(count);
        const total = await pool.query("SELECT COUNT(*) FROM poems");
        const result = await pool.query(`${poemWithVerses} GROUP BY poems.id ORDER BY poems.id ASC LIMIT $1 OFFSET $2`, [count, offset]);
        return response.json({
            page: parseInt(page),
            count: parseInt(count),
            total: parseInt(total.rows[0].count),
            poems: result.rows
        })
    }

    if (count) {
        const result = await pool.query(`${poemWithVerses} GROUP BY poems.id ORDER BY poems.id ASC LIMIT $1`, [count]);
        return response.json(result.rows);
    }

    const result = await pool.query(`${poemWithVerses} GROUP BY poems.id ORDER BY poems.id ASC`);
    response.json(result.rows);
})

// Returns a single random poem with its verses
// Query param: none
router.get('/random', async (req, res) => {
    const result = await pool.query(`${poemWithVerses} GROUP BY poems.id ORDER BY RANDOM() LIMIT 1`)
    res.json(result.rows[0]);
})

// Returns a single poem by its ID with its verses
// Route param: id (integer)
// Error: 404 if poem does not exist
router.get('/:id', async (request, response) => {
    const result = await pool.query(`${poemWithVerses} WHERE poems.id = $1 GROUP BY poems.id`, [request.params.id])
    
    if (result.rows.length === 0) {
        return response.status(404).json({ error: "No such poem exists" })
    }
    response.json(result.rows[0])
})

export default router