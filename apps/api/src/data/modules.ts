export const learningModules = [
    {
        id: 'plan',
        title: 'Lernplan und Prüfungshinweise',
        description: 'Überblick über den AI4RE-Lehrplan, Prüfungsformat und optimale Lernstrategie.',
        domain: 'Overview',
        summary: `## Überblick

Der AI4RE-Lehrplan umfasst **5 Kapitel** mit insgesamt **6 Stunden** Lernzeit. Die Prüfung besteht aus **22 zufällig ausgewählten Fragen**, die in **30 Minuten** bearbeitet werden müssen. Zum Bestehen sind **80 %** der Punkte erforderlich. Open-Book, aber keine KI-Hilfsmittel erlaubt.`,
        content: `# Lernplan und Prüfungsstrategie

## Syllabus-Überblick

Der AI4RE Advanced-Level-Lehrplan ist in **5 Kapitel** gegliedert:

\`\`\`mermaid
graph LR
    K1[Kapitel 1<br/>KI-Grundlagen<br/>0,5h] --> K2[Kapitel 2<br/>Ausgabequalität<br/>1h]
    K2 --> K3[Kapitel 3<br/>Risiken & Ethik<br/>1h]
    K3 --> K4[Kapitel 4<br/>RE-Aktivitäten<br/>2,5h]
    K4 --> K5[Kapitel 5<br/>Praktische Nutzung<br/>1h]
    style K1 fill:#e0f2fe
    style K2 fill:#dbeafe
    style K3 fill:#c7d2fe
    style K4 fill:#a5b4fc
    style K5 fill:#818cf8
\`\`\`

## Prüfungsformat

| Merkmal | Detail |
|---------|--------|
| Anzahl Fragen | 22 (zufällig aus Pool) |
| Zeit | 30 Minuten |
| Bestehensgrenze | 80 % |
| Hilfsmittel | Open-Book (kein KI-Tool erlaubt) |
| Fragetypen | A (Auswahl), P (Zuordnung/Picking), K (Kreuzworttabelle) |

## Fragentypen im Detail

\`\`\`mermaid
flowchart TB
    A[Fragetypen]
    A --> T1[A - Auswahlfrage]
    A --> T2[P - Picking/Zuordnung]
    A --> T3[K - Kreuzworttabelle]
    T1 --> D1[Genau 1 richtige Antwort<br/>aus mehreren Optionen]
    T2 --> D2[Mehrere richtige Antworten<br/>Punkte pro richtige Wahl<br/>Abzug pro falsche Wahl]
    T3 --> D3[Matrix mit Begriffen<br/>Zeile-Spalte-Zuordnungen<br/>Punkte pro korrekte Zelle]
    style A fill:#4f46e5,color:#fff
    style T1 fill:#e0e7ff
    style T2 fill:#e0e7ff
    style T3 fill:#e0e7ff
\`\`\`

## Kognitive Stufen (K-Levels)

\`\`\`mermaid
flowchart LR
    K1L[K1 - Kennen] --> K2L[K2 - Verstehen]
    K1L --> B1[Fakten wiedergeben<br/>Begriffe benennen<br/>Listen aufzählen]
    K2L --> B2[Konzepte erklären<br/>Unterschiede beschreiben<br/>Zusammenhänge darstellen]
    style K1L fill:#10b981,color:#fff
    style K2L fill:#3b82f6,color:#fff
\`\`\`

- **K1 (Kennen)**: Reine Wissenswiedergabe - "Was ist X?", "Nenne die Schritte von Y"
- **K2 (Verstehen)**: Zusammenhänge erklären - "Warum ist X besser als Y?", "Beschreibe den Unterschied"

## Prüfungstaktik

1. **Zeitmanagement**: 30 Min / 22 Fragen = ca. 80 Sek. pro Frage
2. Absolute Aussagen ("immer", "nie", "vollautomatisch") hinterfragen
3. Antworten mit "ohne Review/Validierung" sind fast immer falsch
4. Bei Unsicherheit: Welche Antwort betont menschliche Verantwortung?
5. P-Fragen: Lieber eine richtige weglassen als eine falsche markieren
`,
        keywords: ['Lernplan', 'Syllabus', '22 Fragen', '30 Minuten', '80 Prozent', 'Prüfungstaktik'],
        difficulty: 'beginner' as const,
    },
    {
        id: 'chapter1',
        title: 'Kapitel 1: KI-Grundlagen',
        description: 'KI-Schlüsseltechnologien, Chatbot-Pipeline und RAG versus Fine-Tuning (K2, 0,5 Stunden).',
        domain: 'AI Fundamentals',
        summary: `## Wichtige Erkenntnisse (offizielle Zusammenfassung)

- KI hat viel mehr zu bieten als Chatbots. Für manche Aufgaben sind LLMs nicht das richtige Werkzeug.
- Die richtige KI-Technologie für die Aufgabe auszuwählen ist der Schlüssel zum bestmöglichen Ergebnis.
- Das Hinzufügen von Wissen kann durch **Fine-Tuning** (ins Modell einbetten) oder **RAG** (externe Quellen dynamisch anbinden) erfolgen.
- RAG hält Inhalte frisch und nachvollziehbar; Fine-Tuning eignet sich für stabiles, wiederkehrendes Wissen.
- Requirements Engineers müssen die Pipeline verstehen, um Ergebnisse richtig einschätzen zu können.
`,
        content: `# Kapitel 1: KI-Grundlagen (K2)

## Lernziele

- **LZ 1.1** (K1): Kennen der Vielfalt der KI-Technologien und ihrer Anwendungsbereiche - nicht jede KI ist ein Chatbot.
- **LZ 1.2** (K2): Erklären, was bei der Interaktion mit einem Chatbot hinter den Kulissen passiert, RAG beschreiben und mit Fine-Tuning vergleichen.

---

## 1.1 KI-Schlüsseltechnologien

KI umfasst alle Methoden, die es Computern ermöglichen, auf eine Weise wahrzunehmen, zu schlussfolgern oder zu handeln, die wir als intelligent bezeichnen.

### Die fünf Kerntechnologien

| Technologie | Was sie tut | RE-Bezug |
|---|---|---|
| ML / Deep Learning | Lernt Muster direkt aus Daten | Klassifikation, Priorisierung |
| Computer Vision | Verwandelt Pixel in strukturierte Fakten | UI-Analyse, Mockup-Erkennung |
| NLP / LLMs | Wandelt Sprache in Bedeutung und umgekehrt | Textgenerierung, Zusammenfassung |
| Robotik | Navigiert + manipuliert physische Welt | Sensorik, Steuerung |
| Expertensysteme | Regelbasiert, deterministisch, nachprüfbar | Konsistenzprüfung, Validierung |

\`\`\`mermaid
mindmap
  root((KI-Technologien))
    ML / Deep Learning
      Mustererkennung
      Klassifikation
      Neuronale Netze
    Computer Vision
      Bilderkennung
      UI-Analyse
      OCR
    NLP / LLMs
      Textgenerierung
      Zusammenfassung
      Chatbots
    Robotik
      Sensorik
      Navigation
      Manipulation
    Expertensysteme
      Regelbasiert
      Deterministisch
      Nachprüfbar
\`\`\`

### Prüfungsrelevanz

- Chatbots sind nur *ein* KI-Tool; Transkription (Speech-to-Text) und UI-Analyse (Computer Vision) sind oft in einer Schnittstelle integriert.
- Multimodale Modelle kombinieren mehrere Fähigkeiten in einem System.

---

## 1.2 Vom Prompt zur Antwort: Die Chatbot-Pipeline

### Verarbeitungsschritte

\`\`\`mermaid
flowchart TD
    A[Benutzer-Eingabe<br/>Prompt + Dateien + Historie] --> B[Tokenisierung<br/>Text wird in Token zerlegt]
    B --> C[Kontextfenster<br/>System-Prompt + RAG-Daten + Chat-Verlauf]
    C --> D[LLM-Inferenz<br/>Token-für-Token Vorhersage]
    D --> E[Ausgabefilter<br/>Guardrails, Safety, Format]
    E --> F[Antwort an Benutzer]
    
    G[RAG-Retrieval<br/>Externe Dokumente] -.-> C
    H[Fine-Tuning<br/>Modell-Anpassung] -.-> D
    
    style A fill:#dbeafe
    style D fill:#fef3c7
    style F fill:#d1fae5
    style G fill:#e0e7ff
    style H fill:#fce7f3
\`\`\`

### Schlüsselkonzepte

| Begriff | Erklärung |
|---------|------------|
| Token | Kleinste Verarbeitungseinheit (ca. 3/4 eines Wortes) |
| Kontextfenster | Maximale Eingabelänge (z.B. 128k Token bei GPT-4) |
| Temperatur | 0 = deterministisch, 1 = kreativ/variabel |
| System-Prompt | Unsichtbare Anweisung, die Verhalten steuert |

### Token-Vorhersage (Autoregressive Generierung)

\`\`\`mermaid
flowchart LR
    T1[Die] --> T2[Anforderung]
    T2 --> T3[muss]
    T3 --> T4[testbar]
    T4 --> T5[sein]
    T5 --> T6[...]
    
    T3 --> |P=0.4| T4
    T3 --> |P=0.3| T4b[klar]
    T3 --> |P=0.2| T4c[eindeutig]
    
    style T4 fill:#10b981,color:#fff
    style T4b fill:#94a3b8
    style T4c fill:#94a3b8
\`\`\`

> **Wichtig**: Das Modell "weiß" nichts - es berechnet statistische Wahrscheinlichkeiten für das nächste Token. Deshalb sind Halluzinationen möglich.

---

## 1.3 RAG vs. Fine-Tuning

\`\`\`mermaid
flowchart LR
    subgraph RAG[RAG - Retrieval Augmented Generation]
        direction TB
        R1[Dokumente indexieren] --> R2[Relevante Abschnitte suchen]
        R2 --> R3[In Prompt einfügen]
        R3 --> R4[LLM generiert Antwort]
    end
    
    subgraph FT[Fine-Tuning]
        direction TB
        F1[Trainingsdaten vorbereiten] --> F2[Modell nachtrainieren]
        F2 --> F3[Neues Modell deployen]
        F3 --> F4[Modell antwortet direkt]
    end
    
    style RAG fill:#ecfdf5
    style FT fill:#fef2f2
\`\`\`

| Kriterium | RAG | Fine-Tuning |
|-----------|-----|-------------|
| Aktualität | Immer aktuell (live-Daten) | Snapshot zum Trainingszeitpunkt |
| Nachvollziehbarkeit | Hoch (Quellen zitierbar) | Gering (im Modell "vergraben") |
| Aufwand | Mittel (Retrieval-Pipeline) | Hoch (GPU, Daten, Training) |
| Kosten pro Anfrage | Höher (mehr Token im Prompt) | Niedriger (kompaktes Modell) |
| Anwendungsfall | Firmen-Wikis, sich ändernde Daten | Stabiler Stil, festes Domänenwissen |

### Prüfungsrelevanz

- **RAG** = dynamisch, nachvollziehbar, teurer pro Anfrage
- **Fine-Tuning** = statisch, günstiger, aber veralterungsgefährdet
- Kombination möglich und häufig
`,
        keywords: ['KI-Technologien', 'Chatbot-Pipeline', 'RAG', 'Fine-Tuning', 'Token', 'Kontextfenster', 'LLM'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'chapter2',
        title: 'Kapitel 2: Ausgabequalität steuern',
        description: 'Wie man LLM-Ergebnisse durch Prompting und Kontext optimiert (K2, 1 Stunde).',
        domain: 'Output Quality',
        summary: `## Wichtige Erkenntnisse

- Die Qualität der KI-Ausgabe hängt primär von der Qualität des Inputs ab (Prompt + Kontext).
- Halluzinationen sind systembedingt und können nie vollständig eliminiert werden.
- Drei Hebel zur Qualitätssteigerung: besserer Kontext, präzisere Prompts, systematische Validierung.
- Das RTF-Pattern (Rolle-Task-Format) ist eine bewährte Prompting-Strategie.
`,
        content: `# Kapitel 2: Ausgabequalität steuern (K2)

## Lernziele

- **LZ 2.1** (K1): Grunde kennen, warum KI-Ausgaben fehlerhaft sein können (Halluzinationen, Bias, veraltetes Wissen).
- **LZ 2.2** (K2): Erklären, wie Kontext und Prompt-Design die Ausgabequalität beeinflussen.
- **LZ 2.3** (K2): Techniken zur Qualitätssteigerung beschreiben (Few-Shot, Chain-of-Thought, RTF).

---

## 2.1 Warum KI-Ausgaben fehlerhaft sein können

### Halluzinationen

\`\`\`mermaid
flowchart LR
    A[Eingabe-Prompt] --> B{LLM-Inferenz}
    B --> C[Korrekte Antwort<br/>Statistisch wahrscheinlich<br/>UND faktisch richtig]
    B --> D[Halluzination<br/>Statistisch wahrscheinlich<br/>ABER faktisch falsch]
    
    D --> E[Ursachen]
    E --> E1[Trainingsdaten veraltet]
    E --> E2[Wissen nicht vorhanden]
    E --> E3[Konflikte in Daten]
    E --> E4[Overconfidence des Modells]
    
    style C fill:#d1fae5
    style D fill:#fee2e2
    style E fill:#fef3c7
\`\`\`

> **Merksatz**: Halluzinationen sind KEIN Bug - sie sind eine Systemeigenschaft statistischer Sprachmodelle. Sie können reduziert, aber nie eliminiert werden.

### Weitere Fehlerquellen

| Fehlerquelle | Beschreibung | Gegenmaßnahme |
|---|---|---|
| Bias | Verzerrungen aus Trainingsdaten | Diverse Quellen, kritische Prüfung |
| Veraltetes Wissen | Trainings-Cutoff | RAG mit aktuellen Quellen |
| Kontextverlust | Zu lange Gespräche | Zusammenfassungen, Reset |
| Overfit auf Prompt | Modell "gefällt" statt informiert | Neutrale Formulierungen |

---

## 2.2 Die drei Qualitätsebenen

\`\`\`mermaid
flowchart TB
    subgraph Ebene1[Ebene 1: Kontext]
        direction LR
        K1[System-Prompt] --- K2[RAG-Dokumente] --- K3[Chat-Historie]
    end
    
    subgraph Ebene2[Ebene 2: Prompt-Qualität]
        direction LR
        P1[Klarheit] --- P2[Spezifität] --- P3[Struktur]
    end
    
    subgraph Ebene3[Ebene 3: Validierung]
        direction LR
        V1[Menschliches Review] --- V2[Cross-Check] --- V3[Iterative Verbesserung]
    end
    
    Ebene1 --> Ebene2 --> Ebene3
    
    style Ebene1 fill:#dbeafe
    style Ebene2 fill:#fef3c7
    style Ebene3 fill:#d1fae5
\`\`\`

### Kontext-Hierarchie

| Kontext-Typ | Priorität | Beispiel |
|---|---|---|
| System-Prompt | Höchste | "Du bist ein RE-Experte..." |
| RAG-Dokumente | Hoch | Firmen-Glossar, Templates |
| Few-Shot-Beispiele | Mittel | Beispiel-Requirements |
| Chat-Historie | Niedrig | Vorherige Nachrichten |

---

## 2.3 Prompting-Techniken

### Das RTF-Pattern (Rolle - Task - Format)

\`\`\`mermaid
flowchart LR
    R[Rolle<br/>Wer soll das LLM sein?] --> T[Task<br/>Was genau soll es tun?]
    T --> F[Format<br/>Wie soll die Ausgabe aussehen?]
    
    R --> R1[z.B. Senior RE mit<br/>10 Jahren Erfahrung]
    T --> T1[z.B. Analysiere diese<br/>Stakeholder-Anforderung]
    F --> F1[z.B. Ausgabe als<br/>User Story mit AC]
    
    style R fill:#c7d2fe
    style T fill:#fde68a
    style F fill:#a7f3d0
\`\`\`

### Weitere Prompting-Strategien

\`\`\`mermaid
flowchart TB
    PS[Prompting-Strategien]
    PS --> ZS[Zero-Shot<br/>Direkte Frage ohne Beispiel]
    PS --> FS[Few-Shot<br/>2-3 Beispiele voranstellen]
    PS --> CoT[Chain-of-Thought<br/>Schritt-für-Schritt denken lassen]
    PS --> SC[Self-Consistency<br/>Mehrfach generieren und vergleichen]
    PS --> RR[Role-Playing<br/>Persona zuweisen]
    
    FS --> FSE[Beispiel: Hier sind 2 gute User Stories...<br/>Schreibe nun eine für...]
    CoT --> CoTE[Beispiel: Denke Schritt für Schritt...<br/>1. Identifiziere... 2. Analysiere...]
    
    style PS fill:#4f46e5,color:#fff
    style FS fill:#e0e7ff
    style CoT fill:#e0e7ff
\`\`\`

### Prüfungsrelevanz

- RTF ist die Mindeststruktur für einen guten Prompt
- Few-Shot-Beispiele verbessern Konsistenz erheblich
- Chain-of-Thought reduziert logische Fehler
- **Kein Prompting ersetzt menschliche Validierung!**
`,
        keywords: ['Halluzination', 'Prompt-Engineering', 'RTF', 'Few-Shot', 'Chain-of-Thought', 'Kontext', 'Qualität'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'chapter3',
        title: 'Kapitel 3: Risiken und Ethik',
        description: 'Risiken beim KI-Einsatz im RE, ethische Aspekte und EU AI Act (K2, 1 Stunde).',
        domain: 'Risks & Ethics',
        summary: `## Wichtige Erkenntnisse

- Es gibt **10 zentrale Risiken** beim KI-Einsatz im RE (prüfungsrelevant!).
- Der EU AI Act klassifiziert KI-Systeme nach Risikostufen.
- Menschliche Verantwortung bleibt IMMER bestehen - KI ist Werkzeug, nicht Entscheider.
- Bias in Trainingsdaten führt zu Bias in Ergebnissen - Requirements Engineers müssen dies erkennen.
`,
        content: `# Kapitel 3: Risiken und Ethik (K2)

## Lernziele

- **LZ 3.1** (K1): Die wichtigsten Risiken beim Einsatz von KI im RE kennen.
- **LZ 3.2** (K2): Ethische Implikationen und regulatorische Rahmenbedingungen erklären.
- **LZ 3.3** (K2): Strategien zur Risikominimierung beschreiben.

---

## 3.1 Die 10 zentralen Risiken

\`\`\`mermaid
flowchart TB
    R[10 Risiken beim KI-Einsatz im RE]
    R --> R1[1. Halluzinationen<br/>Falsche aber plausible Fakten]
    R --> R2[2. Bias & Diskriminierung<br/>Verzerrte Trainingsdaten]
    R --> R3[3. Datenschutz<br/>Sensitive Daten im Prompt]
    R --> R4[4. IP / Urheberrecht<br/>Wem gehört der Output?]
    R --> R5[5. Overreliance<br/>Blindes Vertrauen in KI]
    R --> R6[6. Deskilling<br/>Fähigkeitsverlust bei Menschen]
    R --> R7[7. Intransparenz<br/>Black-Box-Entscheidungen]
    R --> R8[8. Vendor Lock-in<br/>Abhängigkeit von Anbieter]
    R --> R9[9. Sicherheit<br/>Prompt Injection, Manipulation]
    R --> R10[10. Verantwortungsdiffusion<br/>Wer haftet bei Fehlern?]
    
    style R fill:#dc2626,color:#fff
    style R1 fill:#fee2e2
    style R2 fill:#fee2e2
    style R3 fill:#fee2e2
    style R5 fill:#fef3c7
    style R6 fill:#fef3c7
    style R10 fill:#fef3c7
\`\`\`

### Detailbetrachtung der Top-Risiken

| Risiko | Auswirkung im RE | Gegenmaßnahme |
|--------|-----------------|----------------|
| Halluzinationen | Falsche Requirements werden übernommen | Review, Traceability, Quellencheck |
| Bias | Bestimmte Nutzergruppen werden ausgeschlossen | Diverse Stakeholder, Bias-Audit |
| Datenschutz | Kundendaten landen bei KI-Anbieter | On-Premise, Anonymisierung, DPA |
| Overreliance | Kritisches Denken nimmt ab | Pflicht-Reviews, Checklisten |
| Verantwortungsdiffusion | Niemand fühlt sich zuständig | Klare Rollen, RACI, Governance |

---

## 3.2 Der EU AI Act (Überblick)

\`\`\`mermaid
flowchart TB
    EU[EU AI Act - Risikostufen]
    EU --> U[Unacceptable Risk<br/>VERBOTEN]
    EU --> H[High Risk<br/>Strenge Auflagen]
    EU --> L[Limited Risk<br/>Transparenzpflichten]
    EU --> M[Minimal Risk<br/>Keine Auflagen]
    
    U --> U1[Social Scoring<br/>Biometrische Massenüberwachung]
    H --> H1[Kritische Infrastruktur<br/>Personalauswahl<br/>Kreditvergabe]
    L --> L1[Chatbots müssen sich<br/>als KI kennzeichnen]
    M --> M1[Spam-Filter<br/>Spiele-KI]
    
    style U fill:#dc2626,color:#fff
    style H fill:#f97316,color:#fff
    style L fill:#eab308,color:#fff
    style M fill:#22c55e,color:#fff
\`\`\`

### Prüfungsrelevanz EU AI Act

- RE-Werkzeuge mit KI fallen meist unter **Limited Risk** oder **Minimal Risk**
- Wenn KI-generierte Requirements in sicherheitskritische Systeme fließen: **High Risk** möglich
- Kennzeichnungspflicht: KI-generierte Artefakte müssen als solche erkennbar sein

---

## 3.3 Ethische Prinzipien

| Prinzip | Bedeutung für RE |
|---------|-------------------|
| Transparenz | Stakeholder wissen, dass KI eingesetzt wird |
| Fairness | Keine Gruppe wird durch KI-Bias benachteiligt |
| Verantwortlichkeit | Mensch bleibt verantwortlich für Ergebnisse |
| Datenschutz | Personenbezogene Daten werden geschützt |
| Erklärbarkeit | Entscheidungswege sind nachvollziehbar |

### Die goldene Regel

> **KI unterstützt - der Mensch entscheidet und verantwortet.**
> 
> In der Prüfung ist jede Antwort falsch, die suggeriert, KI könne autonom und ohne menschliche Prüfung Requirements finalisieren.

---

## 3.4 Risikominimierung in der Praxis

\`\`\`mermaid
flowchart LR
    subgraph Technisch[Technische Massnahmen]
        T1[Guardrails] --- T2[Logging] --- T3[Sandboxing]
    end
    
    subgraph Organisatorisch[Organisatorische Massnahmen]
        O1[Governance] --- O2[Schulung] --- O3[Audits]
    end
    
    subgraph Prozessual[Prozessuale Massnahmen]
        P1[Review-Gates] --- P2[4-Augen-Prinzip] --- P3[Checklisten]
    end
    
    Technisch --> Ergebnis[Kontrollierter<br/>KI-Einsatz]
    Organisatorisch --> Ergebnis
    Prozessual --> Ergebnis
    
    style Ergebnis fill:#10b981,color:#fff
\`\`\`
`,
        keywords: ['Risiken', 'Ethik', 'EU AI Act', 'Halluzination', 'Bias', 'Datenschutz', 'Verantwortung', 'Overreliance'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'chapter4',
        title: 'Kapitel 4: RE-Aktivitäten mit KI',
        description: 'KI-Unterstützung in den vier RE-Kernaktivitäten: Ermittlung, Dokumentation, Validierung, Verwaltung (K2, 2,5 Stunden).',
        domain: 'RE Activities',
        summary: `## Wichtige Erkenntnisse

- KI kann alle **4 RE-Kernaktivitäten** unterstützen, aber nie ersetzen.
- Der RE prüft, bewertet und finalisiert - KI liefert Entwürfe und Vorschläge.
- Besonders wertvoll: Konsistenzprüfung, Stakeholder-Analyse, Template-Generierung.
- Die Rolle des RE erweitert sich um "KI-Kompetenz" als Querschnittsfähigkeit.
`,
        content: `# Kapitel 4: RE-Aktivitäten mit KI (K2)

## Lernziele

- **LZ 4.1** (K1): Die vier RE-Kernaktivitäten und ihre KI-Unterstützungsmöglichkeiten kennen.
- **LZ 4.2** (K2): Für jede Aktivität erklären, wie KI konkret unterstützen kann.
- **LZ 4.3** (K2): Die erweiterte Rolle des RE im KI-Kontext beschreiben.

---

## Die vier RE-Kernaktivitäten im Überblick

\`\`\`mermaid
flowchart TB
    RE[Requirements Engineering]
    RE --> E[Ermittlung<br/>Elicitation]
    RE --> D[Dokumentation<br/>Documentation]
    RE --> V[Validierung<br/>Validation & Negotiation]
    RE --> VW[Verwaltung<br/>Management]
    
    E --> E1[Stakeholder identifizieren<br/>Anforderungen erheben<br/>Interviews führen]
    D --> D1[Requirements schreiben<br/>Modelle erstellen<br/>Spezifikationen pflegen]
    V --> V1[Konsistenz prüfen<br/>Konflikte lösen<br/>Abnahme organisieren]
    VW --> VW1[Änderungen verfolgen<br/>Traceability sichern<br/>Versionen verwalten]
    
    style RE fill:#4f46e5,color:#fff
    style E fill:#dbeafe
    style D fill:#d1fae5
    style V fill:#fef3c7
    style VW fill:#fce7f3
\`\`\`

---

## 4.1 Ermittlung (Elicitation)

### KI-Unterstützung bei der Ermittlung

\`\`\`mermaid
flowchart LR
    subgraph Input[Eingaben für KI]
        I1[Bestehendes System] 
        I2[Stakeholder-Liste]
        I3[Domänenwissen]
    end
    
    subgraph KI[KI-Unterstützung]
        K1[Stakeholder-Analyse<br/>Wer fehlt noch?]
        K2[Interview-Fragen<br/>generieren]
        K3[Lücken-Analyse<br/>Was wurde übersehen?]
        K4[Personas erstellen]
    end
    
    subgraph Output[RE prüft & ergänzt]
        O1[Validierte<br/>Stakeholder-Map]
        O2[Interview-Leitfaden]
        O3[Vollständigkeits-Check]
    end
    
    Input --> KI --> Output
    
    style KI fill:#e0e7ff
    style Output fill:#d1fae5
\`\`\`

### Konkrete Anwendungsbeispiele

| Aufgabe | KI-Beitrag | RE-Verantwortung |
|---------|------------|------------------|
| Stakeholder-Identifikation | Vorschläge basierend auf Projekttyp | Validierung, Priorisierung |
| Interview-Vorbereitung | Fragenkatalog generieren | Anpassung an Kontext |
| Dokumenten-Analyse | Extraktion aus Altdokumenten | Relevanz bewerten |
| Kreativität | Brainstorming-Ideen | Machbarkeit prüfen |

---

## 4.2 Dokumentation

### KI-Unterstützung bei der Dokumentation

\`\`\`mermaid
flowchart TB
    subgraph Input2[Eingabe]
        DI1[Rohe Notizen<br/>Interview-Transkripte]
        DI2[Template-Vorgaben<br/>Firmenstandards]
    end
    
    subgraph KI2[KI-Unterstützung]
        DK1[User Stories formulieren]
        DK2[Akzeptanzkriterien ableiten]
        DK3[Glossar-Einträge erstellen]
        DK4[Modelle skizzieren]
        DK5[Qualität prüfen<br/>INVEST, Sprachregeln]
    end
    
    subgraph Output2[RE-Aufgabe]
        DO1[Inhaltlich prüfen]
        DO2[Stakeholder-Feedback einholen]
        DO3[Freigabe erteilen]
    end
    
    Input2 --> KI2 --> Output2
    
    style KI2 fill:#d1fae5
    style Output2 fill:#fef3c7
\`\`\`

### Qualitätskriterien für Requirements (KI-unterstützte Prüfung)

**Kriterium: Eindeutigkeit**
- KI kann prüfen: Mehrdeutige Wörter erkennen
- Mensch muss prüfen: Fachliche Korrektheit

**Kriterium: Testbarkeit**
- KI kann prüfen: Sind messbare Kriterien vorhanden?
- Mensch muss prüfen: Sinnhaftigkeit der Metrik

**Kriterium: Vollständigkeit**
- KI kann prüfen: Fehlende Standardabschnitte identifizieren
- Mensch muss prüfen: Fachliche Lücken erkennen

**Kriterium: Konsistenz**
- KI kann prüfen: Widersprüche zu anderen Requirements erkennen
- Mensch muss prüfen: Prioritätskonflikte bewerten

---

## 4.3 Validierung und Verhandlung

### KI-Unterstützung bei der Validierung

\`\`\`mermaid
flowchart LR
    subgraph Ohne[Ohne KI]
        direction TB
        O1[Manuelles Lesen<br/>aller Requirements]
        O2[Review-Meetings<br/>zeitintensiv]
        O3[Checklisten<br/>abarbeiten]
    end
    
    subgraph Mit[Mit KI]
        direction TB
        M1[Automatische<br/>Konsistenzprüfung]
        M2[Widersprüche<br/>aufzeigen]
        M3[Testfälle<br/>generieren]
        M4[Lücken<br/>identifizieren]
    end
    
    Ohne --> |KI ergänzt| Mit
    Mit --> Ergebnis2[RE entscheidet<br/>über Änderungen]
    
    style Mit fill:#d1fae5
    style Ergebnis2 fill:#fef3c7
\`\`\`

### Validierungs-Checkliste mit KI

1. **Konsistenz**: KI vergleicht alle Requirements auf Widersprüche.
2. **Vollständigkeit**: KI prüft gegen Checkliste und Template.
3. **Testbarkeit**: KI schlägt Testfälle vor.
4. **Verständlichkeit**: KI identifiziert Fachjargon und Mehrdeutigkeiten.
5. **Machbarkeit**: RE bewertet; KI kann hier nur eingeschränkt helfen.

---

## 4.4 Verwaltung (Management)

### KI-Unterstützung bei der Verwaltung

**Aufgabe: Traceability**
- KI-Unterstützung: Automatische Verlinkung von Requirements zu Tests und Code

**Aufgabe: Impact-Analyse**
- KI-Unterstützung: "Welche Requirements sind betroffen, wenn sich X ändert?"

**Aufgabe: Priorisierung**
- KI-Unterstützung: Vorschläge basierend auf Abhängigkeiten

**Aufgabe: Statusverfolgung**
- KI-Unterstützung: Zusammenfassung von Änderungshistorien

---

## 4.5 Die erweiterte Rolle des RE

\`\`\`mermaid
flowchart TB
    subgraph Klassisch[Klassischer RE]
        K1R[Ermitteln]
        K2R[Dokumentieren]
        K3R[Validieren]
        K4R[Verwalten]
    end
    
    subgraph Erweitert[RE + KI-Kompetenz]
        E1R[Ermitteln<br/>+ KI als Brainstorming-Partner]
        E2R[Dokumentieren<br/>+ KI als Schreibassistent]
        E3R[Validieren<br/>+ KI als Prüf-Tool]
        E4R[Verwalten<br/>+ KI als Analyse-Helfer]
        E5R[NEU: KI-Ergebnisse<br/>kritisch bewerten]
        E6R[NEU: Prompts<br/>effektiv formulieren]
    end
    
    Klassisch --> |Evolution| Erweitert
    
    style Klassisch fill:#e0e7ff
    style Erweitert fill:#d1fae5
    style E5R fill:#fef3c7
    style E6R fill:#fef3c7
\`\`\`

### Prüfungsrelevanz

> **Kernaussage**: Die Rolle des RE wird erweitert, nicht ersetzt. Der RE bekommt zusätzliche Kompetenzen:
> - KI-Output kritisch bewerten
> - Effektive Prompts formulieren
> - Wissen, wann KI hilft und wann nicht
> - Ethische und rechtliche Grenzen kennen
`,
        keywords: ['Ermittlung', 'Dokumentation', 'Validierung', 'Verwaltung', 'RE-Rolle', 'KI-Unterstützung', 'Review'],
        difficulty: 'advanced' as const,
    },
    {
        id: 'chapter5',
        title: 'Kapitel 5: Praktische Nutzung',
        description: 'Einführungsstrategien, Toolauswahl und organisatorische Aspekte (K2, 1 Stunde).',
        domain: 'Practical Use',
        summary: `## Wichtige Erkenntnisse

- KI-Einführung erfordert eine durchdachte Strategie (nicht einfach "Tool kaufen und nutzen").
- Pilotprojekte mit klarem Scope und Erfolgskriterien starten.
- Change Management und Schulung sind erfolgskritisch.
- Toolauswahl: Datenschutz, Integration, Kosten und Vendor-Lock-in beachten.
`,
        content: `# Kapitel 5: Praktische Nutzung (K2)

## Lernziele

- **LZ 5.1** (K1): Schritte zur Einführung von KI-Werkzeugen im RE kennen.
- **LZ 5.2** (K2): Kriterien für die Toolauswahl und Einführungsstrategie erklären.
- **LZ 5.3** (K2): Organisatorische Voraussetzungen und Change Management beschreiben.

---

## 5.1 Einführungsstrategie

\`\`\`mermaid
flowchart LR
    S1[1. Analyse<br/>Ist-Zustand] --> S2[2. Zieldefinition<br/>Was soll KI verbessern?]
    S2 --> S3[3. Pilot<br/>Kleines Projekt]
    S3 --> S4[4. Evaluation<br/>Lessons Learned]
    S4 --> S5[5. Rollout<br/>Schrittweise Ausweitung]
    S5 --> S6[6. Kontinuierliche<br/>Verbesserung]
    
    S4 --> |Bei Misserfolg| S2
    
    style S1 fill:#dbeafe
    style S3 fill:#d1fae5
    style S5 fill:#fef3c7
    style S6 fill:#c7d2fe
\`\`\`

### Pilot-Projekt Erfolgsfaktoren

| Faktor | Beschreibung |
|--------|-------------|
| Klarer Scope | Abgegrenztes Thema, überschaubare Komplexität |
| Messbare Ziele | z.B. "30% weniger Zeit für Erstdokumentation" |
| Motiviertes Team | Early Adopters als Piloten |
| Management-Support | Budget und Rückendeckung gesichert |
| Feedback-Schleifen | Regelmäßige Retrospektiven |

---

## 5.2 Toolauswahl-Kriterien

\`\`\`mermaid
flowchart TB
    TA[Tool-Auswahl Kriterien]
    TA --> DS[Datenschutz<br/>Wo werden Daten verarbeitet?<br/>DSGVO-Konformität?]
    TA --> IN[Integration<br/>Passt ins bestehende<br/>Tool-Ökosystem?]
    TA --> KO[Kosten<br/>Lizenz, Training,<br/>Betrieb, Wartung]
    TA --> VL[Vendor Lock-in<br/>Wie abhängig werden wir?<br/>Exit-Strategie?]
    TA --> QU[Qualität<br/>Wie gut sind Ergebnisse<br/>in unserer Domäne?]
    TA --> US[Usability<br/>Wie steil ist die<br/>Lernkurve?]
    
    style TA fill:#4f46e5,color:#fff
    style DS fill:#fee2e2
    style VL fill:#fef3c7
\`\`\`

### Datenschutz-Entscheidungsbaum

| Datentyp | Cloud-LLM ok? | Empfehlung |
|----------|---------------|------------|
| Öffentliche Infos | Ja | Beliebiges Tool |
| Interne Prozesse | Bedingt | DPA prüfen, EU-Server |
| Personenbezogene Daten | Nein | On-Premise / lokales Modell |
| Geschäftsgeheimnisse | Nein | On-Premise / Air-Gapped |

---

## 5.3 Organisatorische Voraussetzungen

\`\`\`mermaid
flowchart TB
    subgraph Menschen[Menschen]
        M1[Schulung & Weiterbildung]
        M2[KI-Champions im Team]
        M3[Management-Commitment]
    end
    
    subgraph Prozesse[Prozesse]
        P1[KI-Governance definieren]
        P2[Review-Prozesse anpassen]
        P3[Qualitätsmetriken festlegen]
    end
    
    subgraph Technik[Technik]
        T1[Infrastruktur bereitstellen]
        T2[Datenpipelines aufbauen]
        T3[Monitoring einrichten]
    end
    
    Menschen --> Erfolg[Erfolgreicher<br/>KI-Einsatz]
    Prozesse --> Erfolg
    Technik --> Erfolg
    
    style Erfolg fill:#10b981,color:#fff
    style Menschen fill:#dbeafe
    style Prozesse fill:#fef3c7
    style Technik fill:#d1fae5
\`\`\`

### Change Management

> **Merksatz**: Technologie einzuführen ist 20% des Aufwands. Die Menschen mitzunehmen sind die anderen 80%.

Häufige Widerstände und Strategien:

| Widerstand | Strategie |
|-----------|-----------|
| "KI ersetzt mich" | Aufzeigen: KI erweitert, ersetzt nicht |
| "Ich vertraue dem nicht" | Transparenz über Grenzen, Piloten zeigen |
| "Zu kompliziert" | Niedrigschwelliger Einstieg, Buddies |
| "Datenschutz-Bedenken" | Governance vorab klären, kommunizieren |

---

## 5.4 Zusammenfassung: KI im RE-Alltag

\`\`\`mermaid
flowchart LR
    subgraph DO[Do - Empfohlen]
        D1[KI als Entwurfs-Helfer]
        D2[Immer validieren]
        D3[Schrittweise einführen]
        D4[Team schulen]
        D5[Governance etablieren]
    end
    
    subgraph DONT[Dont - Vermeiden]
        N1[Blind vertrauen]
        N2[Sensitive Daten eingeben]
        N3[Big-Bang-Einführung]
        N4[Ohne Strategie starten]
        N5[KI als Ersatz sehen]
    end
    
    style DO fill:#d1fae5
    style DONT fill:#fee2e2
\`\`\`
`,
        keywords: ['Einführung', 'Toolauswahl', 'Datenschutz', 'Change Management', 'Pilot', 'Governance', 'Strategie'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'terminology',
        title: 'Glossar und Begriffe',
        description: 'Alle prüfungsrelevanten Fachbegriffe mit Definitionen und Abgrenzungen.',
        domain: 'Terminology',
        summary: `## Wichtige Erkenntnisse

- Präzise Begriffskenntnisse sind für K1-Fragen entscheidend.
- Verwechslungsgefahr besteht besonders bei: RAG vs. Fine-Tuning, Prompt vs. System-Prompt, Halluzination vs. Bias.
- Der offizielle Syllabus definiert die Begriffe - eigene Interpretationen zählen nicht.
`,
        content: `# Glossar und Begriffe

## Kern-Terminologie

\`\`\`mermaid
flowchart TB
    subgraph Modell[Modell & Training]
        LLM[LLM<br/>Large Language Model]
        FT[Fine-Tuning<br/>Modell nachtrainieren]
        TK[Token<br/>Kleinste Verarbeitungseinheit]
        KF[Kontextfenster<br/>Max. Eingabelänge]
    end
    
    subgraph Retrieval[Wissensanbindung]
        RAG[RAG<br/>Retrieval Augmented Generation]
        EMB[Embedding<br/>Vektor-Repräsentation]
        VDB[Vektordatenbank<br/>Semantische Suche]
    end
    
    subgraph Interaktion[Interaktion]
        PR[Prompt<br/>Benutzer-Eingabe]
        SP[System-Prompt<br/>Unsichtbare Anweisung]
        TP[Temperatur<br/>Kreativitäts-Regler]
    end
    
    subgraph Qualität[Qualität & Risiko]
        HA[Halluzination<br/>Plausible Falschaussage]
        BI[Bias<br/>Systematische Verzerrung]
        GR[Guardrails<br/>Sicherheitsschranken]
    end
    
    style Modell fill:#dbeafe
    style Retrieval fill:#d1fae5
    style Interaktion fill:#fef3c7
    style Qualität fill:#fee2e2
\`\`\`

---

## Begriffsdefinitionen (alphabetisch)

| Begriff | Definition | Prüfungsrelevanz |
|---------|-----------|-------------------|
| **Bias** | Systematische Verzerrung in Daten oder Modell-Output | K1 - Definition kennen |
| **Chain-of-Thought** | Prompting-Technik: Modell soll Schritt-für-Schritt denken | K2 - Anwenden erklären |
| **Embedding** | Numerische Vektor-Darstellung von Text für semantische Suche | K1 - Wissen was es ist |
| **Few-Shot** | Prompting mit 2-3 Beispielen im Prompt | K2 - Unterschied zu Zero-Shot |
| **Fine-Tuning** | Nachtraining eines Modells mit eigenen Daten | K2 - Vergleich mit RAG |
| **Guardrails** | Technische Sicherheitsschranken gegen unerwünschte Outputs | K1 - Begriff kennen |
| **Halluzination** | Statistisch plausible aber faktisch falsche Modell-Ausgabe | K2 - Ursachen erklären |
| **Kontextfenster** | Maximale Token-Anzahl die ein Modell gleichzeitig verarbeiten kann | K1 - Definition |
| **LLM** | Large Language Model - grosses Sprachmodell | K1 - Definition |
| **Prompt** | Die Eingabe/Anweisung an ein KI-Modell | K1 - Definition |
| **RAG** | Retrieval Augmented Generation - externe Dokumente in Prompt einbinden | K2 - Erklären und vergleichen |
| **RTF** | Rolle-Task-Format - Prompting-Pattern | K2 - Anwenden |
| **System-Prompt** | Vorangestellte, für Benutzer unsichtbare Anweisung | K1 - Unterschied zu Prompt |
| **Temperatur** | Parameter: 0=deterministisch, 1=kreativ | K1 - Auswirkung kennen |
| **Token** | Kleinste Verarbeitungseinheit (ca. 3/4 Wort) | K1 - Definition |
| **Zero-Shot** | Prompting ohne Beispiele | K2 - Unterschied zu Few-Shot |

---

## Verwechslungsgefahr

\`\`\`mermaid
flowchart LR
    subgraph Paar1[RAG vs. Fine-Tuning]
        RAG2[RAG<br/>Dynamisch, extern<br/>Quellen zitierbar] ---|vs| FT2[Fine-Tuning<br/>Statisch, intern<br/>Im Modell vergraben]
    end
    
    subgraph Paar2[Prompt vs. System-Prompt]
        P2[Prompt<br/>Vom Benutzer<br/>Sichtbar] ---|vs| SP2[System-Prompt<br/>Vom Entwickler<br/>Unsichtbar für User]
    end
    
    subgraph Paar3[Halluzination vs. Bias]
        H2[Halluzination<br/>Zufällig falsch<br/>Einzelne Ausgabe] ---|vs| B2[Bias<br/>Systematisch verzerrt<br/>Wiederkehrendes Muster]
    end
    
    style Paar1 fill:#e0e7ff
    style Paar2 fill:#fef3c7
    style Paar3 fill:#fee2e2
\`\`\`

### Merkhilfen

- **RAG** = "Restaurant mit Speisekarte" (externe Quellen werden nachgeschlagen)
- **Fine-Tuning** = "Koch hat Rezepte auswendig gelernt" (Wissen im Modell)
- **Halluzination** = "Jemand der überzeugend lügt ohne es zu wissen"
- **Bias** = "Schiefe Waage - misst immer in eine Richtung falsch"
`,
        keywords: ['Glossar', 'RAG', 'Fine-Tuning', 'Halluzination', 'Bias', 'Token', 'LLM', 'Prompt', 'Embedding'],
        difficulty: 'beginner' as const,
    },
    {
        id: 'exam-rules',
        title: 'Prüfungsregeln und Taktik',
        description: 'Detaillierte Prüfungsregeln, Punktevergabe und taktische Tipps für den Prüfungstag.',
        domain: 'Exam Preparation',
        summary: `## Wichtige Erkenntnisse

- 22 Fragen, 30 Minuten, 80% Bestehensgrenze - Open Book, kein KI-Tool.
- P-Fragen (Picking): Punkte pro richtige Auswahl, ABZUG pro falsche Auswahl.
- K-Fragen (Kreuzworttabelle): Punkte pro korrekte Zelle in der Matrix.
- Zeitmanagement ist kritisch: ca. 80 Sekunden pro Frage.
`,
        content: `# Prüfungsregeln und Taktik

## Formale Rahmenbedingungen

| Aspekt | Regel |
|--------|-------|
| Fragenanzahl | 22 (zufällig aus größerem Pool) |
| Zeitlimit | 30 Minuten |
| Bestehensgrenze | 80% der erreichbaren Punkte |
| Hilfsmittel | Open Book (eigene Unterlagen erlaubt) |
| NICHT erlaubt | KI-Tools, Internet-Recherche während Prüfung |
| Sprache | Deutsch oder Englisch (je nach Buchung) |

## Punktevergabe nach Fragetyp

\`\`\`mermaid
flowchart TB
    FT[Fragetypen & Punktevergabe]
    FT --> A[A-Frage<br/>Auswahl]
    FT --> P[P-Frage<br/>Picking]
    FT --> K[K-Frage<br/>Kreuzworttabelle]
    
    A --> A1[1 Punkt<br/>Richtig oder Falsch<br/>Kein Teilpunkt]
    P --> P1[+1 pro richtige Auswahl<br/>-1 pro falsche Auswahl<br/>Minimum: 0 Punkte]
    K --> K1[+1 pro korrekte Zelle<br/>Keine Negativpunkte<br/>Teilpunkte möglich]
    
    style FT fill:#4f46e5,color:#fff
    style A fill:#d1fae5
    style P fill:#fef3c7
    style K fill:#dbeafe
\`\`\`

## Taktische Empfehlungen

### Zeitmanagement

| Strategie | Detail |
|-----------|--------|
| Erste Runde | Alle Fragen durchgehen, sichere sofort beantworten |
| Markieren | Unsichere Fragen markieren, nicht blockieren lassen |
| Zweite Runde | Markierte Fragen mit Restzeit bearbeiten |
| Keine Panik | 80 Sek/Frage ist machbar, wenn man den Stoff kennt |

### Fallstricke erkennen

\`\`\`mermaid
flowchart LR
    TRAP[Typische Fallen]
    TRAP --> T1[Absolute Aussagen<br/>immer/nie/vollständig<br/>Meist FALSCH]
    TRAP --> T2[Ohne Validierung<br/>KI allein entscheidet<br/>Immer FALSCH]
    TRAP --> T3[Technologie-Hype<br/>KI kann alles lösen<br/>Immer FALSCH]
    TRAP --> T4[Veraltete Begriffe<br/>Achtung bei Synonymen<br/>Syllabus-Definition gilt]
    
    style TRAP fill:#dc2626,color:#fff
    style T1 fill:#fee2e2
    style T2 fill:#fee2e2
    style T3 fill:#fee2e2
    style T4 fill:#fef3c7
\`\`\`

### P-Fragen-Strategie (WICHTIG!)

> **Negativpunkte beachten!** Bei P-Fragen gibt es Abzüge für falsche Auswahlen.

| Situation | Empfehlung |
|-----------|------------|
| Sicher richtig | Ankreuzen |
| Unsicher | Lieber weglassen (kein Abzug) |
| Sicher falsch | Auf keinen Fall ankreuzen |
| 50/50 | Eher weglassen (Risiko = -1 Punkt) |

### Die goldenen Prüfungsregeln

1. **Menschliche Verantwortung** - Immer die Antwort wählen, die menschliches Review betont
2. **KI als Werkzeug** - KI unterstützt, ersetzt nie den RE
3. **Validierung ist Pflicht** - KI-Output muss IMMER geprüft werden
4. **Kontext ist König** - Besserer Input = Besserer Output
5. **Keine Perfektion** - Halluzinationen sind nie vollständig vermeidbar
`,
        keywords: ['Prüfung', 'Punktevergabe', 'Zeitmanagement', 'Taktik', 'P-Frage', 'K-Frage', 'A-Frage', 'Negativpunkte'],
        difficulty: 'beginner' as const,
    },
]


