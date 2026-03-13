import { Router } from "express";
import pool from "../database/index.js";

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

// Returns all poems in the database
// Query param: none
router.get('/', async (request, response) => {
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