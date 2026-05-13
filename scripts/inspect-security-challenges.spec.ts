import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const FORM_URL =
  'https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application';

const LOG_PATH = path.join('evidence', 'logs', 'security-challenge-inspection-latest.json');
const SCREENSHOT_PATH = path.join('evidence', 'screenshots', 'security-challenge-inspection-latest.png');

const challengePattern =
  /captcha|recaptcha|hcaptcha|turnstile|arkose|datadome|perimeterx|px-captcha|cloudflare|cf-challenge|challenge|verify you are human|security check/i;

test('inspect application page for captcha or security challenge signals', async ({ page }) => {
  await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
  await fs.mkdir(path.dirname(SCREENSHOT_PATH), { recursive: true });

  const networkSignals: Array<{
    type: 'request' | 'response' | 'requestfailed';
    method?: string;
    url: string;
    status?: number;
    failure?: string | null;
  }> = [];

  page.on('request', (request) => {
    if (challengePattern.test(request.url())) {
      networkSignals.push({ type: 'request', method: request.method(), url: request.url() });
    }
  });

  page.on('response', (response) => {
    if (challengePattern.test(response.url())) {
      networkSignals.push({ type: 'response', url: response.url(), status: response.status() });
    }
  });

  page.on('requestfailed', (request) => {
    if (challengePattern.test(request.url())) {
      networkSignals.push({
        type: 'requestfailed',
        method: request.method(),
        url: request.url(),
        failure: request.failure()?.errorText ?? null
      });
    }
  });

  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => undefined);

  const domSignals = await page.evaluate((patternSource) => {
    const pattern = new RegExp(patternSource, 'i');
    const attrs = ['src', 'href', 'id', 'name', 'class', 'title', 'aria-label'];

    function attrsFor(element: Element) {
      return Object.fromEntries(
        attrs
          .map((attr) => [attr, element.getAttribute(attr)])
          .filter((entry): entry is [string, string] => Boolean(entry[1]))
      );
    }

    const matchingElements = Array.from(document.querySelectorAll('*'))
      .filter((element) => {
        const haystack = [
          element.tagName,
          ...attrs.map((attr) => element.getAttribute(attr) ?? ''),
          element.textContent?.slice(0, 300) ?? ''
        ].join(' ');
        return pattern.test(haystack);
      })
      .slice(0, 80)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        attrs: attrsFor(element),
        text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 180) ?? ''
      }));

    const hiddenInputs = Array.from(document.querySelectorAll('input[type="hidden"]'))
      .filter((input) => pattern.test(`${input.getAttribute('name') ?? ''} ${input.getAttribute('id') ?? ''}`))
      .map((input) => ({
        name: input.getAttribute('name'),
        id: input.getAttribute('id'),
        valuePresent: Boolean((input as HTMLInputElement).value)
      }));

    const frames = Array.from(document.querySelectorAll('iframe')).map((frame) => ({
      src: frame.getAttribute('src'),
      title: frame.getAttribute('title'),
      name: frame.getAttribute('name'),
      matchesChallengePattern: pattern.test(
        `${frame.getAttribute('src') ?? ''} ${frame.getAttribute('title') ?? ''} ${frame.getAttribute('name') ?? ''}`
      )
    }));

    const scripts = Array.from(document.querySelectorAll('script[src]'))
      .map((script) => (script as HTMLScriptElement).src)
      .filter((src) => pattern.test(src));

    const bodyMatches = pattern.test(document.body.textContent ?? '');

    return {
      bodyMatches,
      hiddenInputs,
      frames,
      scripts,
      matchingElements
    };
  }, challengePattern.source);

  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

  const result = {
    inspectedAt: new Date().toISOString(),
    url: FORM_URL,
    note: 'Security challenge inspection only. No private data entry, upload, consent action, CAPTCHA solving, or submission was attempted.',
    challengePattern: challengePattern.source,
    summary: {
      domMatchCount: domSignals.matchingElements.length,
      hiddenChallengeInputCount: domSignals.hiddenInputs.length,
      iframeCount: domSignals.frames.length,
      challengeIframeCount: domSignals.frames.filter((frame) => frame.matchesChallengePattern).length,
      challengeScriptCount: domSignals.scripts.length,
      networkSignalCount: networkSignals.length,
      bodyTextMatchedChallengePattern: domSignals.bodyMatches
    },
    domSignals,
    networkSignals,
    screenshot: SCREENSHOT_PATH.replace(/\\/g, '/')
  };

  await fs.writeFile(LOG_PATH, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
});
