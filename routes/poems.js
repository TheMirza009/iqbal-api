import { Router } from "express";
import { loadPoem } from "../utils/loader.js"

const router = Router()
const poems = loadPoem('./data/poems')

router.get('/', (request, response) => {
  response.json({name: 'Khudi', poems: poems})
})

router.get('/random', (req, res) => {
    res.json(poems[Math.floor(Math.random() * poems.length)])
})

router.get('/:id', (request, response) => {
    const resVerse = poems[request.params.id - 1];
    if (resVerse == null) {
        return response.status(404).json({ error: "No such verse exists" })
    }
    response.json(poems[request.params.id - 1]) // 1 - 1 = 0 == first item
})

export default router