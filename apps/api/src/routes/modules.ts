import { Router } from 'express'
import { learningModules } from '../data/modules.js'

const router = Router()

// GET /api/modules - Alle Module abrufen
router.get('/', (_req, res) => {
    res.json(learningModules)
})

// GET /api/modules/:id - Ein spezifisches Modul
router.get('/:id', (req, res) => {
    const module = learningModules.find((m) => m.id === req.params.id)
    if (!module) {
        return res.status(404).json({ error: 'Modul nicht gefunden' })
    }
    res.json(module)
})

export default router
