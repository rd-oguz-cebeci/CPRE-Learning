import { Link } from 'react-router-dom'
import { BookOpen, ClipboardCheck, TrendingUp, Brain, Sparkles, ChevronRight } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="space-y-12 pb-12 animate-in fade-in duration-500">
            <div className="text-center pt-8 pb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-6 animate-float">
                    <Brain className="w-10 h-10 text-indigo-600" />
                </div>
                <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    CPRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI4RE</span> Lern-Portal
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Bereite dich strukturiert auf die CPRE AI4RE Pruefung vor. Nutze redaktionell aufbereitete
                    Lernmodule, kompakte Zusammenfassungen und realistische Pruefungssimulationen.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    to="/lernen"
                    className="group glass-card rounded-2xl p-6 hover-lift flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200">
                                <BookOpen className="h-7 w-7" />
                            </div>
                            <Sparkles className="w-5 h-5 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            Lernmaterial
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Interaktive AI4RE Themenbereiche mit Lernplan, Pruefungsfokus und kompakten Zusammenfassungen.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-indigo-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                        Jetzt lernen <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                </Link>

                <Link
                    to="/pruefung"
                    className="group glass-card rounded-2xl p-6 hover-lift flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-200">
                                <ClipboardCheck className="h-7 w-7" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                            Prüfungssimulation
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Teste dein Wissen unter Realbedingungen: 22 Fragen in 30 Minuten, zufaellig aus 100 Fragen.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-emerald-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                        Simulation starten <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                </Link>

                <div className="group glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50 pointer-events-none"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-200">
                                <TrendingUp className="h-7 w-7" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Fortschritt</h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Noch keine Prüfungen absolviert. Starte deine erste Simulation, um hier Analytics zu sehen.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Info */}
            <div className="glass-panel rounded-3xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Brain className="w-7 h-7 mr-3 text-indigo-600" />
                    Warum den AI4RE Badge machen?
                </h2>
                <div className="prose max-w-none text-slate-600 text-lg">
                    <p className="mb-8 leading-relaxed">
                        Der <strong>AI4RE (Artificial Intelligence for Requirements Engineering)</strong> Badge
                        ist der moderne Standard, um klassisches Requirements Engineering mit der Leistungsfähigkeit
                        künstlicher Intelligenz zu kombinieren.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-white bg-opacity-40 rounded-2xl p-6 border border-white border-opacity-50">
                            <h3 className="font-bold text-indigo-900 text-lg flex items-center mb-4">
                                <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
                                Kern-Lernbereiche
                            </h3>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                                    KI-Grundlagen & LLMs verstehen
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                                    Generative AI für Anforderungserstellung nutzen
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                                    Bias erkennen und Qualitätssicherung betreiben
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                                    Prompt Engineering für RE-Kontexte
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white bg-opacity-40 rounded-2xl p-6 border border-white border-opacity-50">
                            <h3 className="font-bold text-emerald-900 text-lg flex items-center mb-4">
                                <span className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></span>
                                Plattform Features
                            </h3>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                                    Redaktionell gepflegte Zusammenfassungen mit klarem Pruefungsfokus
                                </li>
                                <li className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                                    Strukturierte Lernmodule fuer Wiederholung und Vertiefung
                                </li>
                                <li className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                                    Timer-basierte, anspruchsvolle Prüfungssimulation
                                </li>
                                <li className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                                    100 randomisierte Fragen mit detaillierten Erklaerungen
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
