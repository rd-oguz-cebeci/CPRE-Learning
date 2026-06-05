# CPRE AI4RE Lern-Anwendung

Eine lokale Web-Anwendung zum Lernen fuer die CPRE AI4RE Pruefung.

## Features

- Redaktionell gepflegte Lernmodule mit klarer Struktur
- Lernplan fuer die Pruefungsvorbereitung
- Kompakte Pruefungszusammenfassungen je Modul
- Pruefungssimulation mit Timer und Auswertung
- 100 hinterlegte Pruefungsfragen, aus denen zufaellig gezogen wird

## Voraussetzungen

### 1. Node.js installieren

```powershell
node --version
npm --version
```

Falls Node.js noch nicht installiert ist:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Installation

```powershell
npm install
Copy-Item .env.example .env
npm run db:migrate
```

## Entwicklung starten

```powershell
npm run dev
```

Danach laufen:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

Optional einzeln:

```powershell
npm run dev:web
npm run dev:api
```

## Projektidee

Die Anwendung konzentriert sich auf drei Lernbausteine:

1. Lernmodule mit fachlich strukturiertem Inhalt
2. Pruefungszusammenfassungen fuer schnelle Wiederholung
3. Simulationen, die zufaellig Fragen aus einem 100er-Pool ziehen

## Projektstruktur

```text
CPRE-Learning/
├── apps/
│   ├── web/              # React Frontend (Vite)
│   └── api/              # Express API mit Modulen und Fragenpool
├── packages/
│   └── shared/           # Gemeinsame TypeScript-Typen
└── docs/                 # Projektdokumentation
```

## Troubleshooting

**Problem: node oder npm nicht gefunden**
- Node.js neu installieren und neues Terminal oeffnen

**Problem: Port bereits belegt**
- `API_PORT` oder `VITE_PORT` in `.env` aendern

**Problem: Module werden nicht geladen**
- Backend pruefen: http://localhost:3001/api/health

## Lizenz

Dieses Projekt dient Lernzwecken.
