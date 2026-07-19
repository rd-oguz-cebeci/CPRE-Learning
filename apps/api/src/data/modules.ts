export const learningModules = [
    {
        id: 'plan',
        title: 'Lernplan und Prüfungshinweise',
        description: 'Überblick über den AI4RE-Lehrplan, Prüfungsformat und optimale Lernstrategie.',
        domain: 'Overview',
        summary: `## Überblick

Der offizielle AI4RE-Lehrplan umfasst **5 Kapitel** mit rund **5 Stunden** Lernzeit sowie ein Terminologie-Kapitel. Die Simulation besteht aus **22 kuratiert gemischten Fragen**, die in **30 Minuten** bearbeitet werden. Zum Bestehen sind **80 %** der Punkte erforderlich. Die reale Prüfung ist Open Book, aber ohne KI-Hilfsmittel.`,
        content: `# Lernplan und Prüfungsstrategie

## Syllabus-Überblick

Der offizielle AI4RE Micro-Credential-Lehrplan umfasst **5 Kapitel** plus ein Terminologie-Kapitel:

\`\`\`mermaid
graph LR
    K1[Kapitel 1<br/>KI-Grundlagen<br/>0,5h] --> K2[Kapitel 2<br/>Large Language Models<br/>0,5h]
    K2 --> K3[Kapitel 3<br/>Prompt Engineering<br/>0,5h]
    K3 --> K4[Kapitel 4<br/>Risiken & Verantwortlichkeiten<br/>1h]
    K4 --> K5[Kapitel 5<br/>AI-Anwendungsfälle im RE<br/>2,5h]
    K5 --> K6[Terminologie<br/>Referenz]
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
| Fragetypen | A (Einfachauswahl), P (Mehrfachauswahl), K (Richtig/Falsch) |

## Fragentypen im Detail

\`\`\`mermaid
flowchart TB
    A[Fragetypen]
    A --> T1[A - Auswahlfrage]
    A --> T2[P - Mehrfachauswahl]
    A --> T3[K - Richtig/Falsch]
    T1 --> D1[Genau 1 richtige Antwort<br/>aus mehreren Optionen]
    T2 --> D2[Mehrere richtige Antworten<br/>Punkte pro richtiger Wahl<br/>Zu viele Auswahlen: 0 Punkte]
    T3 --> D3[Mehrere Aussagen<br/>Je Aussage richtig oder falsch<br/>Teilpunkte pro korrekter Wahl]
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
2. Schlüsselbegriffe in Frage und Antwortoptionen mit der Syllabus-Definition abgleichen
3. Bei Szenarien zwischen KI-Unterstützung und menschlicher Verantwortung unterscheiden
4. Negative Fragestellungen und die geforderte Anzahl an Antworten genau lesen
5. P-Fragen: Nur die geforderte Anzahl auswählen. Zu viele Auswahlen ergeben 0 Punkte; weniger richtige Auswahlen können Teilpunkte ergeben.
`,
        keywords: ['Lernplan', 'Syllabus', '22 Fragen', '30 Minuten', '80 Prozent', 'Prüfungstaktik'],
        difficulty: 'beginner' as const,
    },
    {
        id: 'chapter1',
        title: 'Kapitel 1: KI-Grundlagen',
        description: 'KI-Schlüsseltechnologien, Chatbot-Pipeline und RAG versus Fine-Tuning (K2, 0,5 Stunden).',
        domain: 'AI Fundamentals',
        officialSyllabus: true,
        learningObjectives: ['LZ 1.1', 'LZ 1.2'],
        sourceSections: ['1.1', '1.2'],
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

- **Machine Learning / Deep Learning** – lernt Muster und Regeln direkt aus großen Datenmengen, ohne explizite Programmierung. Im RE relevant für automatische Klassifikation von Anforderungen, Priorisierungsvorschläge und Erkennung von Duplikaten.

- **Computer Vision** – wandelt Bilder und Pixel in strukturierte, maschinenlesbare Informationen um. Im RE einsetzbar für UI-Analyse, automatische Mockup-Erkennung oder die Auswertung von handschriftlichen Skizzen.

- **Natural Language Processing (NLP) / Large Language Models (LLMs)** – verstehen und erzeugen natürliche Sprache. Im RE besonders stark bei Textgenerierung, Zusammenfassungen, User-Story-Formulierung und Widerspruchserkennung.

- **Robotik** – ermöglicht physische Navigation und Manipulation in der realen Welt. Im RE eher ein Randthema; relevant bei der Anforderungserfassung für robotische Systeme (Sensorik, Steuerung, Sicherheitsanforderungen).

- **Expertensysteme** – regelbasierte, deterministische KI-Systeme, die auf explizit kodiertem Fachwissen aufbauen. Im RE nützlich für formale Konsistenzprüfung und Validierung, da ihre Entscheidungen nachvollziehbar und reproduzierbar sind.

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

- **Token** – die kleinste Einheit, die ein Sprachmodell verarbeitet. Ein Token entspricht ungefähr drei Vierteln eines Wortes. Kurze Wörter wie "und" oder "die" sind je ein Token; längere Fachbegriffe können aus mehreren Token bestehen. Die Kosten und Kapazitäten von LLMs werden in Token gemessen.

- **Kontextfenster** – die maximale Menge an Text (in Token), die ein Modell in einer Interaktion verarbeiten kann. Größe und Verhalten sind modellabhängig. Wird die Kapazität überschritten, können frühere Informationen fehlen oder nicht mehr zuverlässig berücksichtigt werden.

- **Temperatur** – ein Parameter, der die Auswahl aus wahrscheinlichen Token und damit die Variabilität der Ausgabe beeinflusst. Niedrigere Werte fördern meist konsistentere, höhere Werte meist variablere Ausgaben. Die genaue Wirkung und Reproduzierbarkeit hängen vom jeweiligen Modell und Anbieter ab.

- **System-Prompt** – eine versteckte Vorab-Anweisung, die vom Entwickler gesetzt wird und die Grundausrichtung des Modells bestimmt. Benutzer sehen diesen Prompt normalerweise nicht. Im RE-Kontext kann ein System-Prompt z. B. die Rolle als RE-Assistent oder spezifische Qualitätsregeln vordefinieren.

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

**RAG (Retrieval Augmented Generation)**
- *Aktualität*: Neue, korrekt indexierte Inhalte können ohne erneutes Modelltraining verfügbar werden. Die tatsächliche Aktualität hängt von Wissensbasis, Index und Retrieval-Qualität ab.
- *Nachvollziehbarkeit*: Hoch – das Modell kann Quellen zitieren und Antworten sind prüfbar.
- *Aufwand*: Mittelhoch – eine Retrieval-Pipeline (Indexierung, Vektordatenbank, Suche) muss aufgebaut werden.
- *Kosten pro Anfrage*: Höher, da relevante Dokumente bei jeder Anfrage im Prompt mitgesendet werden (mehr Token).
- *Typischer Einsatz*: Firmen-Wikis, sich häufig ändernde Informationen, Compliance-Daten, Projekt-Dokumentation.

**Fine-Tuning**
- *Aktualität*: Statischer Snapshot zum Zeitpunkt des Trainings – neue Informationen erfordern ein Nachtraining.
- *Nachvollziehbarkeit*: Gering – das Wissen ist im Modell „eingebrannt“ und nicht direkt auf Quellen zurückführbar.
- *Aufwand*: Hoch – benötigt sorgfältig aufbereitete Trainingsdaten, Rechenkapazität (GPU) und Expertise.
- *Kosten pro Anfrage*: Niedriger, da das Modell kompakter ist und kein zusätzlicher Kontext eingefügt wird.
- *Typischer Einsatz*: Stabiler Domänenstil (z. B. Schreibweise, Fachvokabular), wiederkehrendes Wissen das sich selten ändert.

**Kombination**: Beide Ansätze können kombiniert werden – ein fine-getuntes Modell, das zusätzlich per RAG mit aktuellen Daten angereichert wird, ist in der Praxis häufig.

### Prüfungsrelevanz

- **RAG** = dynamisch, nachvollziehbar, teurer pro Anfrage
- **Fine-Tuning** = statisch, günstiger, aber veralterungsgefährdet
- Kombination möglich und häufig
`,
        keywords: ['KI-Technologien', 'Chatbot-Pipeline', 'RAG', 'Fine-Tuning', 'Token', 'Kontextfenster', 'LLM'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'chapter2-llm',
        title: 'Kapitel 2: Large Language Models',
        description: 'Probabilistische Textvorhersage, Fähigkeiten, Grenzen und verantwortungsvolle Nutzung von LLMs (K1/K2, 0,5 Stunden).',
        domain: 'Generative AI',
        officialSyllabus: true,
        learningObjectives: ['LZ 2.1', 'LZ 2.2'],
        sourceSections: ['2.1', '2.2'],
        summary: `## Wichtige Erkenntnisse

    - LLMs erzeugen Text durch probabilistische Vorhersage des nächsten Tokens, nicht durch menschliches Verstehen.
    - Sprachliche Flüssigkeit ist kein Nachweis für fachliche Richtigkeit.
    - Kontext, Quellen und menschliche Validierung sind für belastbare RE-Ergebnisse unverzichtbar.`,
        content: `# Kapitel 2: Large Language Models (K1/K2)

    ## Lernziele

    - **LZ 2.1** (K1): Das Grundkonzept eines LLM kennen.
    - **LZ 2.2** (K2): Probabilistische Vorhersage von menschlichem Schlussfolgern oder Verstehen unterscheiden.

    ## Wie LLMs Text erzeugen

    Ein LLM verarbeitet Eingaben als Token und sagt auf Basis des bisherigen Kontexts jeweils wahrscheinliche nächste Token voraus. Das Ergebnis kann kohärent, hilfreich und sprachlich überzeugend wirken. Daraus folgt jedoch kein eigenes Weltwissen, keine Absicht und keine Garantie für korrekte Fakten.

    | Fähigkeit | Grenze im RE | Konsequenz |
    |---|---|---|
    | Texte strukturieren, zusammenfassen und umformulieren | Kann Fachwissen, Quellen oder Randbedingungen falsch interpretieren | Output als Entwurf behandeln |
    | Muster und ähnliche Formulierungen erkennen | Kann plausible Halluzinationen erzeugen | Fakten und Quellen prüfen |
    | Beispiele und Vorlagen nachbilden | Übernimmt auch unklare oder voreingenommene Eingaben | Kontext und Qualitätskriterien präzisieren |

    ## Verantwortungsvolle Interaktion

    1. Projekt-, Domänen- und Stakeholderkontext gezielt bereitstellen.
    2. Ergebnisse gegen verlässliche Quellen und Qualitätskriterien prüfen.
    3. Sensible Informationen nur unter geeigneten Datenschutz- und Governance-Regeln verwenden.
    4. Bei deterministischen Aufgaben geeignete Fachwerkzeuge oder überprüfbare Quellen einsetzen.

    > **Prüfungsanker:** Ein LLM ist ein leistungsfähiger Entwurfsassistent. Es ersetzt weder Domänenwissen noch die Validierung durch Requirements Engineers und Stakeholder.

    ### Quelle

    Paraphrasiert nach IREB, *AI4RE Micro-Credential Syllabus und Studienleitfaden*, Version 1.0.0, Kapitel 2.
    `,
        keywords: ['LLM', 'Token', 'probabilistische Vorhersage', 'Halluzination', 'Kontext', 'Validierung'],
        difficulty: 'intermediate' as const,
        },
        {
        id: 'chapter3-prompt-engineering',
        title: 'Kapitel 3: Prompt Engineering',
        description: 'Kontext, Prompt-Pattern und Prompt-Techniken für belastbarere RE-Ergebnisse (K2, 0,5 Stunden).',
        domain: 'Output Quality',
        officialSyllabus: true,
        learningObjectives: ['LZ 3.1', 'LZ 3.2'],
        sourceSections: ['3.1', '3.2'],
        summary: `## Wichtige Erkenntnisse

- Die Qualität der KI-Ausgabe hängt primär von der Qualität des Inputs ab (Prompt + Kontext).
- Halluzinationen sind systembedingt und können nie vollständig eliminiert werden.
- Drei Hebel zur Qualitätssteigerung: besserer Kontext, präzisere Prompts, systematische Validierung.
- Das RTF-Pattern (Rolle-Task-Format) ist eine bewährte Prompting-Strategie.
`,
        content: `# Kapitel 3: Prompt Engineering (K2)

## Lernziele

- **LZ 3.1** (K2): Die Bedeutung des Kontexts für akkurate KI-Ergebnisse erläutern.
- **LZ 3.2** (K1): Zweck von Prompt-Pattern benennen und sie von Prompt-Techniken unterscheiden.

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

- **Bias** – Systematische Verzerrungen entstehen, wenn Trainingsdaten bestimmte Gruppen, Meinungen oder Perspektiven überrepräsentieren. Im RE-Kontext bedeutet das: Anforderungen können unbewusst bestimmte Nutzergruppen bevorzugen oder ausschließen. *Gegenmaßnahme*: Diverse Quellen nutzen, KI-Output aktiv auf Fairness prüfen, verschiedene Stakeholder einbeziehen.

- **Veraltetes Wissen** – LLMs werden zu einem bestimmten Zeitpunkt trainiert (sog. „Trainings-Cutoff“). Neuere Gesetze, Normen oder Technologien sind dem Modell danach unbekannt. *Gegenmaßnahme*: RAG mit aktuellen Dokumenten einsetzen; nie blind auf Aktualität vertrauen.

- **Kontextverlust** – In sehr langen Gesprächen kann das Modell frühere Aussagen „vergessen“, sobald diese das Kontextfenster verlassen. Die Kohärenz der Ausgabe nimmt ab. *Gegenmaßnahme*: Regelmäßige Zusammenfassungen erstellen, Gespräch periodisch zurücksetzen.

- **Overfit auf den Prompt** – Formuliert man eine Frage suggestiv, tendiert das Modell dazu, die implizit erwartete Antwort zu geben, anstatt neutral zu informieren. *Gegenmaßnahme*: Neutrale, offene Formulierungen wählen; keine Antwort vorwegnehmen.

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

Das Modell gewichtet verschiedene Kontext-Arten unterschiedlich stark. Von höchster bis niedrigster Priorität:

1. **System-Prompt (höchste Priorität)** – Die grundlegende Verhaltensvorgabe des Entwicklers, z. B. „Du bist ein erfahrener RE-Experte. Antworte stets präzise und zitiere Quellen.“ Diese Anweisung übersteuert alle anderen Eingaben.

2. **RAG-Dokumente (hohe Priorität)** – Zur Laufzeit eingefügte externe Inhalte, z. B. Firmen-Glossar, projektspezifische Templates oder aktuelle Normen. Sie geben dem Modell spezifisches, aktuelles Wissen, das über das Training hinausgeht.

3. **Few-Shot-Beispiele (mittlere Priorität)** – Zwei bis drei Beispiele für gewünschte Ausgaben, die direkt im Prompt stehen. Sie zeigen dem Modell das gewünschte Format und die gewünschte Qualität, z. B. musterhaft formulierte Requirements.

4. **Chat-Historie (niedrigste Priorität)** – Der bisherige Gesprächsverlauf. Das Modell nutzt ihn für Kohärenz, aber ältere Nachrichten verlieren Relevanz, sobald das Kontextfenster voll wird.

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

- RTF ist ein gängiges wiederverwendbares Prompt-Pattern
- Few-Shot-Beispiele können Format und erwartete Art der Ausgabe verdeutlichen
- Chain-of-Thought fordert eine schrittweise Begründung an; das Ergebnis muss weiterhin validiert werden
- **Kein Prompting ersetzt menschliche Validierung!**
`,
        keywords: ['Halluzination', 'Prompt-Engineering', 'RTF', 'Few-Shot', 'Chain-of-Thought', 'Kontext', 'Qualität'],
        difficulty: 'intermediate' as const,
    },
    {
        id: 'chapter4-risks',
        title: 'Kapitel 4: Risiken und Verantwortlichkeiten',
        description: 'Risiken, Datenschutz und die erweiterte Verantwortung des Requirements Engineers in AI4RE (K2, 1 Stunde).',
        domain: 'Risks & Ethics',
        officialSyllabus: true,
        learningObjectives: ['LZ 4.1'],
        sourceSections: ['4.1'],
        summary: `## Wichtige Erkenntnisse

- Der Syllabus beschreibt **12 typische Risikobereiche** beim KI-Einsatz im RE.
- Der EU AI Act klassifiziert KI-Systeme nach Risikostufen.
- Menschliche Verantwortung bleibt IMMER bestehen - KI ist Werkzeug, nicht Entscheider.
- Bias in Trainingsdaten führt zu Bias in Ergebnissen - Requirements Engineers müssen dies erkennen.
`,
        content: `# Kapitel 4: Risiken und Verantwortlichkeiten (K2)

## Lernziele

- **LZ 4.1** (K1): Typische Risiken beim Einsatz von KI im RE nennen.
- **LZ 4.2** (K2): Die erweiterte Rolle des Requirements Engineers in KI-gestützten Prozessen erläutern.

---

## 4.1 Die 12 Risikobereiche des Syllabus

\`\`\`mermaid
flowchart TB
    R[12 Risiken beim KI-Einsatz im RE]
    R --> R1[1. Halluzinationen<br/>Falsche aber plausible Fakten]
    R --> R2[2. Falsche Präzision<br/>Formal korrekt, semantisch schwach]
    R --> R3[3. Verstärkung von Bias<br/>Systematisch verzerrte Ergebnisse]
    R --> R4[4. Datenverlust<br/>Offenlegung sensibler Daten]
    R --> R5[5. Urheberrechtsverstöße<br/>Geschütztes Material im Output]
    R --> R6[6. Veraltetes Wissen<br/>Fehlende aktuelle Vorgaben]
    R --> R7[7. Modell-Drift<br/>Qualitätsverlust im Betrieb]
    R --> R8[8. Context-Window-Überlauf<br/>Wichtige Eingaben fallen heraus]
    R --> R9[9. Fehlausrichtung des Umfangs<br/>Vorschläge außerhalb des Scopes]
    R --> R10[10. Übermäßiges Vertrauen<br/>Fehlende menschliche Validierung]
    R --> R11[11. Intransparenz<br/>Schwer nachvollziehbare Ergebnisse]
    R --> R12[12. Transparenzpflichten<br/>Fehlende Kennzeichnung oder Kontrolle]
    
    style R fill:#dc2626,color:#fff
    style R1 fill:#fee2e2
    style R2 fill:#fee2e2
    style R3 fill:#fee2e2
    style R10 fill:#fef3c7
    style R11 fill:#fef3c7
    style R12 fill:#fef3c7
\`\`\`

### Detailbetrachtung der Top-Risiken

**1. Halluzinationen**
- *Auswirkung im RE*: Das Modell erfindet plausibel klingende, aber faktisch falsche Anforderungen, Normbezüge oder technische Details. Werden diese unreflektiert übernommen, entstehen fehlerhafte Spezifikationen.
- *Gegenmaßnahmen*: Verpflichtende Reviews durch RE-Experten, lückenloses Tracing jeder KI-generierten Aussage zu ihrer Quelle (Traceability), systematischer Quellencheck – insbesondere bei Fakten, Standards und Zahlen.

**2. Bias (systematische Verzerrung)**
- *Auswirkung im RE*: Bestimmte Nutzergruppen (z. B. ältere Menschen, nicht-westliche Kulturen, Menschen mit Behinderungen) werden in KI-generierten Anforderungen systematisch berücksichtigt oder ausgeschlossen, weil die Trainingsdaten nicht repräsentativ sind.
- *Gegenmaßnahmen*: Breites Spektrum diverser Stakeholder aktiv einbeziehen, regelmäßige Bias-Audits der KI-Ausgaben durchführen, bei kritischen Systemen spezialisierte Fairness-Prüfungen einplanen.

**3. Datenverlust und Datenschutz**
- *Auswirkung im RE*: Wenn Anforderungs-Workshops oder Kundendokumente direkt in Cloud-LLMs eingespeist werden, können sensible Informationen (Personendaten, Geschäftsgeheimnisse) beim Anbieter landen und für Trainings genutzt werden.
- *Gegenmaßnahmen*: Nur anonymisierte oder synthetische Daten in Cloud-Tools eingeben; bei sensiblen Daten auf On-Premise-Modelle oder air-gapped Systeme ausweichen; Data Processing Agreements (DPA) mit Anbietern abschließen.

**4. Overreliance (blinder Verlass)**
- *Auswirkung im RE*: Requirements Engineers verlassen sich zunehmend unkritisch auf KI-Vorschläge und hinterfragen Ergebnisse nicht mehr ausreichend. Kritisches Denken und fachliches Urteilsvermögen nehmen ab.
- *Gegenmaßnahmen*: Pflicht-Reviews für alle KI-generierten Artefakte institutionalisieren; Checklisten einführen, die aktives Nachdenken erzwingen; KI-Unterstützung transparent kommunizieren.

**5. Transparenz und Transparenzpflichten**
- *Auswirkung im RE*: Schwer erklärbare Priorisierungsvorschläge erschweren Validierung und Vertrauen. Bei bestimmten veröffentlichten KI-Inhalten können zusätzlich gesetzliche Kennzeichnungs- oder Kontrollpflichten gelten.
- *Gegenmaßnahmen*: KI-Einsatz und Grenzen dokumentieren, Quellen und Entscheidungskriterien nachvollziehbar machen und den konkreten rechtlichen sowie organisatorischen Kontext prüfen. Interne RE-Artefakte sind nicht pauschal kennzeichnungspflichtig.

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

- **Transparenz** – Alle beteiligten Stakeholder müssen wissen, dass und wie KI im Projekt eingesetzt wird. KI-generierte Artefakte müssen als solche kenntlich gemacht werden – sowohl intern als auch, wo erforderlich, gegenüber Kunden und Auftraggebern.

- **Fairness** – Keine Stakeholder-Gruppe darf durch KI-Bias systematisch benachteiligt werden. Das bedeutet aktive Prüfung: Decken die generierten Anforderungen alle relevanten Nutzergruppen ab? Werden vulnerable Gruppen ausreichend berücksichtigt?

- **Verantwortlichkeit** – Der Mensch bleibt immer die letzte Entscheidungsinstanz und trägt die Verantwortung für die Ergebnisse – unabhängig davon, ob KI sie unterstützt hat. „KI hat das gemacht" ist keine akzeptable Entschuldigung.

- **Datenschutz** – Personenbezogene und geschäftskritische Daten müssen geschützt werden. Im RE-Kontext bedeutet das: Analyse welche Daten in KI-Systeme fließen dürfen, Anonymisierung wo nötig, Einhaltung der DSGVO.

- **Erklärbarkeit** – Entscheidungswege sollten nachvollziehbar sein. Bei KI-unterstützten Requirements: Warum wurde dieses Requirement vorgeschlagen? Auf welcher Grundlage? Das ist besonders wichtig bei sicherheitskritischen Systemen.

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
        id: 'chapter4-responsibilities',
        title: 'Kapitel 4 Vertiefung: Zuständigkeiten in AI4RE',
        description: 'Die erweiterte Rolle des Requirements Engineers in KI-gestützten Prozessen (LZ 4.2, K2).',
        domain: 'Risks & Ethics',
        officialSyllabus: true,
        learningObjectives: ['LZ 4.2'],
        sourceSections: ['4.2'],
        summary: `## Wichtige Erkenntnisse

    - KI erweitert die RE-Rolle, ersetzt sie nicht.
    - Verantwortung für Kontext, Validierung, Compliance und Stakeholder-Kommunikation bleibt menschlich.
    - Die fünf Verantwortungsdimensionen sind ein Prüfungsanker für K2-Fragen.`,
        content: `# Kapitel 4: Zuständigkeiten in AI4RE (K2)

    ## Lernziel

    - **LZ 4.2**: Die sich entwickelnde Rolle des Requirements Engineers in KI-gestützten Prozessen erläutern.

    ## Fünf Verantwortungsdimensionen

    | Perspektive | Aufgaben des Requirements Engineers | Typische Prüfentscheidung |
    |---|---|---|
    | KI-Prozessdesigner, Integrator und technischer Kooperationspartner | Geeignete Werkzeuge für eine konkrete RE-Aufgabe bewerten, ihre Einbindung in Repository und Arbeitsablauf mit technischen Teams gestalten sowie Ein-/Ausgabeformate und Review-Regeln festlegen. | Ein LLM zur Dublettenerkennung darf Vorschläge markieren; Kriterien, Kennzeichnung und Freigabeprozess werden vor dem Einsatz definiert. |
    | Prompt-Designer und Qualitätsprüfer | Kontext, Aufgabe, Qualitätskriterien und Ausgabeformat präzisieren, Prompts iterativ verbessern und Ergebnisse gegen Domänenwissen, Stakeholder-Bedürfnisse sowie Qualitätskriterien prüfen. | Akzeptanzkriterien werden nur übernommen, wenn sie testbar sind und zur ursprünglichen Stakeholder-Aussage zurückverfolgt werden können. |
    | Risiko- und Compliance-Manager | Datenschutz, Datenminimierung, Bias, Modell-Drift sowie gesetzliche und vertragliche Vorgaben erkennen; passende Verarbeitung und Kontrollen festlegen. | Stakeholder-Feedback wird vor externer Verarbeitung pseudonymisiert; die fortdauernde Regelkonformität des Werkzeugs wird überprüft. |
    | Verantwortlicher für Umweltauswirkungen | Nutzen und Ressourcenverbrauch abwägen und unnötig intensive KI-Nutzung vermeiden. | Eine periodische Stapelverarbeitung ist einer dauerhaft laufenden Neuklassifizierung vorzuziehen, wenn beide denselben fachlichen Nutzen liefern. |
    | Kommunikator und Vertrauensbildner | KI-Einsatz, Nutzen, Grenzen und eingeschränkte Erklärbarkeit transparent darstellen; Diskussion, Lernen, Verhandlung und Konsensbildung ermöglichen. | Stakeholder erfahren, welche Workshop-Schritte KI-gestützt sind, dürfen Vorschläge hinterfragen und entscheiden weiterhin über fachliche Zielkonflikte. |

    ## Verantwortung entlang des KI-gestützten Ablaufs

    1. **Vor dem Einsatz:** Zweck und konkrete RE-Aufgabe klären, Daten klassifizieren, Werkzeug und Betriebsform bewerten sowie messbare Qualitäts- und Abbruchkriterien definieren.
    2. **Bei der Konfiguration:** Kontext, Prompts, Eingabe- und Ausgabeformate, Kennzeichnung sowie Rollen für Prüfung und Freigabe festlegen.
    3. **Während der Nutzung:** Ergebnisse auf Relevanz, Korrektheit, Vollständigkeit, Bias und Regelkonformität prüfen. Auffälligkeiten und Änderungen des Modellverhaltens beobachten.
    4. **Vor der Übernahme:** Quellenbezug und Stakeholder-Absicht validieren, Entscheidungen nachvollziehbar dokumentieren und nur kuratierte Ergebnisse in die Anforderungsbasis übernehmen.
    5. **Im Betrieb:** Nutzen, Risiken, Modell-Drift und Ressourcenverbrauch erneut bewerten und den Prozess bei veränderten Bedingungen anpassen.

    ## Was nicht an KI delegiert werden kann

    - Fachliche Verantwortung und Freigabe von Anforderungen
    - Bewertung, ob ein Ergebnis den tatsächlichen Bedürfnissen der Stakeholder entspricht
    - Aushandlung von Konflikten und legitimen Interessen
    - Entscheidung über vertretbare rechtliche, ethische und betriebliche Risiken
    - Aufbau von gemeinsamem Verständnis und Vertrauen

    ## K2-Fallbeispiel

    Ein Tool schlägt aufgrund historischer Daten Prioritäten vor. Der Requirements Engineer darf die Rangfolge nicht ungeprüft übernehmen. Er prüft Datenbasis und Verzerrungen, erklärt die Vorschläge, stimmt Zielkonflikte mit Stakeholdern ab und dokumentiert die begründete Entscheidung.

    **Warum?** Priorität hängt nicht nur von Mustern in vorhandenen Daten ab. Geschäftswert, Dringlichkeit, Aufwand, Abhängigkeiten und aktuelle Stakeholder-Interessen können sich ändern. KI strukturiert die Analyse; die verantwortliche Entscheidung bleibt bei den Menschen.

    ## K2-Selbstcheck

    Ein externes LLM soll vertrauliche Interviewprotokolle zusammenfassen. Welche Reaktion entspricht LZ 4.2?

    - Nicht allein die sprachliche Qualität testen.
    - Zuerst Zweck, Datenklassifikation, zulässige Verarbeitung und Anbieterbedingungen prüfen.
    - Daten minimieren oder pseudonymisieren und gegebenenfalls eine lokale Verarbeitung wählen.
    - Zusammenfassungen durch den Requirements Engineer gegen das Protokoll und die Stakeholder-Absicht validieren.
    - Einsatz, Grenzen und Freigabe nachvollziehbar dokumentieren.

    > **Merksatz:** KI liefert Vorschläge. Menschen beurteilen Bedeutung, Risiken und Konsequenzen und tragen die Verantwortung für die Freigabe.

    ### Quelle

    Paraphrasiert nach IREB, *AI4RE Micro-Credential Syllabus und Studienleitfaden*, Version 1.0.0, Abschnitt 4.2.
    `,
        keywords: ['Verantwortung', 'Human-in-the-loop', 'Compliance', 'Governance', 'Umweltauswirkungen', 'Vertrauen'],
        difficulty: 'intermediate' as const,
        },
        {
        id: 'chapter5-overview',
        title: 'Kapitel 5: KI-Anwendungsfälle im RE',
        description: 'KI-Unterstützung in den vier RE-Kernaktivitäten: Ermittlung, Dokumentation, Validierung, Verwaltung (K2, 2,5 Stunden).',
        domain: 'RE Activities',
        officialSyllabus: true,
        learningObjectives: ['LZ 5.1', 'LZ 5.2'],
        sourceSections: ['5.1', '5.2', '5.3', '5.4'],
        summary: `## Wichtige Erkenntnisse

- KI kann alle **4 RE-Kernaktivitäten** unterstützen, aber nie ersetzen.
- Der RE prüft, bewertet und finalisiert - KI liefert Entwürfe und Vorschläge.
- Besonders wertvoll: Konsistenzprüfung, Stakeholder-Analyse, Template-Generierung.
- Die Rolle des RE erweitert sich um "KI-Kompetenz" als Querschnittsfähigkeit.
`,
        content: `# Kapitel 5: KI-Anwendungsfälle im RE (K2)

## Lernziele

- **LZ 5.1** (K1): Typische KI-Anwendungsfälle für Ermittlung, Dokumentation, Validierung und Management nennen.
- **LZ 5.2** (K2): Menschliche Kuration und die Rolle des RE zur Sicherstellung valider Ergebnisse erläutern.

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

**Stakeholder-Identifikation**
- *KI-Beitrag*: Das Modell analysiert den Projekttyp und schlägt anhand ähnlicher Projekte eine erste Liste potenzieller Stakeholder vor – inklusive oft übersehener Gruppen wie Regulierungsbehörden, Wartungsteams oder externe Dienstleister.
- *RE-Verantwortung*: Validierung der Vollständigkeit, fachliche Priorisierung nach Einfluss und Interesse, Entscheid ob jemand tatsächlich relevant ist.

**Interview-Vorbereitung**
- *KI-Beitrag*: Generiert einen strukturierten Fragenkatalog basierend auf der Rolle des Gesprächspartners und den bekannten Projektzielen. Berücksichtigt typische blinde Flecken und Standardfragen für die jeweilige Domäne.
- *RE-Verantwortung*: Anpassung der Fragen an den konkreten Gesprächskontext, Persönlichkeit des Stakeholders, offene politische Themen im Projekt und fachliche Besonderheiten, die KI nicht kennt.

**Dokumenten-Analyse (Altdokumente, Legacysysteme)**
- *KI-Beitrag*: Extrahiert strukturiert Informationen aus großen Mengen unstrukturierter Dokumente – z.B. aus alten Lasten- und Pflichtenheften, E-Mail-Verläufen oder Protokollen. Fasst zusammen und identifiziert wiederkehrende Themen.
- *RE-Verantwortung*: Bewertung der Relevanz und Aktualität der extrahierten Informationen, Entscheidung was übernommen werden soll und was veraltet ist.

**Kreativitätsunterstützung (Brainstorming)**
- *KI-Beitrag*: Liefert schnell eine breite Palette an Ideen, alternativen Formulierungen oder Szenarien – besonders nützlich um Denkmuster aufzubrechen und neue Perspektiven einzubringen.
- *RE-Verantwortung*: Prüfung der Machbarkeit, Konsistenz mit bestehenden Anforderungen und technischen Constraints; Selektion der wirklich relevanten Ideen.

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
        id: 'chapter5-use-cases',
        title: 'Kapitel 5 Vertiefung: Use Cases im Detail',
        description: 'Offizielle Unterfälle für Ermittlung, Dokumentation, Validierung und Management (LZ 5.1 und 5.2, K1/K2).',
        domain: 'RE Activities',
        officialSyllabus: true,
        learningObjectives: ['LZ 5.1', 'LZ 5.2'],
        sourceSections: ['5.1', '5.2', '5.3', '5.4'],
        summary: `## Wichtige Erkenntnisse

    - KI unterstützt Erkundung, Transkription und Extraktion in der Ermittlung.
    - Sie kann Anforderungen formulieren und in andere Darstellungen transformieren.
    - Auch bei Validierung und Management ist menschliche Kuration Voraussetzung.`,
        content: `# Kapitel 5: Use Cases im Detail (K1/K2)

    ## Lernziele

    - **LZ 5.1** (K1): Typische Anwendungsfälle für KI in Ermittlung, Dokumentation, Validierung und Management nennen.
    - **LZ 5.2** (K2): Die Bedeutung menschlicher Kuration und die Rolle des RE bei validen Ergebnissen erläutern.

    ## 5.1 Ermittlung

    ### Erkundung neuer Domänen

    KI kann interne Unterlagen und öffentliche Quellen zusammenfassen, Terminologie und Randbedingungen herausarbeiten, mögliche Stakeholder nennen sowie Interview- und Workshop-Leitfäden vorbereiten. Diese Vorschläge sind Ausgangspunkte, keine bestätigten Fakten.

    Für den **Systemkontext** kann KI Informationen nach fünf Aspekten strukturieren:

    1. Stakeholder
    2. Dokumente
    3. Systeme
    4. Prozesse
    5. Ereignisse

    Sie kann Beziehungen und mögliche Lücken markieren. Der Requirements Engineer prüft Kontext- und Systemgrenzen mit den Stakeholdern. Für ein **gemeinsames Verständnis** kann KI Begriffe, Synonyme, Homonyme und inkonsistente Verwendung in einem Glossar vorschlagen; verbindliche Definitionen werden gemeinsam abgestimmt.

    ### Kommunikation transkribieren

    KI kann Audioaufnahmen, Interviews, Workshops, Whiteboards und Skizzen in strukturierte, durchsuchbare Arbeitsartefakte überführen. Sie kann Sprecher unterscheiden, Zeitstempel ergänzen, Diskussionspunkte zusammenfassen und mögliche Anforderungen oder Folgefragen markieren.

    **Grenzen und Kuration:** Ein Transkript kann Aussagen auslassen, Sprecher verwechseln oder Absichten verfälschen. Datenschutz, Einwilligung, fachliche Genauigkeit, Vollständigkeit und Übereinstimmung mit der Stakeholder-Absicht müssen menschlich geprüft werden.

    ### Anforderungen extrahieren

    KI kann aus E-Mails, Chats, Protokollen, Altspezifikationen und regulatorischen Dokumenten funktionale Anforderungen, Qualitätsanforderungen und Randbedingungen vorschlagen. Sie kann Konflikte, implizite Annahmen, Abhängigkeiten und mögliche Lücken markieren.

    Der Requirements Engineer stellt durch Quellenbezug und Stakeholder-Validierung sicher, dass ein Vorschlag eine echte Anforderung und keine plausible Modellannahme ist.

    ## 5.2 Dokumentation

    ### Formulierung

    KI kann Rohinformationen anhand vorgegebener Satzschablonen oder Standards strukturieren, User Stories und Akzeptanzkriterien vorschlagen, Glossar- und Synonymtabellen vorbereiten sowie große Anforderungen zerlegen. Dabei kann sie sprachliche Fallstricke wie Passiv, unklare Universalquantoren oder fehlende messbare Kriterien markieren.

    Der Requirements Engineer prüft fachliche Richtigkeit, angemessene Zerlegung, Testbarkeit und Wertbezug. Eine syntaktisch perfekte Anforderung kann fachlich trotzdem falsch sein.

    ### Transformation

    Mögliche Transformationen sind:

    - natürliche Sprache in UML- oder BPMN-Modelle und zurück,
    - technische Inhalte in zielgruppengerechte einfache Sprache,
    - Anforderungen in Wireframes, Mock-ups oder explorative Prototypen,
    - Stakeholder-Input in Personas,
    - Anforderungen in Testfälle,
    - Legacy-Code in Vorschläge für implizite Anforderungen,
    - Vergleich von Spezifikation und Implementierung.

    Jede Darstellung muss semantisch mit ihrer Quelle übereinstimmen. Modelle und Prototypen dürfen nicht unbemerkt Designentscheidungen als Stakeholder-Anforderungen ausgeben.

    ## 5.3 Validierung

    KI kann Mehrdeutigkeiten, Widersprüche, Dubletten, terminologische Inkonsistenzen und fehlende Qualitätskriterien markieren. Sie kann Anforderungen gegen Glossare vergleichen, Abhängigkeiten untersuchen und Testfälle vorschlagen. Die abschließende Validierung verlangt jedoch Kontext- und Werturteil.

    | Validierungsmaßstab | Leitfrage des Requirements Engineers |
    |---|---|
    | Konsistenz | Ist der markierte Unterschied ein echter Widerspruch oder eine zulässige Variation? |
    | Stakeholder-Bedürfnis | Entspricht die Anforderung tatsächlich den Wünschen und Bedürfnissen ihrer Quelle? |
    | Wertorientierung | Trägt die Anforderung erkennbar zu einem relevanten Ziel oder Nutzen bei? |
    | Angemessenheit und Notwendigkeit | Ist sie erforderlich oder hat die KI unnötigen Umfang ergänzt? |
    | Abstraktionsebene | Passt ihr Detaillierungsgrad zur aktuellen Projektphase und zum Zweck des Arbeitsprodukts? |
    | Qualitätskriterien | Ist sie unter anderem eindeutig, verständlich, vollständig genug und überprüfbar? |

    > **Prüfungsanker:** Mustererkennung kann die Validierung vorbereiten. Ob eine Anforderung wertvoll, notwendig und fachlich richtig ist, entscheidet sich durch Quellen, Systemkontext und Stakeholder.

    ## 5.4 Management

    ### Attribute zuweisen

    KI kann Inhalt und ähnliche Anforderungen analysieren und Werte für Attribute wie **Priorität, Komplexität, Quelle oder verantwortliche Person** vorschlagen. Sie kann fehlende Attribute und inkonsistente Zuordnungen in großen Beständen markieren.

    Vorschläge müssen gegen projektspezifische Kriterien und verlässliche Quellen geprüft werden. Historische Muster können veraltet oder verzerrt sein; ein automatisch vorgeschlagener Verantwortlicher oder Prioritätswert wird nicht ungeprüft verbindlich.

    ### Anforderungen priorisieren

    KI kann Geschäftswert, Dringlichkeit, Aufwand, Abhängigkeiten und weitere vereinbarte Kriterien gleichzeitig auswerten. Sie kann Rangfolgen, Konflikte, Abhängigkeiten und alternative Perspektiven für geänderte Randbedingungen vorschlagen.

    Priorisierung bleibt eine Stakeholder-Entscheidung: Strategie, legitime Interessen und aktueller Projektkontext lassen sich nicht vollständig aus Daten ableiten. Vorschläge werden erklärt, verhandelt, validiert und bei Änderungen neu bewertet.

    ## Menschliche Kuration als durchgängiges Prinzip

    KI-Ergebnisse sind Hypothesen oder Entwürfe. Der Requirements Engineer prüft fachliche Bedeutung, Quellbezug, semantische Genauigkeit, Stakeholder-Absicht, Datenschutz und Projektkontext. Nur validierte Ergebnisse gehören in die Anforderungsbasis.

    **K2-Muster:** KI-Vorschlag → Quelle und Kontext prüfen → Qualitäts- und Risikokriterien anwenden → Stakeholder einbeziehen → begründet entscheiden → Entscheidung und KI-Einsatz dokumentieren.

    ### Quelle

    Paraphrasiert nach IREB, *AI4RE Micro-Credential Syllabus und Studienleitfaden*, Version 1.0.0, Kapitel 5.
    `,
        keywords: ['Erkundung', 'Transkription', 'Extraktion', 'Transformation', 'Validierung', 'Management', 'Kuration'],
        difficulty: 'advanced' as const,
        },
        {
        id: 'practice-ai-adoption',
        title: 'Praxis-Vertiefung: KI im RE einführen',
        description: 'Zusatzwissen zu Einführungsstrategien, Toolauswahl und organisatorischen Aspekten; kein eigenes AI4RE-Syllabus-Kapitel.',
        domain: 'Practical Use',
        summary: `## Wichtige Erkenntnisse

- KI-Einführung erfordert eine durchdachte Strategie (nicht einfach "Tool kaufen und nutzen").
- Pilotprojekte mit klarem Scope und Erfolgskriterien starten.
- Change Management und Schulung sind erfolgskritisch.
- Toolauswahl: Datenschutz, Integration, Kosten und Vendor-Lock-in beachten.
`,
        content: `# Praxis-Vertiefung: KI im RE einführen

    > **Einordnung:** Dieses Modul ergänzt den offiziellen AI4RE-Lehrplan. Für die Prüfung sind die Kapitel 1 bis 5 und die Terminologie maßgeblich.

## Ziele dieser freiwilligen Vertiefung

- Schritte zur Einführung von KI-Werkzeugen im RE kennen.
- Kriterien für Toolauswahl und Einführungsstrategie erklären.
- Organisatorische Voraussetzungen und Change Management beschreiben.

> Diese Ziele sind redaktionelle Lernhilfen und keine offiziellen AI4RE-Lernziele.

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

- **Klarer Scope** – Das Pilotprojekt sollte ein abgegrenztes, überschaubares Thema abdecken. Zu breite Piloten scheitern häufig, weil zu viele Variablen auf einmal eingeführt werden. Ein konkretes Ziel, z. B. „User Stories automatisch aus Interview-Transkripten generieren“, ist besser als ein vager Auftrag.

- **Messbare Ziele** – Ohne klare Erfolgskriterien kann kein fairer Vergleich stattfinden. Beispiele: „30 % weniger Zeit für Erstdokumentation“, „Fehlerrate bei Requirements-Formulierungen halbiert“, „Team-Zufriedenheit bleibt konstant“.

- **Motiviertes Team** – Frühe Anwender (Early Adopters) als Piloten einsetzen – Menschen, die Lust haben das Tool auszuprobieren und bereit sind, Feedback zu geben. Widerstrebende Teilnehmer sabotieren den Piloten und liefern keine belastbaren Erkenntnisse.

- **Management-Support** – Budget, Zeitbudget und Rückendeckung durch Führungskräfte müssen vor dem Start gesichert sein. Projekte, die während des Piloten unter Ressourcendruck geraten, liefern keine verwertbaren Ergebnisse.

- **Feedback-Schleifen** – Regelmäßige Retrospektiven (z. B. nach jeder Woche oder nach jedem Meilenstein) sorgen dafür, dass Erkenntnisse sofort einfließen und der Pilot nicht in eine falsche Richtung läuft.

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

### Datenschutz nach Datenkategorie

- **Öffentliche Informationen** (z. B. Marktdaten, öffentliche Normen, allgemeine Domänenbeschreibungen) – Darf problemlos in beliebige Cloud-LLMs eingegeben werden. Kein Risiko.

- **Interne Prozesse und Projektbeschreibungen** (z. B. Prozessdiagramme, Anforderungsrahmen ohne Personenbezug) – Grauzone: nur wenn ein Data Processing Agreement (DPA) mit dem Anbieter vorliegt und Server in der EU betrieben werden. Immer mit Datenschutzbeauftragtem klären.

- **Personenbezogene Daten** (z. B. Stakeholder-Namen, Nutzerfeedback, Interview-Aufzeichnungen) – Darf in der Regel NICHT in Cloud-LLMs eingegeben werden. Stattdessen: Anonymisierung, Pseudonymisierung oder On-Premise-Modell nutzen.

- **Geschäftsgeheimnisse** (z. B. proprietäre Algorithmen, strategische Pläne, Kundendaten) – Klares Nein für externe Cloud-Tools. Hier sind nur lokale Modelle (On-Premise) oder vollständig isolierte Systeme (Air-Gapped) akzeptabel.

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

- **„KI ersetzt mich"** – Diese Angst ist weit verbreitet und verständlich. Strategie: Konkret und glaubwürdig aufzeigen, wie KI Routinearbeiten abnimmt und den RE für anspruchsvollere, schöpferische Aufgaben freistellt. Kein abstraktes Versprechen, sondern echte Beispiele aus dem eigenen Projekt.

- **„Ich vertraue dem nicht"** – Skeptizismus ist gesund und sollte nicht bekämpft, sondern kanalisiert werden. Strategie: Offen über die Grenzen von KI sprechen (Halluzinationen, Bias), Piloten mit überprüfbaren Ergebnissen zeigen, die Kontrollmöglichkeiten betonen.

- **„Zu kompliziert"** – Oft ist die Lösung ein niedrigschwelliger Einstieg: Ein einfaches Use Case, ein gutes Tutorial, ein „Buddy" aus dem Team der bereits Erfahrung hat. Niemand muss alles auf einmal lernen.

- **„Ich habe Datenschutz-Bedenken"** – Diese Bedenken sind legitim und müssen ernst genommen werden. Strategie: Governance und Datenschutzregeln proaktiv klären, bevor das Tool eingesetzt wird – nicht nachher. Klare Richtlinien welche Daten eingegeben werden dürfen, kommunizieren.

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
        officialSyllabus: true,
        learningObjectives: ['LZ 6.1'],
        sourceSections: ['6'],
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

- **Bias** – Systematische Verzerrung in den Trainingsdaten oder im Modell-Output, die dazu führt, dass bestimmte Gruppen oder Perspektiven bevorzugt oder benachteiligt werden. Anders als zufällige Fehler tritt Bias konsistent und vorhersehbar auf. *(Prüfungsrelevanz: K1 – Definition kennen)*

- **Chain-of-Thought** – Eine Prompting-Technik, bei der das Modell aufgefordert wird, seine Überlegungen schrittweise darzustellen. Sie strukturiert die angeforderte Begründung, garantiert aber weder logische noch fachliche Korrektheit. *(Prüfungsrelevanz: K2 – Anwendung erklären)*

- **Embedding** – Eine numerische Vektordarstellung von Text, die semantische Ähnlichkeiten erfasst. Zwei ähnliche Sätze haben ähnliche Vektoren. Embeddings sind die Grundlage für die semantische Suche in RAG-Systemen. *(Prüfungsrelevanz: K1 – Wissen was es ist)*

- **Few-Shot** – Eine Prompting-Strategie, bei der einige Beispiele für die gewünschte Ausgabe direkt in den Prompt integriert werden. Beispiele können Aufgabe und Format verdeutlichen; ihre Wirkung hängt von Aufgabe, Modell, Kontext und Beispielqualität ab. *(Prüfungsrelevanz: K2 – Unterschied zu Zero-Shot)*

- **Fine-Tuning** – Das Nachtraining eines vortrainierten Sprachmodells mit domänenspezifischen Daten, um es auf einen bestimmten Stil, eine bestimmte Sprache oder ein Fachgebiet zu spezialisieren. Das Wissen wird dauerhaft ins Modell eingebettet. *(Prüfungsrelevanz: K2 – Vergleich mit RAG)*

- **Guardrails** – Technische Sicherheitsschranken, die in ein KI-System integriert werden, um unerwünschte Ausgaben zu filtern (z.B. Gewalt, Fehlinformationen, Off-Topic-Antworten). Guardrails können regelbasiert oder KI-gestützt sein. *(Prüfungsrelevanz: K1 – Begriff kennen)*

- **Halluzination** – Eine statistisch plausibel klingende, aber faktisch falsche Aussage eines Sprachmodells. Das Modell „weiß" nicht, dass es lügt – es berechnet wahrscheinliche Fortsetzungen, ohne Fakten zu prüfen. Halluzinationen sind eine Systemeigenschaft, die reduziert aber nie vollständig eliminiert werden kann. *(Prüfungsrelevanz: K2 – Ursachen erklären)*

- **Kontextfenster** – Die maximale Menge an Text (in Token), die ein Modell gleichzeitig verarbeiten und „sehen" kann. Inhalte außerhalb des Kontextfensters sind für das Modell nicht sichtbar. Moderne Modelle haben Kontextfenster von 128.000 Token und mehr. *(Prüfungsrelevanz: K1 – Definition)*

- **LLM (Large Language Model)** – Ein großes Sprachmodell, das auf enormen Textmengen vortrainiert wurde und natürlichsprachliche Texte verstehen und generieren kann. Beispiele: GPT-4, Claude, Gemini, Llama. *(Prüfungsrelevanz: K1 – Definition)*

- **Prompt** – Die Texteingabe, die ein Benutzer an ein KI-Modell sendet. Qualität und Struktur des Prompts haben direkten Einfluss auf die Qualität der Ausgabe. *(Prüfungsrelevanz: K1 – Definition)*

- **RAG (Retrieval Augmented Generation)** – Eine Architektur, bei der externe Dokumente zur Laufzeit gesucht und in den Prompt eingefügt werden, bevor das Modell antwortet. Ermöglicht aktuelles, nachvollziehbares Wissen ohne Nachtraining. *(Prüfungsrelevanz: K2 – Erklären und vergleichen)*

- **RTF (Rolle-Task-Format)** – Ein bewährtes Prompting-Pattern: Zuerst die Rolle des Modells definieren, dann die Aufgabe beschreiben, schließlich das gewünschte Ausgabeformat vorgeben. Verbessert Konsistenz und Relevanz der Antworten. *(Prüfungsrelevanz: K2 – Anwenden)*

- **System-Prompt** – Eine vorangestellte, für Endbenutzer unsichtbare Anweisung, die vom Entwickler gesetzt wird und die Grundausrichtung des Modells festlegt. Er hat die höchste Priorität im Kontextfenster und übersteuert Benutzeranweisungen. *(Prüfungsrelevanz: K1 – Unterschied zu Prompt)*

- **Temperatur** – Ein Modellparameter, der die Zufälligkeit der Token-Auswahl beeinflusst. Niedrigere Werte führen häufig zu konsistenteren, höhere Werte zu variableren Ausgaben. Einstellbarkeit und genaue Wirkung sind modell- und anbieterabhängig; auch Temperatur 0 garantiert nicht überall identische Antworten. *(Prüfungsrelevanz: K1 – Auswirkung kennen)*

- **Token** – Die kleinste Verarbeitungseinheit eines Sprachmodells. Ein Token entspricht ungefähr drei Vierteln eines Wortes. Kosten, Kapazitäten und Limits von LLMs werden in Token gemessen. *(Prüfungsrelevanz: K1 – Definition)*

- **Zero-Shot** – Prompting ohne jegliche Beispiele für die gewünschte Ausgabe. Das Modell muss allein aus der Aufgabenbeschreibung verstehen, was erwartet wird. Funktioniert bei klaren Aufgaben gut, bei komplexen besser Few-Shot verwenden. *(Prüfungsrelevanz: K2 – Unterschied zu Few-Shot)*

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
- P-Fragen (Mehrfachauswahl): Punkte pro richtiger Auswahl; bei zu vielen Auswahlen 0 Punkte für die gesamte Frage.
- K-Fragen (Richtig/Falsch): Punkte pro korrekt bewerteter Aussage.
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
    FT --> P[P-Frage<br/>Mehrfachauswahl]
    FT --> K[K-Frage<br/>Richtig/Falsch]
    
    A --> A1[1 Punkt<br/>Richtig oder Falsch<br/>Kein Teilpunkt]
    P --> P1[Fragepunkte geteilt durch<br/>korrekte Auswahlen<br/>Zu viele Auswahlen: 0 Punkte]
    K --> K1[Fragepunkte geteilt durch<br/>Anzahl Aussagen<br/>Teilpunkte möglich]
    
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
    TRAP --> T1[Fragelogik<br/>Negationen und Anzahl<br/>genau lesen]
    TRAP --> T2[Rollenverteilung<br/>Unterstützung nicht mit<br/>Verantwortung verwechseln]
    TRAP --> T3[Plausibilität<br/>Option gegen Syllabus-Begriff<br/>und Kontext prüfen]
    TRAP --> T4[Veraltete Begriffe<br/>Achtung bei Synonymen<br/>Syllabus-Definition gilt]
    
    style TRAP fill:#dc2626,color:#fff
    style T1 fill:#fee2e2
    style T2 fill:#fee2e2
    style T3 fill:#fee2e2
    style T4 fill:#fef3c7
\`\`\`

### P-Fragen-Strategie (WICHTIG!)

> **Die Anzahl beachten!** Bei P-Fragen führt eine Auswahl von mehr Antworten als gefordert zu 0 Punkten für die gesamte Frage.

| Situation | Empfehlung |
|-----------|------------|
| Sicher richtig | Ankreuzen |
| Unsicher | Nicht auswählen; es gibt keinen Punkt für eine falsche Auswahl |
| Sicher falsch | Auf keinen Fall ankreuzen |
| 50/50 | Nur auswählen, wenn die Antwort fachlich begründbar ist |

### Die goldenen Prüfungsregeln

1. **Menschliche Verantwortung** - Immer die Antwort wählen, die menschliches Review betont
2. **KI als Werkzeug** - KI unterstützt, ersetzt nie den RE
3. **Validierung ist Pflicht** - KI-Output muss IMMER geprüft werden
4. **Kontext ist König** - Besserer Input = Besserer Output
5. **Keine Perfektion** - Halluzinationen sind nie vollständig vermeidbar
`,
        keywords: ['Prüfung', 'Punktevergabe', 'Zeitmanagement', 'Taktik', 'P-Frage', 'K-Frage', 'A-Frage'],
        difficulty: 'beginner' as const,
    },
]


