/**
 * Generiert statische JSON-Dateien aus den TypeScript-Datenquellen.
 * Wird vor dem Web-Build ausgeführt, damit GitHub Pages die Daten ausliefern kann.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

async function main() {
    // Importiere die Daten aus den API-Quellen
    const { learningModules } = await import('../apps/api/src/data/modules.ts')
    const { examQuestions } = await import('../apps/api/src/data/examQuestions.ts')

    // Zielverzeichnis erstellen
    const outDir = join(rootDir, 'apps', 'web', 'public', 'data')
    mkdirSync(outDir, { recursive: true })

    // JSON-Dateien schreiben
    writeFileSync(join(outDir, 'modules.json'), JSON.stringify(learningModules, null, 2))
    writeFileSync(join(outDir, 'questions.json'), JSON.stringify(examQuestions, null, 2))

    console.log(`✅ Statische Daten generiert:`)
    console.log(`   - ${outDir}/modules.json (${learningModules.length} Module)`)
    console.log(`   - ${outDir}/questions.json (${examQuestions.length} Fragen)`)
}

main().catch((err) => {
    console.error('❌ Fehler bei der Datengenerierung:', err)
    process.exit(1)
})
