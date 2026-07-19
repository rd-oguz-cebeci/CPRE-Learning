import { useEffect, useState } from 'react'
import { useLearningStore } from '../store/learningStore'
import { BookOpen, Sparkles, Search, AlertCircle } from 'lucide-react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MermaidDiagram from '../components/MermaidDiagram'

const markdownComponents: Components = {
    code({ className, children, ...props }) {
        const match = /language-mermaid/.exec(className || '')
        if (match) {
            return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
        }
        return <code className={className} {...props}>{children}</code>
    },
}

interface SourceCatalog {
    officialSources: {
        reviewedAt: string
        syllabus: { version: string; publishedAt: string; url: string }
        examinationRegulations: { version: string; publishedAt: string; url: string }
    }
}

export default function AI4RELearning() {
    const { modules, selectedModule, setModules, selectModule } =
        useLearningStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [loadError, setLoadError] = useState(false)
    const [sourceCatalog, setSourceCatalog] = useState<SourceCatalog | null>(null)

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'data/modules.json')
            .then((response) => {
                if (!response.ok) throw new Error('Lernmodule konnten nicht geladen werden.')
                return response.json()
            })
            .then(setModules)
            .catch(() => setLoadError(true))

        fetch(import.meta.env.BASE_URL + 'data/catalog.json')
            .then((response) => response.ok ? response.json() : null)
            .then(setSourceCatalog)
            .catch(() => setSourceCatalog(null))
    }, [setModules])

    const filteredModules = modules.filter(
        (m) =>
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    if (loadError) {
        return (
            <div className="glass-panel rounded-2xl p-16 text-center max-w-2xl mx-auto mt-12">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Fehler beim Laden</h3>
                <p className="text-slate-500 text-lg mb-6">Die Lernmodule konnten nicht geladen werden.</p>
                <button
                    onClick={() => { setLoadError(false) }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                >
                    Erneut versuchen
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module List */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
                        AI4RE Lernmodule
                    </h2>

                    {sourceCatalog && (
                        <div className="mb-4 rounded-md border border-primary-200 bg-primary-50 p-3 text-xs leading-relaxed text-slate-700">
                            <div className="font-semibold text-primary-800">Offizieller Quellenstand</div>
                            <div>Syllabus v{sourceCatalog.officialSources.syllabus.version} · Prüfungsordnung v{sourceCatalog.officialSources.examinationRegulations.version}</div>
                            <div>Zuletzt abgeglichen: {new Intl.DateTimeFormat('de-DE').format(new Date(sourceCatalog.officialSources.reviewedAt))}</div>
                            <a
                                href={sourceCatalog.officialSources.syllabus.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block font-semibold text-primary-700 hover:underline"
                            >
                                IREB Download Center
                            </a>
                        </div>
                    )}

                    {/* Search */}
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Module durchsuchen..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Module Items */}
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {filteredModules.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">
                                Keine Module gefunden. Starte das Backend mit Beispieldaten.
                            </p>
                        ) : (
                            filteredModules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => selectModule(module)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedModule?.id === module.id
                                        ? 'bg-primary-50 border-primary-500'
                                        : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-medium text-gray-900 text-sm">{module.title}</div>
                                    <div className="text-xs text-gray-500 mt-1">{module.description}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded ${module.difficulty === 'beginner'
                                                ? 'bg-green-100 text-green-800'
                                                : module.difficulty === 'intermediate'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {module.difficulty}
                                        </span>
                                        {module.summary && (
                                            <span className="text-xs text-primary-600 flex items-center">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                Lernhilfe
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Module Content */}
            <div className="lg:col-span-2">
                {!selectedModule ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Wähle ein Modul aus der Liste
                        </h3>
                        <p className="text-gray-600">
                            Klicke auf ein Modul links, um Lernplan, Zusammenfassung und Lerninhalt anzuzeigen.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Module Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedModule.title}</h1>
                            <p className="text-gray-600 mb-4">{selectedModule.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedModule.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* AI Summary Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2 text-primary-600" />
                                    Prüfungszusammenfassung
                                </h2>
                                <span className="text-xs font-medium text-primary-700 bg-primary-50 border border-primary-100 rounded-full px-3 py-1">
                                    Redaktionell gepflegt
                                </span>
                            </div>

                            {selectedModule.summary ? (
                                <div className="prose prose-slate max-w-none bg-primary-50 border border-primary-200 rounded-md p-4">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{selectedModule.summary}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                                    Für dieses Modul ist noch keine Kurz-Zusammenfassung hinterlegt.
                                </div>
                            )}
                        </div>

                        {/* Module Content */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lerninhalt</h2>
                            <div className="prose prose-slate max-w-none prose-table:w-full prose-th:text-left prose-td:align-top">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{selectedModule.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
