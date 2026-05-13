import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const FORM_URL =
  'https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application';

const LOG_PATH = path.join('evidence', 'logs', 'form-inspection-latest.json');
const SCREENSHOT_PATH = path.join('evidence', 'screenshots', 'form-inspection-latest.png');
const NOTES_PATH = path.join('inputs', 'application-form-notes.md');
const FORM_LOG_PATH = path.join('docs', '06-form-submission-log.md');

type AtsField = {
  title: string;
  fieldType: string;
  oid: string;
  required: boolean;
};

type VisibleControl = {
  tag: string;
  type: string | null;
  name: string | null;
  ariaLabel: string | null;
  placeholder: string | null;
  text: string | null;
  required: boolean;
};

function markdownTable(headers: string[], rows: string[][]): string {
  const safeRows = rows.length > 0 ? rows : [headers.map(() => 'None detected')];
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...safeRows.map((row) => `| ${row.map((cell) => cell.replace(/\|/g, '\\|')).join(' | ')} |`)
  ].join('\n');
}

test('inspect Opendoor Rippling application form without submitting', async ({ page }) => {
  await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
  await fs.mkdir(path.dirname(SCREENSHOT_PATH), { recursive: true });

  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => undefined);

  const metadata = await page.evaluate(() => {
    const raw = document.querySelector('#__NEXT_DATA__')?.textContent;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const jobPost = parsed?.props?.pageProps?.apiData?.jobPost;
    return {
      uuid: jobPost?.uuid ?? null,
      name: jobPost?.name ?? null,
      companyName: jobPost?.companyName ?? null,
      workLocations: jobPost?.workLocations ?? [],
      department: jobPost?.department ?? null,
      employmentType: jobPost?.employmentType ?? null,
      customFields: jobPost?.activeJobApplication?.customQuestions?.fields ?? [],
      additionalQuestions: jobPost?.activeJobApplication?.additionalQuestions ?? null,
      eeocQuestionnaireEnabled: jobPost?.eeocQuestionnaireEnabled ?? null,
      eeocQuestionnaireEnabledForJobPost: jobPost?.eeocQuestionnaireEnabledForJobPost ?? null
    };
  });

  const visibleControls = await page.evaluate<VisibleControl[]>(() => {
    const controls = Array.from(document.querySelectorAll('input, textarea, select, button'));
    return controls
      .filter((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement;
        const text = input.textContent?.trim().replace(/\s+/g, ' ') || null;
        return {
          tag: input.tagName.toLowerCase(),
          type: input.getAttribute('type'),
          name: input.getAttribute('name'),
          ariaLabel: input.getAttribute('aria-label'),
          placeholder: input.getAttribute('placeholder'),
          text: text && text.length <= 120 ? text : text ? `${text.slice(0, 117)}...` : null,
          required: input.hasAttribute('required') || input.getAttribute('aria-required') === 'true'
        };
      });
  });

  const visiblePageSignals = await page.evaluate(() => {
    const bodyText = document.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    return {
      eeocEnabled: bodyText.includes('U.S. Equal Opportunity Employment Information'),
      eeocFields: [
        'Gender',
        'Please identify your race',
        'Are you Hispanic/Latino?',
        'Veteran Status',
        'Disability Status'
      ].filter((label) => bodyText.includes(label)),
      smsConsentPresent:
        bodyText.includes('I consent to receiving text messages') ||
        bodyText.includes('I do not consent to receiving text messages'),
      termsNoticePresent:
        bodyText.includes('By clicking "Apply" you agree to Rippling') ||
        bodyText.includes('Terms of Service'),
      aiApplicationAnalysisNoticePresent: bodyText.includes('uses AI to analyze applications')
    };
  });

  // EN: Capture only the blank form before any private data is entered.
  // FR: Capture uniquement le formulaire vide avant toute saisie de donnees privees.
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

  const fields: AtsField[] = metadata?.customFields ?? [];
  const requiredFields = fields.filter((field) => field.required);
  const optionalFields = fields.filter((field) => !field.required);
  const inspectedAt = new Date().toISOString();

  const result = {
    inspectedAt,
    url: FORM_URL,
    note: 'Inspection only. No data entry, upload, consent action, or submission was attempted.',
    metadata,
    visibleControls,
    visiblePageSignals
  };

  await fs.writeFile(LOG_PATH, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  const fieldRows = fields.map((field) => [
    field.title,
    field.fieldType,
    field.oid,
    field.required ? 'Yes' : 'No'
  ]);

  const requiredRows = requiredFields.map((field) => [field.title, field.fieldType, field.oid]);
  const optionalRows = optionalFields.map((field) => [field.title, field.fieldType, field.oid]);
  const visibleSignalRows = [
    ['Voluntary EEOC section', visiblePageSignals.eeocEnabled ? 'Detected' : 'Not detected'],
    ['Visible EEOC fields', visiblePageSignals.eeocFields.join(', ') || 'None detected'],
    ['SMS consent radio buttons', visiblePageSignals.smsConsentPresent ? 'Detected' : 'Not detected'],
    ['Rippling terms notice', visiblePageSignals.termsNoticePresent ? 'Detected' : 'Not detected'],
    [
      'AI application analysis notice',
      visiblePageSignals.aiApplicationAnalysisNoticePresent ? 'Detected' : 'Not detected'
    ]
  ];

  const notes = `# Application Form Notes

Status: Inspected

Last inspected: ${inspectedAt}

Form URL: ${FORM_URL}

Inspection method: Playwright blank-form inspection using \`scripts/inspect-form.spec.ts\`.

Safety note: No private candidate data was entered, no files were uploaded, no consent controls were accepted, and no submission was attempted.

## Job Metadata

- Company: ${metadata?.companyName ?? 'Unknown'}
- Role: ${metadata?.name ?? 'Unknown'}
- Job UUID: ${metadata?.uuid ?? 'Unknown'}
- Location: ${(metadata?.workLocations ?? []).join(', ') || 'Unknown'}
- Employment type: ${metadata?.employmentType?.id ?? metadata?.employmentType?.label ?? 'Unknown'}
- EEOC questionnaire enabled: ${metadata?.eeocQuestionnaireEnabled ? 'Yes' : 'No'}

## Fields Detected From ATS Metadata

${markdownTable(['Field', 'Type', 'OID', 'Required'], fieldRows)}

## Required Inputs

${markdownTable(['Field', 'Type', 'OID'], requiredRows)}

## Optional Inputs

${markdownTable(['Field', 'Type', 'OID'], optionalRows)}

## Additional Visible Sections And Notices

${markdownTable(['Section / Notice', 'Inspection Result'], visibleSignalRows)}

## Evidence

- Structured log: \`${LOG_PATH.replace(/\\/g, '/')}\`
- Blank-form screenshot: \`${SCREENSHOT_PATH.replace(/\\/g, '/')}\`

## Form-Fill Implications

- Local config should provide values for required text and phone fields.
- Resume upload is required.
- Cover letter upload is optional.
- Pronouns, current company, and LinkedIn are optional.
- EEOC demographic questions are visible and voluntary.
- SMS consent controls are visible and must not be selected without human approval.
- The form shows a notice that Opendoor Labs Inc. uses AI to analyze applications, with an opt-out link.
- Any automation must pause before EEOC, consent, certification, opt-out, or final submission actions.
`;

  const formLog = `# Form Submission Log

Status: Inspected

## Form URL

${FORM_URL}

## Inspection Log

| Date | Action | Result | Evidence |
| --- | --- | --- | --- |
| 2026-05-13 | Inspect blank ATS form | Detected ${fields.length} metadata fields; no private data entered and no submission attempted | \`${LOG_PATH.replace(/\\/g, '/')}\`, \`${SCREENSHOT_PATH.replace(/\\/g, '/')}\` |

## Fields Detected

${markdownTable(['Field', 'Type', 'OID', 'Required'], fieldRows)}

## Required Inputs

${markdownTable(['Field', 'Type', 'OID'], requiredRows)}

## Optional Inputs

${markdownTable(['Field', 'Type', 'OID'], optionalRows)}

## Additional Visible Sections And Notices

${markdownTable(['Section / Notice', 'Inspection Result'], visibleSignalRows)}

## Attachments Uploaded

None.

## Validation Issues

None recorded during blank-form inspection.

## Submission Notes

No submission has been attempted. Automation must pause before final submission for human review.
`;

  await fs.writeFile(NOTES_PATH, notes, 'utf8');
  await fs.writeFile(FORM_LOG_PATH, formLog, 'utf8');
});
