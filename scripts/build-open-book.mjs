// Generiert ein druckfertiges Open-Book-HTML (A4) aus den Lernmodulen.
// Danach per Chrome/Edge headless zu PDF konvertieren (siehe build-open-book-pdf).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataPath = join(root, 'apps', 'web', 'public', 'data', 'modules.json');
const outDir = join(root, 'docs');
const htmlPath = join(outDir, 'CPRE-AI4RE-OpenBook.html');

const preferredOrder = [
  'plan',
  'chapter1',
  'chapter2-llm',
  'chapter3-prompt-engineering',
  'chapter4-risks',
  'chapter4-responsibilities',
  'chapter5-overview',
  'chapter5-use-cases',
  'practice-ai-adoption',
  'terminology',
  'exam-rules',
];

marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Mermaid-Bloecke vor dem Markdown-Parsing sichern, danach als <pre class="mermaid"> einsetzen.
function renderMarkdown(md) {
  const store = [];
  const guarded = md.replace(/```mermaid\n([\s\S]*?)```/g, (_m, code) => {
    const idx = store.length;
    store.push(code.replace(/\s+$/, ''));
    return `\n\n<div class="mermaid-ph" data-idx="${idx}"></div>\n\n`;
  });
  let html = marked.parse(guarded);
  html = html.replace(/<div class="mermaid-ph" data-idx="(\d+)"><\/div>/g, (_m, i) =>
    `<pre class="mermaid">${escapeHtml(store[Number(i)])}</pre>`);
  return html;
}

function stripLeadingH1(md) {
  return md.replace(/^\s*#\s+.*\r?\n/, '');
}

const modules = JSON.parse(readFileSync(dataPath, 'utf8'));
const byId = new Map(modules.map((m) => [m.id, m]));
const ordered = [
  ...preferredOrder.filter((id) => byId.has(id)).map((id) => byId.get(id)),
  ...modules.filter((m) => !preferredOrder.includes(m.id)),
];

const generatedAt = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

const toc = ordered
  .map((m, i) => {
    const lz = Array.isArray(m.learningObjectives) && m.learningObjectives.length
      ? ` <span class="toc-lz">${m.learningObjectives.join(', ')}</span>` : '';
    return `<li><span class="toc-num">${i + 1}</span>${m.title}${lz}</li>`;
  })
  .join('\n');

const sections = ordered
  .map((m) => {
    const meta = [
      m.domain,
      Array.isArray(m.learningObjectives) ? m.learningObjectives.join(', ') : null,
      Array.isArray(m.sourceSections) && m.sourceSections.length ? '\u00a7 ' + m.sourceSections.join(', ') : null,
    ].filter(Boolean).join('  \u00b7  ');
    const summary = m.summary ? `<div class="summary">${renderMarkdown(m.summary)}</div>` : '';
    const content = m.content ? `<div class="content">${renderMarkdown(stripLeadingH1(m.content))}</div>` : '';
    return `<section class="module">
  <header class="mod-header">
    <h1>${m.title}</h1>
    <div class="mod-meta">${meta}</div>
  </header>
  ${summary}
  ${content}
</section>`;
  })
  .join('\n');

const mermaidCandidates = [
  join(root, 'node_modules', 'mermaid', 'dist', 'mermaid.esm.min.mjs'),
];
const mermaidUrl = pathToFileURL(mermaidCandidates[0]).href;

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>CPRE AI4RE \u2013 Open-Book Referenz</title>
<style>
  @page { size: A4; margin: 14mm 14mm 16mm 14mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #1f2937; margin: 0; }
  h1, h2, h3, h4 { color: #1e3a8a; line-height: 1.2; }
  h1 { font-size: 17pt; margin: 0 0 2mm; }
  h2 { font-size: 13pt; margin: 5mm 0 2mm; border-bottom: 1px solid #dbeafe; padding-bottom: 1mm; }
  h3 { font-size: 11.5pt; margin: 4mm 0 1.5mm; }
  h4 { font-size: 10.5pt; margin: 3mm 0 1mm; }
  p { margin: 1.5mm 0; }
  ul, ol { margin: 1.5mm 0 1.5mm 5mm; padding: 0; }
  li { margin: 0.8mm 0; }
  code { background: #f1f5f9; padding: 0 1mm; border-radius: 2px; font-size: 9.5pt; }
  blockquote { margin: 2mm 0; padding: 1.5mm 3mm; background: #fef9c3; border-left: 3px solid #eab308; border-radius: 3px; }
  blockquote p { margin: 0.5mm 0; }
  table { border-collapse: collapse; width: 100%; margin: 2mm 0; font-size: 9.3pt; page-break-inside: avoid; }
  th, td { border: 1px solid #cbd5e1; padding: 1.2mm 2mm; text-align: left; vertical-align: top; }
  th { background: #eff6ff; color: #1e3a8a; }
  tr:nth-child(even) td { background: #f8fafc; }
  .mermaid { text-align: center; margin: 3mm 0; page-break-inside: avoid; }
  .mermaid svg { max-width: 100%; height: auto; }
  .module { page-break-before: always; }
  .mod-header { border-left: 5px solid #2563eb; padding: 1mm 0 1mm 3mm; margin-bottom: 3mm; background: #f0f7ff; }
  .mod-meta { font-size: 9pt; color: #475569; }
  .summary { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2mm 3mm; margin-bottom: 3mm; }
  .summary h2 { border: none; margin-top: 0; font-size: 11pt; }

  /* Deckblatt + Inhaltsverzeichnis */
  .cover { page-break-after: always; text-align: center; padding-top: 45mm; }
  .cover .brand { font-size: 12pt; letter-spacing: 3px; color: #2563eb; text-transform: uppercase; }
  .cover h1 { font-size: 30pt; margin: 6mm 0 2mm; color: #1e3a8a; }
  .cover .sub { font-size: 13pt; color: #334155; }
  .cover .date { margin-top: 4mm; font-size: 10pt; color: #64748b; }
  .rules { display: inline-block; text-align: left; margin: 12mm auto 0; padding: 3mm 5mm; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; font-size: 10pt; max-width: 130mm; }
  .rules b { color: #1e3a8a; }
  .ok { color: #047857; font-weight: 600; }
  .no { color: #b91c1c; font-weight: 600; }
  .toc { page-break-after: always; }
  .toc h2 { border: none; }
  .toc ol { list-style: none; margin-left: 0; }
  .toc li { padding: 1mm 0; border-bottom: 1px dotted #cbd5e1; font-size: 11pt; }
  .toc-num { display: inline-block; width: 7mm; color: #2563eb; font-weight: 700; }
  .toc-lz { color: #64748b; font-size: 9pt; }
  .footnote { font-size: 8pt; color: #94a3b8; text-align: center; margin-top: 6mm; }
</style>
</head>
<body>
  <div class="cover">
    <div class="brand">IREB Micro-Credential</div>
    <h1>AI4RE &mdash; Open-Book Referenz</h1>
    <div class="sub">Lernkompendium f\u00fcr die Pr\u00fcfung &bull; alle Module &amp; Glossar</div>
    <div class="date">Stand: ${generatedAt} &bull; Basis: AI4RE Syllabus &amp; Studienleitfaden v1.0.0</div>
    <div class="rules">
      <b>Pr\u00fcfungsregeln (Open Book):</b><br/>
      <span class="ok">Erlaubt:</span> eigene Notizen, B\u00fccher, dieses Dokument (sofern von der Pr\u00fcfungsstelle zugelassen).<br/>
      <span class="no">Nicht erlaubt:</span> KI-Tools/LLMs oder jede Form fremder Hilfe w\u00e4hrend der Pr\u00fcfung.<br/>
      22 Fragen &bull; 30 Minuten &bull; 80&nbsp;% Bestehensgrenze.
    </div>
    <div class="footnote">Inoffizielles Lernmaterial. Inhalte paraphrasiert nach IREB AI4RE v1.0.0. Kein Ersatz f\u00fcr die Originaldokumente.</div>
  </div>

  <div class="toc">
    <h2>Inhaltsverzeichnis</h2>
    <ol>
      ${toc}
    </ol>
  </div>

  ${sections}

  <script type="module">
    try {
      const mermaid = (await import(${JSON.stringify(mermaidUrl)})).default;
      mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose', flowchart: { htmlLabels: true, useMaxWidth: true } });
      await mermaid.run({ querySelector: 'pre.mermaid' });
    } catch (e) {
      document.body.insertAdjacentHTML('afterbegin', '<div style="color:#b91c1c">Mermaid-Rendering fehlgeschlagen: ' + (e && e.message) + '</div>');
    }
    window.__renderDone = true;
  </script>
</body>
</html>`;

mkdirSync(outDir, { recursive: true });
writeFileSync(htmlPath, html, 'utf8');
console.log('\u2705 Open-Book HTML erzeugt:', htmlPath);
console.log('   Module:', ordered.length);
