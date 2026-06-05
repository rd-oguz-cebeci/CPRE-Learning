# Quick Start Guide - CPRE AI4RE Lern-App

## 1. Voraussetzungen pruefen

```powershell
node --version
npm --version
```

Falls Node.js fehlt:

```powershell
winget install OpenJS.NodeJS.LTS
```

## 2. Abhaengigkeiten installieren

```powershell
cd "c:\Users\A1900BC\OneDrive - REWE digital GmbH\Dokumente\13 Hacks\CPRE-Learning"
npm install
```

## 3. Umgebungsdatei anlegen

```powershell
Copy-Item .env.example .env
```

Standardwerte:

```env
API_PORT=3001
VITE_PORT=5173
CORS_ORIGIN=http://localhost:5173
```

## 4. Entwicklung starten

```powershell
npm run dev
```

Danach:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 5. Anwendung pruefen

### Lernbereich
1. `Lernmaterial` oeffnen
2. Modul auswaehlen
3. Lernplan, Zusammenfassung und Lerninhalt lesen

### Pruefungssimulation
1. `Pruefung` oeffnen
2. Simulation starten
3. Fragen beantworten
4. Ergebnis und Themenauswertung ansehen

## 6. Wichtige Hinweise

- Die Lerninhalte sind statisch im Projekt hinterlegt.
- Die Simulation zieht zufaellig aus 100 Fragen.
- Ergebnisse werden aktuell im Frontend-State berechnet und gehalten.

## Troubleshooting

### `node` oder `npm` nicht gefunden
- Node.js installieren und neues Terminal oeffnen

### Port belegt
- In `.env` `API_PORT` oder `VITE_PORT` aendern

### Module oder Fragen laden nicht
- Backend pruefen: http://localhost:3001/api/health
- Dev-Server neu starten: `npm run dev`

## Naechste Dateien fuer Content-Pflege

- `apps/api/src/data/modules.ts`
- `apps/api/src/data/examQuestions.ts`

**F: Kann ich die App auf einem anderen Rechner nutzen?**
A: Ja, kopiere einfach den ganzen Ordner und führe `npm install` erneut aus.

**F: Kann ich das Design anpassen?**
A: Ja! Bearbeite `apps/web/tailwind.config.js` und `apps/web/src/index.css`.

**F: Werden meine Daten gespeichert?**
A: Aktuell nein, alles ist flüchtig (In-Memory). Prisma-Schema ist für zukünftige Persistenz vorbereitet.

---

## ✅ Checkliste nach erfolgreichem Setup

- [ ] Node.js installiert und `node --version` funktioniert
- [ ] `npm install` erfolgreich durchgelaufen
- [ ] Backend startet ohne Fehler (`npm run dev:api`)
- [ ] Frontend startet ohne Fehler (`npm run dev:web`)
- [ ] http://localhost:5173 zeigt das Dashboard
- [ ] Ein Lernmodul kann ausgewählt werden
- [ ] Prüfungssimulation lädt Fragen
- [ ] Ergebnisse werden korrekt angezeigt

---

**🎉 Viel Erfolg beim Lernen für die CPRE AI4RE Prüfung!**
