import { Router } from "express";
import pool from "../../database/index.js";

const router = Router()

///==========================================================
/// VERSES METHODS
///==========================================================
// Query params: count, page
// Examples:
//   /verses?count=5         → first 5 verses
//   /verses?count=10&page=2 → 10 verses, page 2
router.get('/', async (request, response) => {
    const { count, page } = request.query;

    if (count && page) {
        const offset = (parseInt(page) - 1) * parseInt(count);
        const result = await pool.query("SELECT * FROM verses ORDER BY id ASC LIMIT $1 OFFSET $2", [count, offset]);
        const total = await pool.query("SELECT COUNT(*) FROM verses");
        return response.json({
            page: parseInt(page),
            count: parseInt(count),
            total: parseInt(total.rows[0].count),
            verses: result.rows
        })
    }

    if (count) {
        const result = await pool.query("SELECT * FROM verses ORDER BY id ASC LIMIT $1", [count]);
        return response.json(result.rows);
    }

    const result = await pool.query("SELECT * FROM verses ORDER BY id ASC");
    response.json(result.rows)
})

// Returns verses/random & shows a random verse
router.get('/random', async (req, res) => {
    const verse = await pool.query("SELECT * FROM verses ORDER BY RANDOM() LIMIT 1");
    const v = verse.rows[0];

    const isFirst = v.verse_no % 2 !== 0;
    const pairVerseNo = isFirst ? v.verse_no + 1 : v.verse_no - 1;

    const pair = await pool.query(
        "SELECT * FROM verses WHERE poem_id = $1 AND verse_no = $2",
        [v.poem_id, pairVerseNo]
    );

    const couplet = isFirst
        ? [v, pair.rows[0]].filter(Boolean)
        : [pair.rows[0], v].filter(Boolean);

    res.json(couplet);
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