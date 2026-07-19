# Projektstatus

## Aktueller Stand

Die CPRE AI4RE Lern-Anwendung ist auf einen rein statischen Lernbetrieb umgestellt. Lernplan, Zusammenfassungen und Prüfungsfragen werden beim Build aus den TypeScript-Datenquellen als JSON erzeugt; eine KI-Anbindung ist nicht Teil des Lernflusses.

## Umgesetzte Bereiche

### Frontend
- Dashboard mit Fokus auf Lernplan, Lernmodule und Prüfungssimulation
- Lernseite mit redaktionell gepflegten Zusammenfassungen
- Prüfungssimulation mit Timer, Navigation und Ergebnisansicht
- Detaillierte Auswertung nach Themenbereichen

### Backend
- `GET /api/modules` für alle Lernmodule
- `GET /api/modules/:id` für einzelne Module
- `GET /api/exam/questions?count=20` für randomisierte Prüfungsfragen
- Quellengebundener Fragenpool mit 144 Fragen und Erklärungen

### Inhalte
- 1 Modul für Lernplan und Prüfungsstrategie
- 11 Lern- und Vertiefungsmodule
- 144 Übungsfragen mit gemischten Schwierigkeitsgraden sowie A-, P- und K-Training für jedes offizielle Lernziel

## Wichtige Dateien

```text
apps/api/src/data/modules.ts
apps/api/src/data/examQuestions.ts
apps/api/src/routes/modules.ts
apps/api/src/routes/exam.ts
apps/web/src/pages/AI4RELearning.tsx
apps/web/src/pages/ExamSimulation.tsx
apps/web/src/pages/ExamResults.tsx
```

## Technischer Stand

- Monorepo mit npm workspaces
- React + Vite im Frontend
- Express + TypeScript im Backend
- Zustand für Frontend-State
- Prisma weiterhin vorbereitet, aktuell aber nicht im Lernfluss aktiv

## Starten

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

## Verifikation

- Workspace-Typecheck erfolgreich ausgeführt
- KI-spezifische Runtime-Pfade entfernt
- Lernseite und Prüfungssimulation auf statische Inhalte umgestellt

## Wichtiger Hinweis

Das vom Nutzer erwähnte Lernmaterial war in dieser Sitzung nicht als Anhang verfügbar. Die aktuell eingebauten Lerninhalte wurden deshalb aus vorhandenem Projektkontext und allgemeinem AI4RE-Prüfungswissen erstellt. Mit dem Originalmaterial kann der Inhalt später gezielt angepasst werden.
