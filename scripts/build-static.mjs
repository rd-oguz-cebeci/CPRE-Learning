/**
 * Generiert statische JSON-Dateien aus den TypeScript-Datenquellen.
 * Wird vor dem Web-Build ausgeführt, damit GitHub Pages die Daten ausliefern kann.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

function assert(condition, message) {
    if (!condition) throw new Error(message)
}

function assertUniqueIds(items, label) {
    const ids = new Set()
    items.forEach((item) => {
        assert(typeof item.id === 'string' && item.id.length > 0, `${label} ohne gültige ID`)
        assert(!ids.has(item.id), `Doppelte ${label}-ID: ${item.id}`)
        ids.add(item.id)
    })
}

function validateQuestion(question, learningObjectiveIds, objectiveById) {
    assert(['A', 'P', 'K'].includes(question.type), `Frage ${question.id}: ungültiger Typ`)
    assert([1, 2].includes(question.points), `Frage ${question.id}: Punkte müssen 1 oder 2 sein`)
    assert(typeof question.text === 'string' && question.text.length > 0, `Frage ${question.id}: Text fehlt`)
    assert(typeof question.explanation === 'string' && question.explanation.length > 0, `Frage ${question.id}: Erklärung fehlt`)
    assert(['syllabus', 'exam-regulations'].includes(question.sourceDocument), `Frage ${question.id}: Quelldokument fehlt`)
    assert(typeof question.sourceSection === 'string' && question.sourceSection.length > 0, `Frage ${question.id}: Quellenabschnitt fehlt`)
    assert(['K1', 'K2'].includes(question.cognitiveLevel), `Frage ${question.id}: K-Stufe fehlt`)

    if (question.learningObjective !== undefined) {
        assert(learningObjectiveIds.includes(question.learningObjective), `Frage ${question.id}: unbekanntes Lernziel ${question.learningObjective}`)
        const objective = objectiveById.get(question.learningObjective)
        assert(question.sourceDocument === 'syllabus', `Frage ${question.id}: Lernziel darf nur auf den Syllabus verweisen`)
        assert(question.cognitiveLevel === objective.cognitiveLevel, `Frage ${question.id}: K-Stufe passt nicht zu ${question.learningObjective}`)
        assert(question.sourceSection === objective.sourceSection, `Frage ${question.id}: Quellenabschnitt passt nicht zu ${question.learningObjective}`)
    } else if (question.sourceDocument === 'syllabus') {
        assert(question.sourceSection === 'Lernziele/Kognitive Stufen des Wissens', `Frage ${question.id}: Syllabus-Frage ohne Lernziel`)
    } else {
        assert(question.sourceDocument === 'exam-regulations', `Frage ${question.id}: ungültige Metadatenkombination`)
    }

    if (question.type === 'A') {
        assert(Array.isArray(question.options) && question.options.length >= 4 && question.options.length <= 5, `Frage ${question.id}: A-Fragen benötigen 4-5 Optionen`)
        assert(Number.isInteger(question.correctAnswer) && question.correctAnswer >= 0 && question.correctAnswer < question.options.length, `Frage ${question.id}: ungültige Lösung`)
        return
    }

    if (question.type === 'P') {
        assert(Array.isArray(question.options) && question.options.length >= 3, `Frage ${question.id}: P-Optionen fehlen`)
        assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= 2, `Frage ${question.id}: P-Fragen benötigen mindestens zwei Lösungen`)
        assert(new Set(question.correctAnswers).size === question.correctAnswers.length, `Frage ${question.id}: doppelte P-Lösung`)
        assert(question.correctAnswers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < question.options.length), `Frage ${question.id}: ungültige P-Lösung`)
        assert(question.text.includes(`(${question.correctAnswers.length} Antworten)`), `Frage ${question.id}: erwartete Auswahlzahl fehlt im Text`)
        assert(question.learningObjective && question.cognitiveLevel, `Frage ${question.id}: P-Frage ohne Lernzielmetadaten`)
        return
    }

    assert(Array.isArray(question.statements) && question.statements.length >= 2, `Frage ${question.id}: K-Aussagen fehlen`)
    assert(question.statements.every((statement) => typeof statement.text === 'string' && typeof statement.correctAnswer === 'boolean'), `Frage ${question.id}: ungültige K-Aussage`)
    assert(question.learningObjective && question.cognitiveLevel, `Frage ${question.id}: K-Frage ohne Lernzielmetadaten`)
}

async function main() {
    // Importiere die Daten aus den API-Quellen
    const { learningModules } = await import('../apps/api/src/data/modules.ts')
    const { examQuestions } = await import('../apps/api/src/data/examQuestions.ts')
    const { learningObjectiveIds, officialSources, syllabusObjectives } = await import('../apps/api/src/data/syllabus.ts')

    assertUniqueIds(learningModules, 'Modul')
    assertUniqueIds(examQuestions, 'Frage')

    const coveredObjectives = new Set(
        learningModules
            .filter((module) => module.officialSyllabus)
            .flatMap((module) => module.learningObjectives ?? [])
    )
    learningObjectiveIds.forEach((objective) => {
        assert(coveredObjectives.has(objective), `Offizielles Lernziel ohne Lernmodul: ${objective}`)
    })
    coveredObjectives.forEach((objective) => {
        assert(learningObjectiveIds.includes(objective), `Unbekanntes offizielles Lernziel im Modul: ${objective}`)
    })
    const objectiveById = new Map(syllabusObjectives.map((objective) => [objective.id, objective]))
    examQuestions.forEach((question) => validateQuestion(question, learningObjectiveIds, objectiveById))

    const typeCounts = Object.fromEntries(
        ['A', 'P', 'K'].map((type) => [type, examQuestions.filter((question) => question.type === type).length])
    )
    const objectiveQuestionCoverage = Object.fromEntries(
        learningObjectiveIds.map((objective) => {
            const questions = examQuestions.filter((question) => question.learningObjective === objective)
            const types = [...new Set(questions.map((question) => question.type))].sort()
            assert(questions.length > 0, `Lernziel ohne Übungsfrage: ${objective}`)
            assert(['A', 'P', 'K'].every((type) => types.includes(type)), `Lernziel ohne vollständiges A/P/K-Training: ${objective}`)
            return [objective, { questions: questions.length, types }]
        })
    )
    assert(typeCounts.P >= 9 && typeCounts.K >= 9, 'P/K-Pool reicht nicht für drei abwechslungsreiche Trainingsversuche')

    const objectiveMappedQuestions = examQuestions.filter((question) => question.learningObjective)
    const sourceTaggedQuestions = examQuestions.filter((question) => question.sourceDocument && question.sourceSection)
    const catalog = {
        officialSources,
        syllabusObjectives,
        coverage: {
            modules: learningModules.length,
            questions: examQuestions.length,
            sourceTaggedQuestions: sourceTaggedQuestions.length,
            objectiveMappedQuestions: objectiveMappedQuestions.length,
            regulationOrIntroductionQuestions: examQuestions.length - objectiveMappedQuestions.length,
            coveredLearningObjectives: [...coveredObjectives],
            questionTypes: typeCounts,
            objectiveQuestionCoverage,
        },
        disclaimer: 'Die Fragen sind redaktionelle Übungsfragen und keine veröffentlichten oder rekonstruierten IREB-Originalprüfungsfragen.',
    }

    // Zielverzeichnis erstellen
    const outDir = join(rootDir, 'apps', 'web', 'public', 'data')
    mkdirSync(outDir, { recursive: true })

    // JSON-Dateien schreiben
    writeFileSync(join(outDir, 'modules.json'), JSON.stringify(learningModules, null, 2))
    writeFileSync(join(outDir, 'questions.json'), JSON.stringify(examQuestions, null, 2))
    writeFileSync(join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2))

    console.log(`✅ Statische Daten generiert:`)
    console.log(`   - ${outDir}/modules.json (${learningModules.length} Module)`)
    console.log(`   - ${outDir}/questions.json (${examQuestions.length} Fragen)`)
    console.log(`   - ${outDir}/catalog.json (${coveredObjectives.size} Lernziele abgedeckt, ${sourceTaggedQuestions.length}/${examQuestions.length} Fragen mit Quelle)`)
}

main().catch((err) => {
    console.error('❌ Fehler bei der Datengenerierung:', err)
    process.exit(1)
})
