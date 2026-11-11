// Rendert das Open-Book-HTML (inkl. Mermaid) deterministisch zu PDF.
// Nutzt den lokal installierten Chrome/Edge via puppeteer-core (kein eigener Download).
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const htmlPath = join(root, 'docs', 'CPRE-AI4RE-OpenBook.html');
const pdfPath = join(root, 'docs', 'CPRE-AI4RE-OpenBook.pdf');

const browserCandidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const executablePath = browserCandidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error('Kein Chrome/Edge gefunden.');
  process.exit(1);
}
if (!existsSync(htmlPath)) {
  console.error('HTML fehlt \u2013 zuerst: node scripts/build-open-book.mjs');
  process.exit(1);
}

const url = pathToFileURL(htmlPath).href;

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-gpu'],
});
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.warn('pageerror:', e.message));
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
  // Auf Abschluss des Mermaid-Renderings warten.
  await page.waitForFunction('window.__renderDone === true', { timeout: 90000 });
  await page.waitForSelector('svg[aria-roledescription]', { timeout: 90000 });
  const svgCount = await page.$$eval('svg[aria-roledescription]', (els) => els.length);
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log('\u2705 PDF erzeugt:', pdfPath);
  console.log('   Gerenderte Diagramme:', svgCount);
} finally {
  await browser.close();
}
