import { Router } from "express";
import pool from "../database/index.js";

const router = Router()

///==========================================================
/// BOOKS METHODS
///==========================================================

// Returns all poems in the database
// Query param: none
router.get('/', async (request, response) => {
    const result = await pool.query("SELECT * FROM books");
    response.json(result.rows);
})

// Returns a single random poem
// Query param: none
router.get('/random', async (req, res) => {
    const result = await pool.query("SELECT * FROM books ORDER BY RANDOM() LIMIT 1");
    res.json(result.rows[0]);
})

// Returns a single poem by its ID
// Route param: id (integer)
// Error: 404 if poem does not exist
router.get('/:id', async (request, response) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [request.params.id])
    
    if (result.rows.length === 0) {
        return response.status(404).json({ error: "No such book exists" })
    }
    response.json(result.rows[0])
})

export default router