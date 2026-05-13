# Application Form Notes

Status: Inspected and dry-run tested

Last inspected: 2026-05-13T17:17:04.175Z

Form URL: https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application

Inspection method: Playwright blank-form inspection using `scripts/inspect-form.spec.ts`; synthetic form-fill dry run using `scripts/fill-application.spec.ts`.

Safety note: No private candidate data was entered, no files were uploaded, no consent controls were accepted, and no submission was attempted.

## Job Metadata

- Company: Opendoor Labs Inc.
- Role: Operations AI Engineer
- Job UUID: f572e889-0644-4590-8a5a-64f73d7db17d
- Location: Toronto, Canada
- Employment type: Salaried, full-time
- EEOC questionnaire enabled: Yes

## Fields Detected From ATS Metadata

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

## Evidence

- Structured log: `evidence/logs/form-inspection-latest.json`
- Blank-form screenshot: `evidence/screenshots/form-inspection-latest.png`
- Synthetic fill redacted log: `evidence/logs/form-fill-latest.redacted.json`
- Synthetic fill paused screenshot: `evidence/screenshots/form-fill-paused-before-submit.png`

## Form-Fill Implications

- Local config should provide values for required text and phone fields.
- Draft-fill automation should read from `inputs/application-data.local.json`, which must remain gitignored.
- Resume upload is required.
- Cover letter upload is optional.
- Pronouns, current company, and LinkedIn are optional.
- EEOC demographic questions are visible and voluntary.
- SMS consent controls are visible and must not be selected without human approval.
- The form shows a notice that Opendoor Labs Inc. uses AI to analyze applications, with an opt-out link.
- Any automation must pause before EEOC, consent, certification, opt-out, or final submission actions.
- Phone entry may be normalized by the ATS after filling.
- Location behaves like a city-only text field in automation, but should be reviewed by the human before final submission in case the ATS expects a resolved city selection.
