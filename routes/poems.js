import { Router } from "express";
import pool from "../database/index.js";

const router = Router()

router.get('/', async (request, response) => {
    const result = await pool.query("SELECT * FROM poems");
    response.json(result.rows);
})

router.get('/random', async (req, res) => {
    const result = await pool.query("SELECT * FROM poems ORDER BY RANDOM() LIMIT 1");
    res.json(result.rows[0]);
})

router.get('/:id', async (request, response) => {
    const result = await pool.query('SELECT * FROM poems WHERE id = $1', [request.params.id])
    
    if (result.rows.length === 0) {
        return response.status(404).json({ error: "No such poem exists" })
    }
    response.json(result.rows[0])
})

export default router