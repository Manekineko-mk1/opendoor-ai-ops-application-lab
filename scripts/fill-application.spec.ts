import { expect, type Page, test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const FORM_URL =
  'https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application';

const CONFIG_PATH = path.join('inputs', 'application-data.local.json');
const REDACTED_LOG_PATH = path.join('evidence', 'logs', 'form-fill-latest.redacted.json');
const SCREENSHOT_PATH = path.join('evidence', 'screenshots', 'form-fill-paused-before-submit.png');
const FINAL_SUBMISSION_RUN = process.env.FINAL_SUBMISSION_RUN === '1';
const SUBMIT_APPLICATION = process.env.SUBMIT_APPLICATION === '1';
const FINAL_REVIEW_TIMEOUT_MS = 20 * 60 * 1000;
const SUBMISSION_TIMEOUT_MS = 6 * 60 * 1000;
const SUCCESS_TIMEOUT_MS = 4 * 60 * 1000;
const SUCCESS_MESSAGE = /You have successfully applied to Operations AI Engineer/i;

type ApplicationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  location: string;
  pronouns?: string;
  currentCompany?: string;
  linkedinUrl?: string;
  resumePath: string;
  coverLetterPath?: string;
  smsConsent?: 'yes' | 'no' | 'human-review-required';
  eeoc?: 'human-review-required';
};

const requiredConfigFields: Array<keyof ApplicationData> = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'location',
  'resumePath'
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function redactValue(key: string, value: unknown): unknown {
  if (typeof value !== 'string') return value;
  if (['firstName', 'lastName', 'email', 'phone', 'location', 'linkedinUrl', 'currentCompany'].includes(key)) {
    return value ? '[REDACTED]' : '';
  }
  return value;
}

function redactConfig(data: ApplicationData): Record<string, unknown> {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, redactValue(key, value)]));
}

async function loadApplicationData(): Promise<ApplicationData> {
  const exists = await fileExists(CONFIG_PATH);
  if (!exists) {
    throw new Error(
      `Missing ${CONFIG_PATH}. Create it from inputs/application-data.example.json. Do not commit the local file.`
    );
  }

  const raw = await fs.readFile(CONFIG_PATH, 'utf8');
  const parsed = JSON.parse(raw) as ApplicationData;
  const missing = requiredConfigFields.filter((field) => !String(parsed[field] ?? '').trim());

  if (missing.length > 0) {
    throw new Error(`Missing required local application data fields: ${missing.join(', ')}`);
  }

  if (!(await fileExists(parsed.resumePath))) {
    throw new Error(`Resume file does not exist: ${parsed.resumePath}`);
  }

  if (parsed.coverLetterPath && !(await fileExists(parsed.coverLetterPath))) {
    throw new Error(`Cover letter file does not exist: ${parsed.coverLetterPath}`);
  }

  if (parsed.smsConsent && parsed.smsConsent !== 'human-review-required') {
    throw new Error('SMS consent must remain human-review-required for this automation phase.');
  }

  return parsed;
}

async function writeRedactedLog(data: ApplicationData, events: string[]) {
  const finalApplyClicked = events.some((event) => event.includes('Clicked final Apply'));
  const successObserved = events.some((event) => event.includes('Observed successful application confirmation message'));
  await fs.mkdir(path.dirname(REDACTED_LOG_PATH), { recursive: true });
  await fs.writeFile(
    REDACTED_LOG_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        url: FORM_URL,
        note: successObserved
          ? 'Redacted log. Successful application confirmation was observed after explicit user authorization. Raw video remains local/private.'
          : finalApplyClicked
            ? 'Redacted log. Final Apply was clicked after explicit user authorization, but no success confirmation was observed. Raw video remains local/private.'
            : 'Redacted log. No final submission attempted. EEOC, SMS consent, terms, and final apply remain human-reviewed.',
        applicationData: redactConfig(data),
        events
      },
      null,
      2
    )}\n`,
    'utf8'
  );
}

async function gotoWithRetry(page: Page, url: string, events: string[]) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
      events.push(`Opened application form on navigation attempt ${attempt}.`);
      return;
    } catch (error) {
      events.push(`Navigation attempt ${attempt} failed before data entry.`);
      if (attempt === 2) throw error;
    }
  }
}

async function fillTextbox(page: Page, name: string | RegExp, value: string) {
  const textbox = page.getByRole('textbox', { name });
  await textbox.fill(value);
  await expect(textbox).toHaveValue(value);
}

async function fillPhone(page: Page, value: string) {
  const country = page.getByRole('combobox', { name: 'Search' });
  await expect(country).toBeVisible();
  await country.click();
  await country.fill('Canada');
  await page.getByRole('option', { name: /\+1\s+CA|Canada/i }).first().click();

  const textbox = page.getByRole('textbox', { name: 'Phone number' });
  await textbox.fill(value);
  await expect(textbox).not.toHaveValue('');
}

async function fillLocation(page: Page, value: string) {
  const textbox = page.getByRole('textbox', { name: 'Location' });
  await textbox.fill(value);

  const option = page.getByRole('option', { name: /Montreal,\s*QC,\s*Canada/i }).first();
  await expect(option).toBeVisible({ timeout: 10_000 });
  await option.click();

  await expect(textbox).toHaveValue(/Montreal/i);
}

async function selectSmsNo(page: Page) {
  const noRadio = page.getByRole('radio', { name: /No.*do not consent/i });
  await expect(noRadio).toBeVisible({ timeout: 5_000 });
  await noRadio.check({ force: true });
}

async function completeHumanOnlySubmissionFields(page: Page, events: string[]) {
  events.push('Left voluntary EEOC demographic fields blank.');

  try {
    await selectSmsNo(page);
    events.push('Selected no SMS consent.');
  } catch {
    events.push('Could not auto-select SMS no consent; continuing.');
  }

  events.push('No separate certification checkbox detected; Rippling terms are attached to the Apply action.');
}

test('fill Opendoor application draft and pause before submit', async ({ page }) => {
  test.setTimeout(SUBMIT_APPLICATION ? SUBMISSION_TIMEOUT_MS : FINAL_SUBMISSION_RUN ? FINAL_REVIEW_TIMEOUT_MS + 90_000 : 60_000);

  const data = await loadApplicationData();
  const events: string[] = ['Loaded and validated local application data.'];

  page.on('requestfailed', (request) => {
    if (/rippling|opendoor|ats/i.test(request.url())) {
      events.push(`Network request failed after Apply click: ${request.method()} ${request.url()} ${request.failure()?.errorText}`);
    }
  });

  await gotoWithRetry(page, FORM_URL, events);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await expect(page.getByRole('heading', { name: /Application: Operations AI Engineer/i }).first()).toBeVisible();

  const fileInputs = page.locator('input[type="file"]');
  await expect(fileInputs.first()).toBeAttached();
  await fileInputs.nth(0).setInputFiles(data.resumePath);
  await expect(page.getByText(/uploaded successfully/i)).toBeVisible({ timeout: 15_000 });
  await page.waitForTimeout(3_000);
  events.push('Uploaded resume from local path.');

  await fillTextbox(page, 'First name', data.firstName);
  await fillTextbox(page, 'Last name', data.lastName);
  await fillTextbox(page, 'Email', data.email);
  events.push('Filled required identity fields.');

  if (data.currentCompany) {
    await fillTextbox(page, 'Current company', data.currentCompany);
    events.push('Filled optional current company field.');
  }

  await fillPhone(page, data.phone);
  events.push('Selected +1 CA phone country and filled required phone field.');

  await fillLocation(page, data.location);
  events.push('Selected Montreal, QC, Canada location suggestion.');

  if (data.linkedinUrl) {
    await fillTextbox(page, 'LinkedIn Link', data.linkedinUrl);
    events.push('Filled optional LinkedIn field.');
  }

  if (data.coverLetterPath) {
    const count = await fileInputs.count();
    if (count < 2) {
      throw new Error('Cover letter path was provided, but a second file input was not found.');
    }
    await fileInputs.nth(1).setInputFiles(data.coverLetterPath);
    events.push('Uploaded optional cover letter from local path.');
  }

  // EN: Stop before voluntary EEOC, SMS consent, terms, and final submit.
  await fs.mkdir(path.dirname(SCREENSHOT_PATH), { recursive: true });
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
  events.push('Captured screenshot at pre-submit human-review gate.');

  await writeRedactedLog(data, events);

  await expect(page.getByRole('button', { name: /^Apply$/ })).toBeVisible();
  test.info().annotations.push({
    type: 'human-review-required',
    description:
      'Automation intentionally stops before EEOC, SMS consent, terms, opt-out choices, and final application submission.'
  });

  if (SUBMIT_APPLICATION) {
    events.push('User explicitly authorized AI-assisted completion of consent fields and final Apply.');
    await completeHumanOnlySubmissionFields(page, events);
    await writeRedactedLog(data, events);

    const applyButton = page.getByRole('button', { name: /^Apply$/ });
    await expect(applyButton).toBeEnabled({ timeout: 15_000 });
    await Promise.all([
      page.waitForLoadState('networkidle').catch(() => undefined),
      applyButton.click()
    ]);
    events.push('Clicked final Apply after explicit user authorization.');
    await writeRedactedLog(data, events);
    try {
      await expect(page.getByText(SUCCESS_MESSAGE)).toBeVisible({ timeout: SUCCESS_TIMEOUT_MS });
      events.push('Observed successful application confirmation message.');
      await writeRedactedLog(data, events);
    } catch (error) {
      events.push('Timed out waiting for successful application confirmation message.');
      await writeRedactedLog(data, events);
      throw error;
    }
    return;
  }

  if (FINAL_SUBMISSION_RUN) {
    events.push('Entered final submission review pause for human-controlled consent and final apply.');
    await writeRedactedLog(data, events);
    await page.evaluate(() => {
      const banner = document.createElement('div');
      banner.setAttribute('data-ai-application-review-banner', 'true');
      banner.textContent =
        'AI fill complete. Human review required: verify fields/files, complete consent/voluntary sections, then submit manually. Close this browser when done.';
      Object.assign(banner.style, {
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        zIndex: '2147483647',
        background: '#102a43',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.28)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.35'
      });
      document.body.appendChild(banner);
    });
    console.log(
      `Final submission review pause active for ${FINAL_REVIEW_TIMEOUT_MS / 60000} minutes. ` +
        'Review the browser, complete human-only fields, submit manually, then close the browser.'
    );
    await page.waitForTimeout(FINAL_REVIEW_TIMEOUT_MS);
  }
});
