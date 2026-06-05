# CPRE AI4RE Entwicklungsanleitung

## Architektur-Uebersicht

```text
┌─────────────────┐         ┌─────────────────┐
│   React Frontend│────────▶│  Express Backend│
│   (Vite)        │  HTTP   │  (Node.js)      │
└─────────────────┘         └─────────────────┘
         │                           │
         ▼                           ▼
  ┌─────────────┐          ┌──────────────────┐
  │  Zustand    │          │ In-Memory Data   │
  │  State Mgmt │          │ Module + Fragen  │
  └─────────────┘          └──────────────────┘
```

Die Anwendung liefert statische, redaktionell gepflegte Lerninhalte aus der API. Es gibt keine KI- oder Ollama-Abhaengigkeit mehr.

## Tech Stack

### Frontend (`apps/web`)
- React 18 mit TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS
- react-markdown

### Backend (`apps/api`)
- Node.js 20+
- Express
- TypeScript
- In-Memory-Daten fuer Lernmodule und Fragenpool
- Prisma/SQLite weiterhin vorbereitet, aber aktuell nicht im Lernfluss aktiv

## Datenfluss

### Lernmodule
```text
User oeffnet Lernbereich
  → Frontend: GET /api/modules
  → Backend: liefert statische Module mit Zusammenfassung und Inhalt
  → Frontend: zeigt Lernplan, Zusammenfassung und Lerninhalt an
```

### Pruefungssimulation
```text
User startet Pruefung
  → Frontend: GET /api/exam/questions?count=20
  → Backend: zieht zufaellig 20 Fragen aus 100 hinterlegten Fragen
  → Frontend: speichert Antworten lokal im Zustand-Store
  → Frontend: berechnet Ergebnisse und Themenauswertung lokal
```

## API-Endpunkte

### `GET /api/modules`
Liefert alle Lernmodule fuer die Web-Anwendung.

### `GET /api/modules/:id`
Liefert ein einzelnes Lernmodul.

### `GET /api/exam/questions?count=20`
Liefert zufaellig gemischte Fragen aus dem gesamten Fragenpool.

## Wichtige Dateien

### Backend
- `apps/api/src/data/modules.ts`: Lernplan, Module und Zusammenfassungen
- `apps/api/src/data/examQuestions.ts`: 100 Pruefungsfragen
- `apps/api/src/routes/modules.ts`: Modul-Endpunkte
- `apps/api/src/routes/exam.ts`: Fragen-Endpunkt

### Frontend
- `apps/web/src/pages/AI4RELearning.tsx`: Lernseite
- `apps/web/src/pages/ExamSimulation.tsx`: Pruefungsmodus
- `apps/web/src/pages/ExamResults.tsx`: Auswertung
- `apps/web/src/store/learningStore.ts`: Modul-State
- `apps/web/src/store/examStore.ts`: Pruefungs-State

## Erweiterungsoptionen

1. Inhalte aus Dateien oder Datenbank laden statt aus TypeScript-Modulen.
2. Fragen nach Domain oder Schwierigkeit filterbar machen.
3. Lernfortschritt im Browser oder in einer Datenbank speichern.
4. Admin-Oberflaeche fuer Pflege von Modulen und Fragen aufbauen.

## Validierung

Fuer den aktuellen Stand sind besonders relevant:
- TypeScript-Typecheck fuer Web und API
- manuelle Pruefung von `GET /api/modules`
- manuelle Pruefung von `GET /api/exam/questions?count=20`

### E2E Tests (geplant)
- Kompletter Prüfungsablauf
- Zusammenfassungs-Generierung

## Performance-Optimierung

### Aktuell
- Client-seitiges Routing (React Router)
- Lazy Loading von Modulen möglich
- Vite für schnelle Dev-Builds

### Geplant
- Code Splitting für größere Module
- Service Worker für Offline-Fähigkeit
- Optionales Caching häufig gelesener Lerninhalte

## Sicherheit

### Aktuell
- Lokal betrieben, keine externe Datenweitergabe
- CORS auf Frontend beschränkt
- Keine sensiblen Daten in Git

### Bei Multi-User-Betrieb
- JWT-Authentifizierung
- Input-Validierung mit Zod
- Rate Limiting für API-Endpoints
- SQL Injection Prevention (Prisma)

## Troubleshooting

### Problem: Port bereits belegt
```bash
# Ändere Ports in .env
API_PORT=3002
VITE_PORT=5174
```

### Problem: Module werden nicht angezeigt
- Backend läuft? → `npm run dev:api`
- Korrekte API_PORT in .env?
- Browser-Console auf Fehler prüfen

## Contribution Guidelines

1. Branch erstellen: `git checkout -b feature/new-feature`
2. Änderungen committen: `git commit -m "feat: neue Funktion"`
3. Typen prüfen: `npm run type-check`
4. Pull Request erstellen

## Lizenz

Dieses Projekt dient ausschließlich zu Lernzwecken.
