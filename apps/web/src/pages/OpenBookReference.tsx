import { useEffect, useMemo, useRef, useState } from 'react'
import { BookMarked, ExternalLink, Search, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ReferenceModule {
    id: string
    title: string
    description: string
    content: string
    summary?: string
    keywords: string[]
    learningObjectives?: string[]
    sourceSections?: string[]
}

interface SourceCatalog {
    officialSources: {
        reviewedAt: string
        syllabus: { version: string; url: string }
        examinationRegulations: { version: string; url: string }
    }
}

const referenceModuleIds = [
    'chapter1',
    'chapter2-llm',
    'chapter3-prompt-engineering',
    'chapter4-risks',
    'chapter4-responsibilities',
    'chapter5-overview',
    'chapter5-use-cases',
    'terminology',
    'exam-rules',
]

function normalize(value: string) {
    return value.toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function plainText(markdown: string) {
    return markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/[#>*_`|[\]()-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function getExcerpt(content: string, query: string) {
    const text = plainText(content)
    const index = normalize(text).indexOf(normalize(query))
    if (index < 0) return null
    const start = Math.max(0, index - 100)
    const end = Math.min(text.length, index + query.length + 180)
    return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`
}

function Highlight({ text, query }: { text: string; query: string }) {
    if (!query) return <>{text}</>
    const index = normalize(text).indexOf(normalize(query))
    if (index < 0) return <>{text}</>
    return (
        <>
            {text.slice(0, index)}
            <mark className="rounded bg-amber-200 px-0.5 text-slate-950">{text.slice(index, index + query.length)}</mark>
            {text.slice(index + query.length)}
        </>
    )
}

export default function OpenBookReference() {
    const [modules, setModules] = useState<ReferenceModule[]>([])
    const [catalog, setCatalog] = useState<SourceCatalog | null>(null)
    const [query, setQuery] = useState('')
    const [loadError, setLoadError] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        Promise.all([
            fetch(import.meta.env.BASE_URL + 'data/modules.json').then((response) => {
                if (!response.ok) throw new Error('Zusammenfassung konnte nicht geladen werden.')
                return response.json() as Promise<ReferenceModule[]>
            }),
            fetch(import.meta.env.BASE_URL + 'data/catalog.json').then((response) => response.ok ? response.json() : null),
        ])
            .then(([loadedModules, loadedCatalog]) => {
                setModules(loadedModules.filter((module) => referenceModuleIds.includes(module.id)))
                setCatalog(loadedCatalog)
            })
            .catch(() => setLoadError(true))
    }, [])

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if (event.key === '/' && document.activeElement !== searchRef.current) {
                event.preventDefault()
                searchRef.current?.focus()
            }
            if (event.key === 'Escape') {
                setQuery('')
                searchRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleShortcut)
        return () => window.removeEventListener('keydown', handleShortcut)
    }, [])

    const results = useMemo(() => {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) return modules.map((module) => ({ module, excerpt: null }))
        const normalizedQuery = normalize(trimmedQuery)
        return modules
            .filter((module) => normalize([
                module.title,
                module.description,
                module.summary ?? '',
                module.content,
                module.keywords.join(' '),
                module.learningObjectives?.join(' ') ?? '',
            ].join(' ')).includes(normalizedQuery))
            .map((module) => ({ module, excerpt: getExcerpt(module.content, trimmedQuery) }))
    }, [modules, query])

    const objectives = modules.flatMap((module) => module.learningObjectives ?? [])
        .filter((objective, index, all) => all.indexOf(objective) === index)

    if (loadError) {
        return <div className="border border-red-200 bg-red-50 p-6 text-red-800">Die Open-Book-Zusammenfassung konnte nicht geladen werden.</div>
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-16">
            <header className="border-b-4 border-emerald-500 bg-slate-950 px-6 py-8 text-white sm:px-8">
                <div className="mb-3 flex items-center gap-3 text-emerald-300">
                    <BookMarked className="h-6 w-6" />
                    <span className="text-sm font-bold uppercase tracking-wider">AI4RE Open-Book-Referenz</span>
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl">Schnell finden. Sicher abgleichen.</h1>
                <p className="mt-3 max-w-3xl text-slate-300">
                    Kompakte Zusammenfassung aller elf Lernziele. Die Suche läuft vollständig lokal und verwendet keinen KI-Assistenten.
                </p>
            </header>

            <div className="sticky top-2 z-20 border border-slate-300 bg-white p-3 shadow-lg">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                        ref={searchRef}
                        type="text"
                        inputMode="search"
                        role="searchbox"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Begriff, Lernziel oder Methode suchen …"
                        aria-label="Open-Book-Zusammenfassung durchsuchen"
                        autoFocus
                        className="h-12 w-full border border-slate-300 bg-slate-50 pl-12 pr-20 text-base outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                    {query ? (
                        <button
                            onClick={() => setQuery('')}
                            title="Suche löschen"
                            aria-label="Suche löschen"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    ) : (
                        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 border border-slate-300 bg-white px-2 py-1 text-xs text-slate-500">/</kbd>
                    )}
                </div>
                <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
                    <span>{results.length} {results.length === 1 ? 'Abschnitt' : 'Abschnitte'} gefunden</span>
                    <span>Esc löscht die Suche</span>
                </div>
            </div>

            {!query && (
                <nav aria-label="Lernziele" className="flex flex-wrap gap-2">
                    {objectives.map((objective) => (
                        <button
                            key={objective}
                            onClick={() => setQuery(objective)}
                            className="border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
                        >
                            {objective}
                        </button>
                    ))}
                </nav>
            )}

            {results.length === 0 ? (
                <div className="border border-slate-200 bg-white p-10 text-center">
                    <Search className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                    <h2 className="font-bold text-slate-900">Kein Treffer für „{query}“</h2>
                    <p className="mt-1 text-sm text-slate-600">Versuche einen Oberbegriff, ein Lernziel oder eine andere Schreibweise.</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {results.map(({ module, excerpt }) => (
                        <article key={module.id} className="border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900"><Highlight text={module.title} query={query.trim()} /></h2>
                                        <p className="mt-1 text-sm text-slate-600">{module.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {module.learningObjectives?.map((objective) => (
                                            <span key={objective} className="bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">{objective}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {excerpt && query && (
                                <div className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm leading-relaxed text-slate-800 sm:px-6">
                                    <span className="mr-2 font-bold text-amber-900">Fundstelle:</span>
                                    <Highlight text={excerpt} query={query.trim()} />
                                </div>
                            )}
                            <div className="prose prose-slate max-w-none px-5 py-5 prose-headings:tracking-normal prose-li:my-1 prose-p:my-2 sm:px-6">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{module.summary ?? module.description}</ReactMarkdown>
                            </div>
                            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500 sm:px-6">
                                <span>{module.sourceSections?.length ? `Syllabus Abschnitt ${module.sourceSections.join(', ')}` : 'Prüfungsordnung'}</span>
                                <span>{module.keywords.slice(0, 5).join(' · ')}</span>
                            </footer>
                        </article>
                    ))}
                </div>
            )}

            {catalog && (
                <footer className="flex flex-col gap-3 border-t border-slate-300 pt-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        Quellenstand: Syllabus v{catalog.officialSources.syllabus.version}, Prüfungsordnung v{catalog.officialSources.examinationRegulations.version}, geprüft am{' '}
                        {new Intl.DateTimeFormat('de-DE').format(new Date(catalog.officialSources.reviewedAt))}
                    </span>
                    <a href={catalog.officialSources.syllabus.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline">
                        IREB Download Center <ExternalLink className="h-4 w-4" />
                    </a>
                </footer>
            )}
        </div>
    )
}