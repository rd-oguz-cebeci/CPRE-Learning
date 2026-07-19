import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { BookMarked, BookOpen, ClipboardCheck, Home } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import AI4RELearning from './pages/AI4RELearning'
import ExamSimulation from './pages/ExamSimulation'
import ExamResults from './pages/ExamResults'
import OpenBookReference from './pages/OpenBookReference'

function App() {
    return (
        <Router basename="/CPRE-Learning">
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <Link to="/" className="flex items-center px-1 text-gray-900 font-semibold text-lg sm:px-2">
                                    <BookOpen className="w-6 h-6 text-primary-600 lg:mr-2" />
                                    <span className="hidden lg:inline">CPRE AI4RE Lernen</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
                                <Link
                                    to="/"
                                    title="Dashboard"
                                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:px-3"
                                >
                                    <Home className="w-5 h-5 lg:w-4 lg:h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Dashboard</span>
                                </Link>
                                <Link
                                    to="/lernen"
                                    title="Lernmaterial"
                                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:px-3"
                                >
                                    <BookOpen className="w-5 h-5 lg:w-4 lg:h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Lernmaterial</span>
                                </Link>
                                <Link
                                    to="/pruefung"
                                    title="Prüfung"
                                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:px-3"
                                >
                                    <ClipboardCheck className="w-5 h-5 lg:w-4 lg:h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Prüfung</span>
                                </Link>
                                <Link
                                    to="/open-book"
                                    title="Open-Book-Referenz"
                                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:px-3"
                                >
                                    <BookMarked className="w-5 h-5 lg:w-4 lg:h-4 lg:mr-2" />
                                    <span className="hidden lg:inline">Open Book</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/lernen" element={<AI4RELearning />} />
                        <Route path="/pruefung" element={<ExamSimulation />} />
                        <Route path="/ergebnisse" element={<ExamResults />} />
                        <Route path="/open-book" element={<OpenBookReference />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
