import { Router } from 'express'
import { examQuestions } from '../data/examQuestions.js'

const router = Router()

// GET /api/exam/questions - Fragen für eine Prüfung abrufen
router.get('/questions', (req, res) => {
    const requestedCount = parseInt(req.query.count as string, 10)
    const count = Number.isNaN(requestedCount) ? 20 : requestedCount

    // Fragen mischen
    const shuffled = [...examQuestions].sort(() => Math.random() - 0.5)

    // Maximale Anzahl limitieren auf die wirklich vorhandenen
    const maxCount = Math.min(count, examQuestions.length)
    const selected = shuffled.slice(0, maxCount)

    res.json({ questions: selected, totalAvailable: examQuestions.length })
})

export default router
