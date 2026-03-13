import { Router } from "express";
import pool from "../../database/index.js";

const router = Router()

///==========================================================
/// VERSES METHODS
///==========================================================

// Returns verses/ and shows all verses available
router.get('/', async (request, response) => {
    const count = request.query.count;

    // query param count returns how many verses to return
    if (count) {
        const result = await pool.query("SELECT * FROM verses ORDER BY id ASC LIMIT $1", [count]);
        return response.json(result.rows);
    }

    // defaults to all verses
    const result = await pool.query("SELECT * FROM verses ORDER BY id ASC");
    response.json(result.rows)
})

// Returns verses/random & shows a random verse
router.get('/random', async (req, res) => {
    const result = await pool.query("SELECT * FROM verses ORDER BY RANDOM() LIMIT 1");
    res.json(result.rows[0]);
})

// Returns verses/id (like 1,3,5) & shows numbered verse
router.get('/:id', async (request, response) => {
  const result = await pool.query('SELECT * FROM verses WHERE id = $1', [request.params.id])
  
  // Error if does not exist
  if (result.rows.length === 0) {
    return response.status(404).json({ error: 'No such verse exists' })
  }
  
  response.json(result.rows[0])
})

export default router