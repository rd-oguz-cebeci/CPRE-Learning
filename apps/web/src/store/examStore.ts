import { create } from 'zustand'

export interface Question {
    id: string
    text: string
    options: string[]
    correctAnswer: number
    domain: string
    difficulty: 'easy' | 'medium' | 'hard'
    explanation?: string
}

export interface ExamSession {
    id: string
    questions: Question[]
    answers: Record<string, number>
    startTime: Date
    timeLimit: number // in Minuten
    isActive: boolean
}

export interface ExamStore {
    currentSession: ExamSession | null
    results: ExamResult | null
    startExam: (questions: Question[], timeLimit: number) => void
    answerQuestion: (questionId: string, answer: number) => void
    submitExam: () => void
    resetExam: () => void
}

export interface ExamResult {
    sessionId: string
    score: number
    totalQuestions: number
    correctAnswers: number
    timeSpent: number
    domainBreakdown: Record<string, { correct: number; total: number }>
}

export const useExamStore = create<ExamStore>((set, get) => ({
    currentSession: null,
    results: null,

    startExam: (questions, timeLimit) => {
        const session: ExamSession = {
            id: crypto.randomUUID(),
            questions,
            answers: {},
            startTime: new Date(),
            timeLimit,
            isActive: true,
        }
        set({ currentSession: session, results: null })
    },

    answerQuestion: (questionId, answer) => {
        const { currentSession } = get()
        if (!currentSession) return

        set({
            currentSession: {
                ...currentSession,
                answers: {
                    ...currentSession.answers,
                    [questionId]: answer,
                },
            },
        })
    },

    submitExam: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const correctAnswers = currentSession.questions.filter(
            (q) => currentSession.answers[q.id] === q.correctAnswer
        ).length

        const domainBreakdown: Record<string, { correct: number; total: number }> = {}
        currentSession.questions.forEach((q) => {
            if (!domainBreakdown[q.domain]) {
                domainBreakdown[q.domain] = { correct: 0, total: 0 }
            }
            domainBreakdown[q.domain].total++
            if (currentSession.answers[q.id] === q.correctAnswer) {
                domainBreakdown[q.domain].correct++
            }
        })

        const timeSpent = Math.floor(
            (new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60
        )

        const results: ExamResult = {
            sessionId: currentSession.id,
            score: Math.round((correctAnswers / currentSession.questions.length) * 100),
            totalQuestions: currentSession.questions.length,
            correctAnswers,
            timeSpent,
            domainBreakdown,
        }

        set({
            currentSession: { ...currentSession, isActive: false },
            results,
        })
    },

    resetExam: () => {
        set({ currentSession: null, results: null })
    },
}))
