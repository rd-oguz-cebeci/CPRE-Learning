/**
 * Gemeinsame TypeScript-Typen für Frontend und Backend
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type QuestionDifficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'A' | 'P' | 'K'

export interface LearningModule {
    id: string
    title: string
    description: string
    domain: string
    officialSyllabus?: boolean
    learningObjectives?: string[]
    sourceSections?: string[]
    content: string
    summary?: string
    keywords: string[]
    difficulty: Difficulty
}

interface BaseQuestion {
    id: string
    text: string
    domain: string
    difficulty: QuestionDifficulty
    explanation?: string
    points: number
    sourceDocument: 'syllabus' | 'exam-regulations'
    sourceSection: string
    learningObjective?: string
    cognitiveLevel: 'K1' | 'K2'
}

export interface SingleChoiceQuestion extends BaseQuestion {
    type: 'A'
    options: string[]
    correctAnswer: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'P'
    options: string[]
    correctAnswers: number[]
}

export interface TrueFalseStatement {
    text: string
    correctAnswer: boolean
}

export interface TrueFalseQuestion extends BaseQuestion {
    type: 'K'
    statements: TrueFalseStatement[]
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TrueFalseQuestion
export type QuestionAnswer = number | number[] | boolean[]

export interface QuestionScore {
    earnedPoints: number
    possiblePoints: number
    isFullyCorrect: boolean
}

export function isQuestionAnswered(question: Question, answer: QuestionAnswer | undefined): boolean {
    if (question.type === 'A') return typeof answer === 'number'
    if (question.type === 'P') {
        return Array.isArray(answer) && answer.length > 0 && answer.every((selection) => typeof selection === 'number')
    }
    return Array.isArray(answer)
        && answer.length === question.statements.length
        && answer.every((selection) => typeof selection === 'boolean')
}

const simulationObjectives = [
    'LZ 1.1',
    'LZ 1.2',
    'LZ 2.1',
    'LZ 2.2',
    'LZ 3.1',
    'LZ 3.2',
    'LZ 4.1',
    'LZ 4.2',
    'LZ 5.1',
    'LZ 5.2',
    'LZ 6.1',
] as const

function shuffle<T>(items: T[]): T[] {
    return [...items].sort(() => Math.random() - 0.5)
}

/**
 * Creates a syllabus-complete practice simulation. IREB does not publish a
 * mandatory type or chapter distribution, so the minimum P/K exposure and
 * objective coverage are editorial training choices, not an exam blueprint.
 */
export function selectSimulationQuestions(questions: Question[], count = 22): Question[] {
    const eligibleQuestions = questions.filter(
        (question) => question.sourceDocument === 'syllabus' && question.learningObjective
    )
    const selected: Question[] = []
    const addQuestion = (question: Question | undefined) => {
        if (question && !selected.some((selectedQuestion) => selectedQuestion.id === question.id)) {
            selected.push(question)
        }
    }

    ;(['P', 'K'] as const).forEach((type) => {
        shuffle(eligibleQuestions.filter((question) => question.type === type)).slice(0, 3).forEach(addQuestion)
    })

    simulationObjectives.forEach((learningObjective) => {
        if (!selected.some((question) => question.learningObjective === learningObjective)) {
            addQuestion(shuffle(eligibleQuestions.filter((question) => question.learningObjective === learningObjective))[0])
        }
    })

    shuffle(eligibleQuestions).forEach(addQuestion)
    return shuffle(selected.slice(0, count))
}

export function scoreQuestion(question: Question, answer: QuestionAnswer | undefined): QuestionScore {
    if (answer === undefined) {
        return { earnedPoints: 0, possiblePoints: question.points, isFullyCorrect: false }
    }

    if (question.type === 'A') {
        const isFullyCorrect = typeof answer === 'number' && answer === question.correctAnswer
        return {
            earnedPoints: isFullyCorrect ? question.points : 0,
            possiblePoints: question.points,
            isFullyCorrect,
        }
    }

    if (question.type === 'P') {
        if (!Array.isArray(answer) || answer.length > question.correctAnswers.length) {
            return { earnedPoints: 0, possiblePoints: question.points, isFullyCorrect: false }
        }

        const selections = answer.filter((selection): selection is number => typeof selection === 'number')
        if (selections.length !== answer.length) {
            return { earnedPoints: 0, possiblePoints: question.points, isFullyCorrect: false }
        }

        const correctSelections = selections.filter((selection) => question.correctAnswers.includes(selection)).length
        const earnedPoints = (question.points / question.correctAnswers.length) * correctSelections
        return {
            earnedPoints,
            possiblePoints: question.points,
            isFullyCorrect: correctSelections === question.correctAnswers.length && selections.length === correctSelections,
        }
    }

    if (!Array.isArray(answer)) {
        return { earnedPoints: 0, possiblePoints: question.points, isFullyCorrect: false }
    }

    const correctStatements = question.statements.filter(
        (statement, index) => answer[index] === statement.correctAnswer
    ).length
    const earnedPoints = (question.points / question.statements.length) * correctStatements
    return {
        earnedPoints,
        possiblePoints: question.points,
        isFullyCorrect: correctStatements === question.statements.length,
    }
}

export interface ExamSession {
    id: string
    questions: Question[]
    answers: Record<string, QuestionAnswer>
    startTime: Date
    timeLimit: number
    isActive: boolean
}

export interface ExamResult {
    sessionId: string
    score: number
    totalQuestions: number
    correctAnswers: number
    earnedPoints: number
    possiblePoints: number
    timeSpent: number
    domainBreakdown: Record<string, DomainResult>
    learningObjectiveBreakdown: Record<string, DomainResult>
}

export interface DomainResult {
    correct: number
    total: number
    earnedPoints: number
    possiblePoints: number
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
