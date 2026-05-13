import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const FORM_URL =
  'https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application';

const CONFIG_PATH = path.join('inputs', 'application-data.local.json');
const REDACTED_LOG_PATH = path.join('evidence', 'logs', 'manual-browser-assist-latest.redacted.json');
const CDP_URL = process.env.CHROME_CDP_URL ?? 'http://127.0.0.1:9222';
const WAIT_AFTER_FILL_MS = 45 * 60 * 1000;

/** @typedef {{
 * firstName: string;
 * lastName: string;
 * email: string;
 * phone: string;
 * location: string;
 * currentCompany?: string;
 * linkedinUrl?: string;
 * resumePath: string;
 * coverLetterPath?: string;
 * }} ApplicationData */

const requiredConfigFields = ['firstName', 'lastName', 'email', 'phone', 'location', 'resumePath'];

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function redactValue(key, value) {
  if (typeof value !== 'string') return value;
  if (['firstName', 'lastName', 'email', 'phone', 'location', 'linkedinUrl', 'currentCompany'].includes(key)) {
    return value ? '[REDACTED]' : '';
  }
  return value;
}

function redactConfig(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, redactValue(key, value)]));
}

async function loadApplicationData() {
  const exists = await fileExists(CONFIG_PATH);
  if (!exists) {
    throw new Error(
      `Missing ${CONFIG_PATH}. Create it from inputs/application-data.example.json. Do not commit the local file.`
    );
  }

  const raw = await fs.readFile(CONFIG_PATH, 'utf8');
  const parsed = JSON.parse(raw);
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

  return parsed;
}

async function writeRedactedLog(data, events) {
  await fs.mkdir(path.dirname(REDACTED_LOG_PATH), { recursive: true });
  await fs.writeFile(
    REDACTED_LOG_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        url: FORM_URL,
        cdpUrl: CDP_URL,
        note: 'Redacted log for real-browser assist. Human must complete CAPTCHA/challenge, consent fields, and final Apply manually.',
        applicationData: redactConfig(data),
        events
      },
      null,
      2
    )}\n`,
    'utf8'
  );
}

async function fillTextbox(page, name, value) {
  const textbox = page.getByRole('textbox', { name });
  await textbox.fill(value);
}

async function fillPhone(page, value) {
  const country = page.getByRole('combobox', { name: 'Search' });
  await country.click();
  await country.fill('Canada');
  await page.getByRole('option', { name: /\+1\s+CA|Canada/i }).first().click();

  const textbox = page.getByRole('textbox', { name: 'Phone number' });
  await textbox.fill(value);
}

async function fillLocation(page, value) {
  const textbox = page.getByRole('textbox', { name: 'Location' });
  await textbox.fill(value);

  const option = page.getByRole('option', { name: /Montreal,\s*QC,\s*Canada/i }).first();
  await option.click({ timeout: 10_000 });
}

async function findOrOpenFormPage(context, events) {
  for (const page of context.pages()) {
    if (page.url().includes('/opendoor/jobs/') || page.url().includes('/apply?step=application')) {
      await page.bringToFront();
      events.push('Reused an existing Opendoor application tab in real Chrome.');
      return page;
    }
  }

  const page = await context.newPage();
  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  events.push('Opened a new Opendoor application tab in real Chrome.');
  return page;
}

async function main() {
  const data = await loadApplicationData();
  const events = ['Loaded and validated local application data.'];

  console.log(`Connecting to Chrome DevTools at ${CDP_URL} ...`);
  const browser = await chromium.connectOverCDP(CDP_URL);

  try {
    const context = browser.contexts()[0];
    if (!context) {
      throw new Error('No Chrome context found. Ensure Chrome was started with --remote-debugging-port=9222.');
    }

    const page = await findOrOpenFormPage(context, events);
    await page.waitForLoadState('domcontentloaded');

    const fileInputs = page.locator('input[type="file"]');
    await fileInputs.first().waitFor({ state: 'attached', timeout: 20_000 });
    await fileInputs.nth(0).setInputFiles(data.resumePath);
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
    events.push('Selected +1 CA and filled phone field.');

    await fillLocation(page, data.location);
    events.push('Selected location suggestion.');

    if (data.linkedinUrl) {
      await fillTextbox(page, 'LinkedIn Link', data.linkedinUrl);
      events.push('Filled optional LinkedIn field.');
    }

    if (data.coverLetterPath) {
      const count = await fileInputs.count();
      if (count >= 2) {
        await fileInputs.nth(1).setInputFiles(data.coverLetterPath);
        events.push('Uploaded optional cover letter from local path.');
      }
    }

    events.push('Paused for human: complete CAPTCHA/challenge, consent fields, and final Apply manually in the same Chrome tab.');
    await writeRedactedLog(data, events);

    console.log('AI assist fill complete in your real Chrome tab.');
    console.log('Next steps (human-only):');
    console.log('1) Complete any "Verify you are human" challenge.');
    console.log('2) Review all fields and file uploads.');
    console.log('3) Complete consent/terms choices.');
    console.log('4) Click Apply manually.');
    console.log(`Keeping connection open for ${WAIT_AFTER_FILL_MS / 60000} minutes.`);
    await page.waitForTimeout(WAIT_AFTER_FILL_MS);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('manual-browser-assist failed:', error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
