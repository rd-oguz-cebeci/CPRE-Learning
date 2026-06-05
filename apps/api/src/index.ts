import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import modulesRouter from './routes/modules.js'
import examRouter from './routes/exam.js'

dotenv.config()

const app = express()
const PORT = process.env.API_PORT || 3001

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))
app.use(express.json())

// Logging
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Routes
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/modules', modulesRouter)
app.use('/api/exam', examRouter)

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({ error: err.message || 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API Server läuft auf http://localhost:${PORT}`)
    console.log(`📚 Lernmodule: http://localhost:${PORT}/api/modules`)
    console.log(`✅ Prüfungsfragen: http://localhost:${PORT}/api/exam`)
})
