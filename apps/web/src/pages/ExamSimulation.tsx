import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExamStore } from '../store/examStore'
import { ClipboardCheck, Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react'

export default function ExamSimulation() {
    const navigate = useNavigate()
    const { currentSession, startExam, answerQuestion, submitExam } = useExamStore()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(0)
    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [loadError, setLoadError] = useState(false)

    // Timer (in Sekunden)
    useEffect(() => {
        if (!currentSession?.isActive) return

        const interval = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - currentSession.startTime.getTime()) / 1000)
            const remainingSeconds = currentSession.timeLimit * 60 - elapsedSeconds

            if (remainingSeconds <= 0) {
                submitExam()
                navigate('/ergebnisse')
            } else {
                setTimeRemaining(remainingSeconds)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [currentSession, submitExam, navigate])

    // Lade Fragen aus statischer JSON-Datei beim Start
    useEffect(() => {
        if (!currentSession) {
            fetch(import.meta.env.BASE_URL + 'data/questions.json')
                .then((res) => {
                    if (!res.ok) throw new Error('HTTP ' + res.status)
                    return res.json()
                })
                .then((allQuestions) => {
                    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
                    const selected = shuffled.slice(0, 22)
                    startExam(selected, 30)
                })
                .catch(() => setLoadError(true))
        }
    }, [currentSession, startExam])

    if (loadError) {
        return (
            <div className="glass-panel rounded-2xl p-16 text-center max-w-2xl mx-auto mt-12">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Fehler beim Laden</h3>
                <p className="text-slate-500 text-lg mb-6">Die Prüfungsfragen konnten nicht geladen werden.</p>
                <button
                    onClick={() => { setLoadError(false) }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                >
                    Erneut versuchen
                </button>
            </div>
        )
    }

    if (!currentSession) {
        return (
            <div className="glass-panel rounded-2xl p-16 text-center animate-pulse-subtle max-w-2xl mx-auto mt-12">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ClipboardCheck className="w-10 h-10 text-indigo-500 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Prüfung wird vorbereitet...</h3>
                <p className="text-slate-500 text-lg">22 zufällige Fragen aus dem Fragenpool werden geladen.</p>
            </div>
        )
    }

    const currentQuestion = currentSession.questions[currentQuestionIndex]
    const answeredCount = Object.keys(currentSession.answers).length
    const progress = (answeredCount / currentSession.questions.length) * 100

    const handleSubmit = () => {
        submitExam()
        navigate('/ergebnisse')
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
            {/* Header with Timer */}
            <div className="glass-panel rounded-2xl p-6 sticky top-4 z-10 shadow-sm shadow-indigo-100/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">AI4RE Prüfungssimulation</h1>
                        <p className="text-sm font-medium text-indigo-600 mt-1">
                            Frage {currentQuestionIndex + 1} von {currentSession.questions.length}
                        </p>
                    </div>
                    <div className="flex items-center bg-white/60 px-5 py-3 rounded-xl border border-white">
                        <Clock className={`w-6 h-6 mr-3 ${timeRemaining <= 300 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`} />
                        <div>
                            <div className={`text-xl font-bold leading-none font-mono ${timeRemaining <= 300 ? 'text-red-600' : 'text-slate-800'}`}>
                                {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:{String(timeRemaining % 60).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-2">
                        <span>Bearbeitungsfortschritt</span>
                        <span>{answeredCount} / {currentSession.questions.length} beantwortet ({Math.round(progress)}%)</span>
                    </div>
                    <div className="w-full bg-slate-200/60 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="glass-card rounded-2xl p-8 border border-white">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100 shadow-sm">
                        {currentQuestion.domain}
                    </span>
                    <span
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full border shadow-sm ${currentQuestion.difficulty === 'easy'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : currentQuestion.difficulty === 'medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-100'
                                : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}
                    >
                        {currentQuestion.difficulty === 'easy' ? 'Leicht' : currentQuestion.difficulty === 'medium' ? 'Mittel' : 'Schwer'}
                    </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">{currentQuestion.text}</h2>

                {/* Answer Options */}
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = currentSession.answers[currentQuestion.id] === index;
                        return (
                            <button
                                key={index}
                                onClick={() => answerQuestion(currentQuestion.id, index)}
                                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 hover-lift flex items-start group ${isSelected
                                    ? 'border-indigo-500 bg-indigo-50/70 shadow-md shadow-indigo-100'
                                    : 'border-white bg-white/60 hover:border-indigo-300 hover:bg-white'
                                    }`}
                            >
                                <div className="flex-shrink-0 mt-0.5 mr-4">
                                    {isSelected ? (
                                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                    )}
                                </div>
                                <span className={`flex-1 text-lg ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                                    {option}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Navigation footer */}
            <div className="flex items-center justify-between pt-4">
                <button
                    onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 bg-white/70 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold text-slate-700 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Zurück
                </button>

                <div className="hidden md:flex gap-1.5 flex-wrap justify-center max-w-lg">
                    {currentSession.questions.map((_, index) => {
                        const isCurrent = index === currentQuestionIndex;
                        const isAnswered = currentSession.answers[currentSession.questions[index].id] !== undefined;

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all flex items-center justify-center ${isCurrent
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-110'
                                    : isAnswered
                                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200'
                                        : 'bg-white/60 text-slate-500 border border-white hover:border-indigo-200 hover:text-indigo-600'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    })}
                </div>

                {currentQuestionIndex < currentSession.questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 flex items-center gap-2 font-semibold transition-all"
                    >
                        Weiter
                        <ChevronRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={() => setShowSubmitDialog(true)}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 font-bold transition-all"
                    >
                        Prüfung abgeben
                        <ClipboardCheck className="w-5 h-5 ml-1" />
                    </button>
                )}
            </div>

            {/* Submit Dialog */}
            {showSubmitDialog && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 border border-slate-100 transform transition-all scale-100">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Bist du dir sicher?</h3>
                                <p className="text-slate-600 mt-2 leading-relaxed">
                                    Du hast <strong className="text-slate-900">{answeredCount}</strong> von <strong className="text-slate-900">{currentSession.questions.length}</strong> Fragen beantwortet.
                                </p>
                                {answeredCount < currentSession.questions.length && (
                                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 font-medium">
                                        ⚠️ Achtung: Du hast noch {currentSession.questions.length - answeredCount} unbeantwortete Fragen. Diese werden als falsch gewertet!
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                onClick={() => setShowSubmitDialog(false)}
                                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Zurück zur Prüfung
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                            >
                                Jetzt abgeben
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
