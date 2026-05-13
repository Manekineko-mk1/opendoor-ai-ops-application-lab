import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'inputs', 'application-data.local.json');
const outputPath = path.join(root, 'outputs', 'manual-submission-helper.html');
const formUrl =
  'https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function fileUrl(filePath) {
  const absolute = path.resolve(root, filePath);
  return `file:///${absolute.replaceAll('\\', '/')}`;
}

const data = JSON.parse(await readFile(configPath, 'utf8'));

const fields = [
  ['First name', data.firstName],
  ['Last name', data.lastName],
  ['Email', data.email],
  ['Phone country', '+1 CA'],
  ['Phone number', data.phone],
  ['Location', data.location],
  ['Current company', data.currentCompany],
  ['LinkedIn Link', data.linkedinUrl],
  ['SMS consent', 'No - I do not consent to receiving text messages'],
  ['Voluntary EEOC fields', 'Leave blank'],
  ['Veteran Status', 'Leave blank'],
  ['Disability Status', 'Leave blank']
];

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Opendoor Manual Submission Helper</title>
  <style>
    body {
      color: #172033;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.45;
      margin: 32px auto;
      max-width: 980px;
      padding: 0 20px;
    }

    h1 {
      font-size: 26px;
      margin: 0 0 6px;
    }

    h2 {
      border-bottom: 1px solid #c8d1dc;
      font-size: 18px;
      margin-top: 28px;
      padding-bottom: 4px;
    }

    .note {
      background: #eef6ff;
      border: 1px solid #bdd7f5;
      border-radius: 6px;
      margin: 18px 0;
      padding: 12px 14px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      border-bottom: 1px solid #e3e8ef;
      padding: 10px 8px;
      text-align: left;
      vertical-align: top;
    }

    th {
      color: #334155;
      font-size: 13px;
      text-transform: uppercase;
    }

    code {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      display: inline-block;
      font-family: Consolas, "Courier New", monospace;
      padding: 3px 5px;
    }

    button {
      border: 1px solid #91a4b7;
      border-radius: 5px;
      background: white;
      cursor: pointer;
      padding: 6px 10px;
    }

    button:hover {
      background: #f8fafc;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <h1>Opendoor Manual Submission Helper</h1>
  <p>Local-only helper generated from <code>inputs/application-data.local.json</code>.</p>

  <div class="note">
    Use your normal trusted browser for the ATS page. This helper does not automate or control Rippling.
    After submission, confirm the success page says <strong>You have successfully applied to Operations AI Engineer</strong>
    or verify the confirmation email.
  </div>

  <div class="actions">
    <a href="${escapeHtml(formUrl)}" target="_blank" rel="noreferrer"><button>Open ATS Form</button></a>
    <a href="${escapeHtml(fileUrl(data.resumePath))}" target="_blank" rel="noreferrer"><button>Open CV PDF</button></a>
    <a href="${escapeHtml(fileUrl(data.coverLetterPath))}" target="_blank" rel="noreferrer"><button>Open Cover Letter PDF</button></a>
  </div>

  <h2>Values</h2>
  <table>
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Copy</th>
      </tr>
    </thead>
    <tbody>
      ${fields
        .map(
          ([label, value]) => `<tr>
        <td>${escapeHtml(label)}</td>
        <td><code>${escapeHtml(value)}</code></td>
        <td><button data-copy="${escapeHtml(value)}">Copy</button></td>
      </tr>`
        )
        .join('\n')}
    </tbody>
  </table>

  <h2>Upload Files</h2>
  <p>Resume: <code>${escapeHtml(path.resolve(root, data.resumePath))}</code></p>
  <p>Cover letter: <code>${escapeHtml(path.resolve(root, data.coverLetterPath))}</code></p>

  <h2>Confirmation Checklist</h2>
  <ul>
    <li>Confirm CV PDF is uploaded.</li>
    <li>Confirm cover letter PDF is uploaded.</li>
    <li>Confirm location is <code>Montreal, QC, Canada</code>.</li>
    <li>Confirm phone country is <code>+1 CA</code> and phone number is <code>${escapeHtml(data.phone)}</code>.</li>
    <li>Leave voluntary EEOC, veteran, and disability fields blank.</li>
    <li>Select SMS consent <code>No</code>.</li>
    <li>Click Apply in your normal browser.</li>
    <li>Verify success page or confirmation email.</li>
  </ul>

  <script>
    for (const button of document.querySelectorAll('button[data-copy]')) {
      button.addEventListener('click', async () => {
        const value = button.getAttribute('data-copy') || '';
        try {
          await navigator.clipboard.writeText(value);
          button.textContent = 'Copied';
          setTimeout(() => (button.textContent = 'Copy'), 1200);
        } catch {
          window.prompt('Copy this value:', value);
        }
      });
    }
  </script>
</body>
</html>
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, html, 'utf8');
console.log(path.relative(root, outputPath));
