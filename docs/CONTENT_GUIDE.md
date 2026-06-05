# Content-Erweiterung - Neue Module und Fragen hinzufügen

## Neue Lernmodule hinzufügen

### 1. Module in `apps/api/src/routes/modules.ts` erweitern

Füge ein neues Objekt zum `sampleModules`-Array hinzu:

```typescript
{
  id: '4', // Eindeutige ID
  title: 'KI-gestützte Anforderungsvalidierung',
  description: 'Automatische Prüfung und Validierung von Requirements',
  domain: 'Validation',
  content: `# KI-gestützte Anforderungsvalidierung

## Überblick

Hier kommt dein Markdown-Content...

## Hauptthemen

### 1. Konsistenzprüfung
...

### 2. Vollständigkeitsprüfung
...
`,
  keywords: ['Validierung', 'Qualitätssicherung', 'Automatisierung'],
  difficulty: 'intermediate' as const,
}
```

### 2. Content-Struktur

Ein gutes Lernmodul sollte enthalten:

1. **Einleitung**: Was wird behandelt?
2. **Hauptthemen**: 3-5 strukturierte Abschnitte
3. **Definitionen**: Wichtige Begriffe erklären
4. **Beispiele**: Praktische Anwendungsfälle
5. **Zusammenfassung**: Key Takeaways

**Best Practices:**
- Nutze Markdown-Formatierung (Überschriften, Listen, Code-Blöcke)
- Halte Abschnitte überschaubar (max. 500 Wörter pro Abschnitt)
- Verwende klare, einfache Sprache
- Füge konkrete Beispiele hinzu

---

## Neue Prüfungsfragen hinzufügen

### 1. Fragen in `apps/api/src/routes/exam.ts` erweitern

Füge ein neues Objekt zum `sampleQuestions`-Array hinzu:

```typescript
{
  id: 'q21', // Eindeutige ID
  text: 'Welche Methode eignet sich am besten für die automatische Extraktion von Anforderungen aus Stakeholder-Interviews?',
  options: [
    'Manuelle Transkription',
    'Natural Language Processing (NLP)',
    'Statistische Analyse',
    'Reine Keyword-Suche',
  ],
  correctAnswer: 1, // Index der richtigen Antwort (0-basiert)
  domain: 'AI Fundamentals',
  difficulty: 'medium' as const,
  explanation: 'NLP-Techniken können Kontext verstehen und sind ideal für die Extraktion von Anforderungen aus natürlichsprachlichen Texten.',
}
```

### 2. Fragen-Guidelines

**Gute Multiple-Choice-Fragen:**
- Klar und eindeutig formuliert
- Alle Optionen sind plausibel (keine offensichtlich falschen)
- Richtige Antwort ist eindeutig
- Explanation erklärt, warum die Antwort richtig ist

**Schwierigkeitsgrade:**
- **easy**: Faktenwissen, Definitionen
- **medium**: Anwendung von Konzepten, Vergleiche
- **hard**: Analyse, Problemlösung, komplexe Szenarien

**Domains:**
- AI Fundamentals
- Generative AI
- Quality Assurance
- Validation
- Documentation
- (eigene hinzufügen bei Bedarf)

---

## Markdown-Content aus externen Dateien laden

Für größere Mengen an Content kannst du separate Markdown-Dateien verwenden.

### 1. Content-Ordner erstellen

```
CPRE-Learning/
├── content/
│   └── ai4re/
│       ├── 01-introduction.md
│       ├── 02-generative-ai.md
│       └── 03-bias-quality.md
```

### 2. Content zur Build-Zeit laden

```typescript
import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), '../../content/ai4re')

const loadModule = (filename: string, metadata: Partial<LearningModule>) => {
  const content = fs.readFileSync(path.join(contentDir, filename), 'utf-8')
  return {
    id: metadata.id!,
    title: metadata.title!,
    description: metadata.description!,
    domain: metadata.domain!,
    content,
    keywords: metadata.keywords!,
    difficulty: metadata.difficulty!,
  }
}

const modules = [
  loadModule('01-introduction.md', {
    id: '1',
    title: 'Einführung in AI4RE',
    description: 'Grundlagen von KI im Requirements Engineering',
    domain: 'AI Fundamentals',
    keywords: ['KI', 'Requirements Engineering'],
    difficulty: 'beginner',
  }),
]
```

---

## Content-Qualitätssicherung

### Checkliste für neue Lernmodule

- [ ] Titel ist klar und beschreibend
- [ ] Description gibt einen guten Überblick
- [ ] Content ist strukturiert (Überschriften, Listen)
- [ ] Mindestens 3 Keywords definiert
- [ ] Difficulty passend gewählt
- [ ] Keine Rechtschreibfehler
- [ ] Markdown-Syntax ist korrekt
- [ ] Praktische Beispiele enthalten
- [ ] Prüfungsrelevanz erkennbar

### Checkliste für neue Prüfungsfragen

- [ ] Frage ist eindeutig formuliert
- [ ] Alle 4 Optionen sind plausibel
- [ ] Nur eine Antwort ist korrekt
- [ ] correctAnswer-Index stimmt
- [ ] Domain ist sinnvoll zugeordnet
- [ ] Difficulty ist angemessen
- [ ] Explanation ist vorhanden und hilfreich
- [ ] Keine Rechtschreibfehler

---

## Fragen aus JSON importieren

Für einfacheres Management kannst du Fragen auch in JSON-Dateien pflegen.

### 1. JSON-Datei erstellen

`content/ai4re/questions.json`:
```json
[
  {
    "id": "q1",
    "text": "Was ist AI4RE?",
    "options": [
      "AI for Requirements Engineering",
      "Automated Intelligence for RE",
      "Advanced Ideas for RE",
      "Applied Innovations for RE"
    ],
    "correctAnswer": 0,
    "domain": "AI Fundamentals",
    "difficulty": "easy",
    "explanation": "AI4RE steht für Artificial Intelligence for Requirements Engineering."
  }
]
```

### 2. JSON in Route importieren

```typescript
import fs from 'fs'
import path from 'path'

const questionsPath = path.join(process.cwd(), '../../content/ai4re/questions.json')
const sampleQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
```

---

## KI-generierte Inhalte

Du kannst auch ChatGPT/Claude nutzen, um Content zu erstellen:

### Prompt-Vorlage für Lernmodule

```
Erstelle ein Lernmodul für CPRE AI4RE zum Thema: [THEMA]

Format:
- Markdown
- Struktur: Einleitung, 3-5 Hauptabschnitte, Zusammenfassung
- Zielgruppe: CPRE Foundation Level Teilnehmer
- Sprache: Deutsch
- Praxisnah mit Beispielen
- Ca. 800-1200 Wörter

Thema: [THEMA HIER EINFÜGEN]
```

### Prompt-Vorlage für Prüfungsfragen

```
Erstelle 5 Multiple-Choice-Fragen für CPRE AI4RE zum Thema: [THEMA]

Format:
- JSON-Array
- Jede Frage: text, options (4), correctAnswer (Index), domain, difficulty, explanation
- Schwierigkeitsgrade variieren (easy, medium, hard)
- Alle Optionen plausibel
- Deutsche Sprache

Thema: [THEMA HIER EINFÜGEN]
```

---

## Testing neuer Inhalte

### 1. Backend neu starten

```powershell
# Strg+C um Backend zu stoppen
npm run dev:api
```

### 2. Module prüfen

```powershell
# In Browser oder mit curl
curl http://localhost:3001/api/modules
```

### 3. Fragen prüfen

```powershell
curl http://localhost:3001/api/exam/questions?count=5
```

### 4. Frontend testen

1. Öffne http://localhost:5173/lernen
2. Prüfe ob neues Modul erscheint
3. Teste Zusammenfassungs-Generierung
4. Starte Prüfung und prüfe neue Fragen

---

## Best Practices

1. **Versionierung**: Committe neue Inhalte mit aussagekräftigen Commit-Messages
2. **Review**: Lass andere deine Fragen/Module prüfen
3. **Iterativ**: Starte mit wenigen Modulen, erweitere schrittweise
4. **Konsistenz**: Halte Stil und Schwierigkeit konsistent
5. **Quellen**: Dokumentiere Quellen für Fachinhalte

---

## Beispiel-Workflow

```powershell
# 1. Neues Modul in modules.ts hinzufügen
code apps\api\src\routes\modules.ts

# 2. Neue Fragen in exam.ts hinzufügen
code apps\api\src\routes\exam.ts

# 3. Backend neu starten
npm run dev:api

# 4. Im Browser testen
# - http://localhost:5173/lernen
# - http://localhost:5173/pruefung

# 5. Bei Erfolg committen
git add .
git commit -m "feat: 5 neue Fragen zum Thema Validierung"
```

---

**Viel Erfolg beim Erweitern der Lern-App! 🚀**
