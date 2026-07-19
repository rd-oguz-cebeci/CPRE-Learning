# CPRE AI4RE Lern-App

Statische Web-Anwendung zur Vorbereitung auf die **CPRE AI4RE Micro-Credential** Prüfung von IREB.

🌐 **Live**: [rd-oguz-cebeci.github.io/CPRE-Learning](https://rd-oguz-cebeci.github.io/CPRE-Learning/)

## Features

- 📚 11 redaktionell gepflegte Lernmodule entlang des IREB-Studienleitfadens, mit Mermaid-Diagrammen
- 🎯 144 redaktionelle Übungsfragen; jedes offizielle Lernziel mit A-, P- und K-Training
- ⏱️ Kuratierte Prüfungssimulation (22 Fragen, 30 Min, 80% Bestehensgrenze; A-, P- und K-Fragen)
- 📊 Detaillierte Auswertung nach Themenbereich mit Lernempfehlungen
- 🚀 Rein statisch — kein Backend nötig, gehostet via GitHub Pages

## Techstack

| Layer | Technologie |
|-------|-------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State | Zustand |
| Diagramme | Mermaid.js (SVG-Rendering) |
| Markdown | react-markdown |
| Hosting | GitHub Pages (via GitHub Actions) |

## Lokale Entwicklung

```bash
# Voraussetzung: Node.js >= 20
npm install
npm run build:data   # Generiert statische JSON aus TypeScript-Quellen
npm run dev          # Startet Frontend auf http://localhost:5173
```

## Build & Deployment

Der Build läuft automatisch via GitHub Actions bei Push auf `main`:

1. `npm ci` — Dependencies installieren
2. `npx tsx scripts/build-static.mjs` — Module + Fragen als JSON generieren
3. `npm run build --workspace=apps/web` — Vite Production Build
4. Deploy nach GitHub Pages

Manuell testen:

```bash
npm run build        # Baut Daten + Web
npx serve apps/web/dist  # Lokaler Preview
```

## Projektstruktur

```
CPRE-Learning/
├── .github/workflows/    # GitHub Actions (Pages Deploy)
├── apps/
│   ├── web/              # React Frontend (Vite + Tailwind)
│   └── api/src/data/     # Statische Datenquellen (Module, Fragen)
├── packages/shared/      # Gemeinsame TypeScript-Typen
├── scripts/              # Build-Skripte (JSON-Generierung)
└── docs/                 # Offizielle IREB PDFs + Architektur-Docs
```

## Prüfungsformat (AI4RE)

| Merkmal | Detail |
|---------|--------|
| Fragen | 22 (kuratiert aus dem Übungsfragenpool) |
| Zeit | 30 Minuten |
| Bestehen | 80% |
| Fragetypen | A (Einfachauswahl), P (Mehrfachauswahl), K (Richtig/Falsch) |
| Hilfsmittel | Open-Book (kein KI-Tool) |
| Gültigkeit | 3 Jahre |

## Quellen und Abgrenzung

Die Lerninhalte und die Prüfungslogik sind redaktionell aus den offiziellen IREB-Quellen abgeleitet:

- [AI4RE Micro-Credential Syllabus und Studienleitfaden](https://cpre.ireb.org/en/downloads-and-resources/downloads)
- [CPRE Micro-Credential Prüfungsordnung](https://cpre.ireb.org/en/downloads-and-resources/downloads)
- Lokale Referenzkopien in [docs/_extracted](docs/_extracted)

Die Fragen sind selbst erstellte Übungsfragen. Sie sind keine veröffentlichten oder rekonstruierten IREB-Originalprüfungsfragen. IREB veröffentlicht keine verbindliche Verteilung der Fragetypen; die Simulation garantiert deshalb Übung mit allen drei Formaten, ohne eine geheime Prüfungsform zu behaupten.
