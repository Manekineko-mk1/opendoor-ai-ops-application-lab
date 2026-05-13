import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = process.cwd();
const outputsDir = path.join(root, 'outputs');

const documents = [
  {
    input: path.join(outputsDir, 'tailored-cv.md'),
    output: path.join(outputsDir, 'Jesse_Tsang_Opendoor_Operations_AI_Engineer_CV.pdf'),
    title: 'Jesse Tsang - Opendoor Operations AI Engineer CV',
    type: 'cv'
  },
  {
    input: path.join(outputsDir, 'cover-letter.md'),
    output: path.join(outputsDir, 'Jesse_Tsang_Opendoor_Cover_Letter.pdf'),
    title: 'Jesse Tsang - Opendoor Cover Letter',
    type: 'letter'
  }
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replaceAll(/`([^`]+)`/g, '<code>$1</code>')
    .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdownToHtml(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listOpen = false;

  function closeParagraph() {
    if (paragraph.length === 0) return;
    html.push(`<p>${paragraph.map(inlineMarkdown).join('<br>')}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listOpen) return;
    html.push('</ul>');
    listOpen = false;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      closeParagraph();
      closeList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith('- ')) {
      closeParagraph();
      if (!listOpen) {
        html.push('<ul>');
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  closeParagraph();
  closeList();
  return html.join('\n');
}

function pageHtml({ title, type, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page {
      margin: ${type === 'letter' ? '0.75in' : '0.52in'};
    }

    body {
      color: #172033;
      font-family: Arial, Helvetica, sans-serif;
      font-size: ${type === 'letter' ? '10.8pt' : '8.9pt'};
      line-height: ${type === 'letter' ? '1.48' : '1.24'};
      margin: 0;
    }

    h1 {
      color: #0f172a;
      font-size: ${type === 'letter' ? '17pt' : '18pt'};
      line-height: 1.15;
      margin: 0 0 5px;
    }

    h2 {
      border-bottom: 1px solid #b9c2d0;
      color: #0f172a;
      font-size: ${type === 'letter' ? '12pt' : '10.5pt'};
      letter-spacing: 0;
      line-height: 1.2;
      margin: ${type === 'letter' ? '18px' : '9px'} 0 5px;
      padding-bottom: 2px;
    }

    h3 {
      color: #1e293b;
      font-size: ${type === 'letter' ? '11pt' : '9.3pt'};
      line-height: 1.2;
      margin: ${type === 'letter' ? '14px' : '7px'} 0 2px;
    }

    p {
      margin: 0 0 ${type === 'letter' ? '12px' : '5px'};
    }

    ul {
      margin: 0 0 ${type === 'letter' ? '10px' : '5px'} 18px;
      padding: 0;
    }

    li {
      margin: 0 0 ${type === 'letter' ? '6px' : '3px'};
      padding-left: 1px;
    }

    code {
      color: #111827;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.94em;
    }

    strong {
      color: #0f172a;
    }

    h2, h3 {
      break-after: avoid;
    }

    li, p {
      break-inside: avoid;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

await mkdir(outputsDir, { recursive: true });

const browser = await chromium.launch();

try {
  for (const document of documents) {
    const markdown = await readFile(document.input, 'utf8');
    const body = markdownToHtml(markdown);
    const page = await browser.newPage();
    await page.setContent(pageHtml({ ...document, body }), { waitUntil: 'load' });
    await page.pdf({
      path: document.output,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true
    });
    await page.close();
    console.log(`Generated ${path.relative(root, document.output)}`);
  }
} finally {
  await browser.close();
}
