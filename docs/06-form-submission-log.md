# Form Submission Log

Status: Completed - submission confirmed by user

## Form URL

https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application

## Inspection Log

| Date | Action | Result | Evidence |
| --- | --- | --- | --- |
| 2026-05-13 | Inspect blank ATS form | Detected 10 metadata fields; no private data entered and no submission attempted | `evidence/logs/form-inspection-latest.json`, `evidence/screenshots/form-inspection-latest.png` |
| 2026-05-13 | Prepare draft-fill automation | Created `scripts/fill-application.spec.ts`; not run with private data yet | Completed synthetic dry run in A-017 |
| 2026-05-13 | Prepare synthetic dry-run inputs | Created gitignored local config with fake data and placeholder resume PDF | `inputs/application-data.local.json`, `outputs/dry-run-resume-placeholder.pdf` |
| 2026-05-13 | Run synthetic dry-run form fill | Playwright filled required draft fields, uploaded placeholder resume, captured pre-submit state, and stopped before EEOC/SMS/terms/final apply | `evidence/logs/form-fill-latest.redacted.json`, `evidence/screenshots/form-fill-paused-before-submit.png` |
| 2026-05-13 | Start final submission preparation | Added optional headed Playwright video command for local-only evidence; final PDFs and real submission still pending human review | `npm.cmd run fill:form:headed:video` |
| 2026-05-13 | Generate final PDF drafts | Generated selectable-text PDF versions of the reviewed CV and cover letter for human review before upload | `outputs/Jesse_Tsang_Opendoor_Operations_AI_Engineer_CV.pdf`, `outputs/Jesse_Tsang_Opendoor_Cover_Letter.pdf` |
| 2026-05-13 | Run authorized final submission automation | Uploaded reviewed PDFs, filled application fields, left voluntary EEOC fields blank, selected no SMS consent, and clicked final Apply after explicit user authorization, but no email or success confirmation was observed | `evidence/logs/form-fill-latest.redacted.json`, local private video at `outputs/playwright-video/scripts-fill-application-f-a252e-aft-and-pause-before-submit-chromium-video/video.webm` |
| 2026-05-13 | Prepare confirmed retry | Updated automation to require `You have successfully applied to Operations AI Engineer`, select `Montreal, QC, Canada`, choose `+1 CA`, fill `4389959671`, and use the trailing-slash LinkedIn URL | Pending retry |
| 2026-05-13 | Run confirmed retry attempt | Corrected phone, location, and LinkedIn values; clicked Apply; page remained on `Loading...` and no success message appeared within 60 seconds | Local private video under `outputs/playwright-video/` |
| 2026-05-13 | Run patient confirmed retry | Waited 4 minutes after Apply for `You have successfully applied to Operations AI Engineer`; page stayed on disabled `Loading...`, no success message observed, and no confirmation email was known at run time | `evidence/logs/form-fill-latest.redacted.json`, local private video under `outputs/playwright-video/` |
| 2026-05-13 | Inspect security challenge signals | Detected Cloudflare Turnstile script, Turnstile container, Cloudflare challenge-platform requests, and a successful one-shot challenge POST on blank page load | `evidence/logs/security-challenge-inspection-latest.json`, `evidence/screenshots/security-challenge-inspection-latest.png` |
| 2026-05-13 | Add real-browser assist flow | Added CDP-attached helper to fill in a real Chrome profile and hand off CAPTCHA/consent/final Apply to human | `npm.cmd run fill:form:real-browser` |
| 2026-05-13 | Complete submission via real browser assist | User ran real-browser assist successfully, completed human verification challenge, and submitted manually in trusted browser session | User confirmation + evidence/logs/manual-browser-assist-latest.redacted.json |
## Fields Detected

| Field | Type | OID | Required |
| --- | --- | --- | --- |
| First name | SHORT_ANSWER | first_name | Yes |
| Last name | SHORT_ANSWER | last_name | Yes |
| Email | SHORT_ANSWER | email | Yes |
| Pronouns | PRONOUN | pronouns | No |
| Current company | SHORT_ANSWER | current_company | No |
| Phone number | PHONE_NUMBER | phone_number | Yes |
| Location (city only) | SHORT_ANSWER | location | Yes |
| LinkedIn link | SHORT_ANSWER | linkedin_link | No |
| Resume | FILE | resume | Yes |
| Cover letter | FILE | cover_letter | No |

## Required Inputs

| Field | Type | OID |
| --- | --- | --- |
| First name | SHORT_ANSWER | first_name |
| Last name | SHORT_ANSWER | last_name |
| Email | SHORT_ANSWER | email |
| Phone number | PHONE_NUMBER | phone_number |
| Location (city only) | SHORT_ANSWER | location |
| Resume | FILE | resume |

## Optional Inputs

| Field | Type | OID |
| --- | --- | --- |
| Pronouns | PRONOUN | pronouns |
| Current company | SHORT_ANSWER | current_company |
| LinkedIn link | SHORT_ANSWER | linkedin_link |
| Cover letter | FILE | cover_letter |

## Additional Visible Sections And Notices

| Section / Notice | Inspection Result |
| --- | --- |
| Voluntary EEOC section | Detected |
| Visible EEOC fields | Gender, Please identify your race, Are you Hispanic/Latino?, Veteran Status, Disability Status |
| SMS consent radio buttons | Detected |
| Rippling terms notice | Detected |
| AI application analysis notice | Detected |

## Attachments Uploaded

None.

## Validation Issues

- None recorded during blank-form inspection.
- Synthetic fill completed successfully without submission.
- The ATS normalizes phone formatting after entry.
- The paused screenshot may still show field-level validation styling until the user completes human-only review areas such as voluntary EEOC, SMS consent, terms/certification, and final apply.

## Submission Notes

Final Apply was clicked after explicit human authorization in the first final run, but the run is now treated as unconfirmed because no confirmation email or success page was observed. Retry must not pass unless the ATS displays `You have successfully applied to Operations AI Engineer`.

The confirmed retry reached a disabled `Loading...` Apply button state after click, but no success message appeared within 60 seconds. A patient retry waited 4 minutes and still did not observe the success message. Treat the automated submission as unconfirmed/blocked.

Security challenge inspection detected Cloudflare Turnstile and Cloudflare challenge-platform activity on initial page load. The inspection did not prove that Turnstile caused the post-Apply hang, but it does confirm that the ATS page includes anti-abuse/security-challenge infrastructure.

Option 3, Playwright fill plus human challenge/final-submit handling, was tested. A visible `Verify you are human` checkbox appeared in the Playwright browser and failed after human interaction. Treat Playwright-based submission as blocked by the browser challenge path.

Final submission and post-submit status check are tracked as A-020 in `docs/04-execution-tracker.md`.

Generated PDF drafts pending human review:

- `outputs/Jesse_Tsang_Opendoor_Operations_AI_Engineer_CV.pdf`
- `outputs/Jesse_Tsang_Opendoor_Cover_Letter.pdf`

Optional local evidence:

- Use `npm.cmd run fill:form:headed:video` if a local recording is useful.
- Playwright video output is written under `outputs/playwright-video/`, which is gitignored.
- Do not commit raw submission videos because they may show private contact details, uploaded document names, consent choices, or ATS confirmation data.
- If a shareable recording is needed, create a redacted/edited derivative after submission.

Latest local video:

- `outputs/playwright-video/scripts-fill-application-f-a252e-aft-and-pause-before-submit-chromium-video/video.webm`

Current recommendation:

- Submission completed through human-gated real-browser flow.
- Keep automation boundary explicit: no CAPTCHA bypass, no autonomous final submit.
- Preserve only redacted evidence in-repo.

Manual browser assist:

- Start Chrome with remote debugging: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222`
- Run `npm.cmd run fill:form:real-browser`.
- The script fills fields in your real Chrome tab, then you complete challenge/consent/final Apply manually.

Manual helper:

- Generate with `npm.cmd run generate:manual-helper`.
- Open `outputs/manual-submission-helper.html` locally.
- The helper is gitignored because it contains private application data.

## Dry-Run Result

Command: `npm.cmd run fill:form`

Result: Passed with synthetic data.

Evidence:

- Redacted log: `evidence/logs/form-fill-latest.redacted.json`
- Pre-submit screenshot: `evidence/screenshots/form-fill-paused-before-submit.png`

Safety outcome:

- used fake contact details
- uploaded only a placeholder resume PDF
- did not upload the real CV or cover letter
- did not answer voluntary EEOC questions
- did not select SMS consent
- did not accept terms/certification
- did not click Apply

## Draft-Fill Automation Prepared

Script: `scripts/fill-application.spec.ts`

Local config required: `inputs/application-data.local.json`

Redacted outputs if run:

- `evidence/logs/form-fill-latest.redacted.json`
- `evidence/screenshots/form-fill-paused-before-submit.png`

Safety behavior:

- validates required local config values before browser interaction
- requires a resume file path before upload
- optionally uploads a cover letter if configured
- does not select EEOC, SMS consent, opt-out, terms, or final submission choices
- stops before final application submission



