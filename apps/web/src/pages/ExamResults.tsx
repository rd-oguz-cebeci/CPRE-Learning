import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExamStore } from '../store/examStore'
import { scoreQuestion, type Question, type QuestionAnswer } from '@cpre-learning/shared'
import { CheckCircle2, XCircle, TrendingUp, Home, RotateCcw } from 'lucide-react'

function formatAnswer(question: Question, answer: QuestionAnswer | undefined): string {
    if (answer === undefined) return 'Nicht beantwortet'
    if (question.type === 'A') return typeof answer === 'number' ? question.options[answer] : 'Ungültige Antwort'
    if (question.type === 'P') {
        return Array.isArray(answer)
            ? answer.filter((selection): selection is number => typeof selection === 'number').map((selection) => question.options[selection]).join('; ')
            : 'Ungültige Antwort'
    }
    return Array.isArray(answer)
        ? question.statements.map((statement, index) => `${statement.text}: ${answer[index] ? 'Richtig' : 'Falsch'}`).join(' | ')
        : 'Ungültige Antwort'
}

function formatCorrectAnswer(question: Question): string {
    if (question.type === 'A') return question.options[question.correctAnswer]
    if (question.type === 'P') return question.correctAnswers.map((answer) => question.options[answer]).join('; ')
    return question.statements.map((statement) => `${statement.text}: ${statement.correctAnswer ? 'Richtig' : 'Falsch'}`).join(' | ')
}

export default function ExamResults() {
    const navigate = useNavigate()
    const { results, currentSession, resetExam } = useExamStore()

    useEffect(() => {
        if (!results || !currentSession) {
            navigate('/')
        }
    }, [results, currentSession, navigate])

    if (!results || !currentSession) {
        return null
    }

    const handleRetry = () => {
        resetExam()
        navigate('/pruefung')
    }

    const handleHome = () => {
        resetExam()
        navigate('/')
    }

    // Bestanden wenn >= 80% (AI4RE Pruefungsordnung)
    const passed = results.score >= 80

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Result Header */}
            <div
                className={`rounded-lg shadow-sm border-2 p-8 text-center ${passed
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                    }`}
            >
                {passed ? (
                    <>
                        <CheckCircle2 className="w-20 h-20 mx-auto text-green-600 mb-4" />
                        <h1 className="text-3xl font-bold text-green-900 mb-2">Bestanden!</h1>
                        <p className="text-lg text-green-800">
                            Glückwunsch! Du hast die Prüfung erfolgreich bestanden.
                        </p>
                    </>
                ) : (
                    <>
                        <XCircle className="w-20 h-20 mx-auto text-red-600 mb-4" />
                        <h1 className="text-3xl font-bold text-red-900 mb-2">Nicht bestanden</h1>
                        <p className="text-lg text-red-800">
                            Leider hast du die Mindestpunktzahl nicht erreicht. Übe weiter!
                        </p>
                    </>
                )}

                <div className="mt-6 text-6xl font-bold text-gray-900">{results.score}%</div>
                <div className="text-gray-600 mt-2">
                    {results.earnedPoints} von {results.possiblePoints} Punkten erreicht
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600 mb-1">Vollständig richtig</div>
                    <div className="text-3xl font-bold text-green-600">{results.correctAnswers}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600 mb-1">Teilweise oder nicht richtig</div>
                    <div className="text-3xl font-bold text-red-600">
                        {results.totalQuestions - results.correctAnswers}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600 mb-1">Zeit benötigt</div>
                    <div className="text-3xl font-bold text-primary-600">{results.timeSpent} Min</div>
                </div>
            </div>

            {/* Learning objective breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                    Ergebnisse nach offiziellem Lernziel
                </h2>
                <p className="text-sm text-gray-600 mb-5">Die Prozentwerte basieren auf erreichten Punkten einschließlich Teilpunkten.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(results.learningObjectiveBreakdown)
                        .sort(([left], [right]) => left.localeCompare(right, 'de', { numeric: true }))
                        .map(([learningObjective, stats]) => {
                            const percentage = Math.round((stats.earnedPoints / stats.possiblePoints) * 100)
                            return (
                                <div key={learningObjective} className="rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <span className="font-semibold text-gray-900">{learningObjective}</span>
                                        <span className="text-sm text-gray-600">{stats.earnedPoints} / {stats.possiblePoints} Punkte</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="mt-1 text-right text-xs font-medium text-gray-600">{percentage}%</div>
                                </div>
                            )
                        })}
                </div>
            </div>

            {/* Domain Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                    Ergebnisse nach Themenbereich
                </h2>
                <div className="space-y-4">
                    {Object.entries(results.domainBreakdown).map(([domain, stats]) => {
                        const percentage = Math.round((stats.earnedPoints / stats.possiblePoints) * 100)
                        return (
                            <div key={domain}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">{domain}</span>
                                    <span className="text-sm text-gray-600">
                                        {stats.earnedPoints} / {stats.possiblePoints} Punkte ({percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${percentage >= 80
                                            ? 'bg-green-500'
                                            : percentage >= 50
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">📚 Lernempfehlungen</h3>
                <div className="space-y-2 text-primary-800">
                    {Object.entries(results.domainBreakdown)
                        .filter(([_, stats]) => (stats.earnedPoints / stats.possiblePoints) < 0.8)
                        .map(([domain, stats]) => {
                            const percentage = Math.round((stats.earnedPoints / stats.possiblePoints) * 100)
                            return (
                                <div key={domain} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>
                                        <strong>{domain}</strong>: Du hast {percentage}% erreicht. Wiederhole die
                                        entsprechenden Lernmodule um dich zu verbessern.
                                    </span>
                                </div>
                            )
                        })}
                    {Object.values(results.domainBreakdown).every(
                        (stats) => stats.earnedPoints / stats.possiblePoints >= 0.8
                    ) && (
                            <p>
                                ✅ Exzellente Leistung in allen Themenbereichen! Du bist gut vorbereitet für die echte
                                Prüfung.
                            </p>
                        )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={handleHome}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                >
                    <Home className="w-5 h-5" />
                    Zum Dashboard
                </button>
                <button
                    onClick={handleRetry}
                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Neue Prüfung starten
                </button>
            </div>

            {/* Detailed Review */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Detaillierte Auswertung</h2>
                <div className="space-y-4">
                    {currentSession.questions.map((question, index) => {
                        const userAnswer = currentSession.answers[question.id]
                        const questionScore = scoreQuestion(question, userAnswer)
                        const isCorrect = questionScore.isFullyCorrect

                        return (
                            <div
                                key={question.id}
                                className={`border-l-4 pl-4 py-2 ${isCorrect ? 'border-green-500' : 'border-red-500'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 mb-1">
                                            Frage {index + 1}: {question.text}
                                        </div>
                                        <div className="mb-2 text-xs font-semibold text-primary-700">
                                            {question.learningObjective ?? 'Prüfungsformat'} · {question.cognitiveLevel} · {question.sourceDocument === 'syllabus' ? 'Syllabus' : 'Prüfungsordnung'} Abschnitt {question.sourceSection}
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div>
                                                <span className="font-medium">Deine Antwort:</span>{' '}
                                                {formatAnswer(question, userAnswer)}
                                            </div>
                                            {!isCorrect && (
                                                <div className="text-green-700">
                                                    <span className="font-medium">Richtige Antwort:</span>{' '}
                                                    {formatCorrectAnswer(question)}
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-medium">Punkte:</span> {questionScore.earnedPoints} / {questionScore.possiblePoints}
                                            </div>
                                            {question.explanation && (
                                                <div className="mt-2 bg-gray-50 p-2 rounded text-gray-700">
                                                    <span className="font-medium">Erklärung:</span> {question.explanation}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isCorrect ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
