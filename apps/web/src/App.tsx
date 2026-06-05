import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { BookOpen, ClipboardCheck, Home } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import AI4RELearning from './pages/AI4RELearning'
import ExamSimulation from './pages/ExamSimulation'
import ExamResults from './pages/ExamResults'

function App() {
    return (
        <Router basename="/CPRE-Learning">
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <Link to="/" className="flex items-center px-2 text-gray-900 font-semibold text-lg">
                                    <BookOpen className="w-6 h-6 mr-2 text-primary-600" />
                                    CPRE AI4RE Lernen
                                </Link>
                            </div>
                            <div className="flex space-x-4">
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/lernen"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Lernmaterial
                                </Link>
                                <Link
                                    to="/pruefung"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                >
                                    <ClipboardCheck className="w-4 h-4 mr-2" />
                                    Prüfung
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
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
