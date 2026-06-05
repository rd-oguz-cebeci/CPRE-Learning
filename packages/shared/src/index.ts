/**
 * Gemeinsame TypeScript-Typen für Frontend und Backend
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface LearningModule {
    id: string
    title: string
    description: string
    domain: string
    content: string
    summary?: string
    keywords: string[]
    difficulty: Difficulty
}

export interface Question {
    id: string
    text: string
    options: string[]
    correctAnswer: number
    domain: string
    difficulty: QuestionDifficulty
    explanation?: string
}

export interface ExamSession {
    id: string
    questions: Question[]
    answers: Record<string, number>
    startTime: Date
    timeLimit: number
    isActive: boolean
}

export interface ExamResult {
    sessionId: string
    score: number
    totalQuestions: number
    correctAnswers: number
    timeSpent: number
    domainBreakdown: Record<string, DomainResult>
}

export interface DomainResult {
    correct: number
    total: number
}

export interface ApiResponse<T> {
    data?: T
    error?: string
}

export interface QuestionRequest {
    count?: number
    domain?: string
    difficulty?: QuestionDifficulty
}

export interface QuestionResponse {
    questions: Question[]
}
