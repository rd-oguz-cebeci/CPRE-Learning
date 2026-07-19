import { create } from 'zustand'
import {
    scoreQuestion,
    type ExamResult,
    type ExamSession,
    type Question,
    type QuestionAnswer,
} from '@cpre-learning/shared'

export type { ExamResult, ExamSession, Question }

export interface ExamStore {
    currentSession: ExamSession | null
    results: ExamResult | null
    startExam: (questions: Question[], timeLimit: number) => void
    answerQuestion: (questionId: string, answer: QuestionAnswer) => void
    submitExam: () => void
    resetExam: () => void
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

        let correctAnswers = 0
        let earnedPoints = 0
        let possiblePoints = 0
        const domainBreakdown: ExamResult['domainBreakdown'] = {}
        const learningObjectiveBreakdown: ExamResult['learningObjectiveBreakdown'] = {}
        currentSession.questions.forEach((q) => {
            const questionScore = scoreQuestion(q, currentSession.answers[q.id])
            const learningObjective = q.learningObjective ?? 'Prüfungsformat'
            earnedPoints += questionScore.earnedPoints
            possiblePoints += questionScore.possiblePoints

            if (!domainBreakdown[q.domain]) {
                domainBreakdown[q.domain] = { correct: 0, total: 0, earnedPoints: 0, possiblePoints: 0 }
            }
            domainBreakdown[q.domain].total++
            domainBreakdown[q.domain].earnedPoints += questionScore.earnedPoints
            domainBreakdown[q.domain].possiblePoints += questionScore.possiblePoints
            if (questionScore.isFullyCorrect) {
                correctAnswers++
                domainBreakdown[q.domain].correct++
            }

            if (!learningObjectiveBreakdown[learningObjective]) {
                learningObjectiveBreakdown[learningObjective] = { correct: 0, total: 0, earnedPoints: 0, possiblePoints: 0 }
            }
            learningObjectiveBreakdown[learningObjective].total++
            learningObjectiveBreakdown[learningObjective].earnedPoints += questionScore.earnedPoints
            learningObjectiveBreakdown[learningObjective].possiblePoints += questionScore.possiblePoints
            if (questionScore.isFullyCorrect) {
                learningObjectiveBreakdown[learningObjective].correct++
            }
        })

        const timeSpent = Math.floor(
            (new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60
        )

        const results: ExamResult = {
            sessionId: currentSession.id,
            score: Math.round((earnedPoints / possiblePoints) * 100),
            totalQuestions: currentSession.questions.length,
            correctAnswers,
            earnedPoints,
            possiblePoints,
            timeSpent,
            domainBreakdown,
            learningObjectiveBreakdown,
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
