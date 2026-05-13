# Implementation Plan

## Phase 1: Repository Setup

Goal: Create the folder structure and baseline docs.

Tasks:

- create directories
- add `.gitkeep` files where needed
- create README
- create core docs
- create prompt placeholders
- create example config

Expected outputs:

- initial repository skeleton
- baseline documentation
- privacy-safe examples

Risks:

- too much documentation before useful work
- unclear doc ownership

Status: Done for initial skeleton

## Phase 2: Input Collection

Goal: Collect source material.

Tasks:

- save the public job description
- save or reference the seed CV safely
- save the application URL
- define candidate facts
- define unknowns requiring human confirmation

Expected outputs:

- `inputs/job-description.md`
- private seed CV or redacted source CV
- list of missing facts

Risks:

- using an outdated job description
- missing required form details
- inventing facts not in the seed CV

Status: Done for input collection

## Phase 3: Role Analysis

Goal: Understand the role and its signals.

Tasks:

- extract explicit requirements
- extract implied requirements
- infer hidden evaluation criteria
- map candidate experience to role
- identify gaps and mitigation

Expected output:

- `docs/01-role-intelligence-report.md`

Risks:

- overfitting to the job post
- reading too much into limited public wording

Status: Done for role-first analysis

## Phase 4: Application Strategy

Goal: Decide how to apply.

Tasks:

- define positioning
- define CV strategy
- define cover letter strategy
- define AI-first challenge strategy
- define form strategy

Expected output:

- `docs/02-application-strategy.md`

Risks:

- being too gimmicky
- being too conventional
- unclear explanation of AI usage

Status: Done

## Phase 5: CV Tailoring

Goal: Create a truthful tailored CV.

Tasks:

- parse seed CV
- map experience to job requirements
- generate tailored CV
- review for factual accuracy
- revise for clarity and ATS readability

Expected outputs:

- `outputs/tailored-cv.md`
- eventually `outputs/tailored-cv.pdf`

Risks:

- exaggeration
- unsupported claims
- losing original nuance
- keyword stuffing

Status: Done for reviewed Markdown draft

## Phase 6: Cover Letter Generation

Goal: Create a concise application note.

Tasks:

- generate cover letter
- emphasize practical AI workflow
- explain interest in role
- keep tone direct and human
- review for factual accuracy

Expected outputs:

- `outputs/cover-letter.md`
- eventually `outputs/cover-letter.pdf`

Risks:

- sounding generic
- sounding too cute
- overstating intent since this is partly a fun challenge

Status: Done for reviewed Markdown draft

## Phase 7: Review and QA

Goal: Review documents before form work.

Tasks:

- run skeptical reviewer prompt
- check consistency
- check truthfulness
- check privacy
- check ATS keyword coverage
- revise outputs

Expected outputs:

- reviewed CV
- reviewed cover letter
- documented review notes

Risks:

- missing hidden exaggerations
- leaking private data

Status: Done for reviewed application drafts

## Phase 8: ATS Form Inspection

Goal: Understand the Rippling application form.

Tasks:

- generate Playwright inspection script
- run script locally
- capture screenshots
- detect visible fields
- record required fields
- update form submission log

Expected outputs:

- `scripts/inspect-form.spec.ts`
- `inputs/application-form-notes.md`
- `docs/06-form-submission-log.md`
- redacted evidence screenshots and logs

Risks:

- dynamic form fields
- CAPTCHA or consent gates
- selectors changing
- private data in screenshots

Status: Done for blank-form inspection

## Phase 9: AI-Assisted Form Filling

Goal: Prepare a safe form-fill workflow.

Tasks:

- create `inputs/application-data.example.json`
- create gitignored local config pattern
- generate fill script
- fill draft fields
- upload documents where appropriate
- pause before final submission

Expected outputs:

- `scripts/fill-application.spec.ts`
- redacted evidence logs
- dry-run screenshots

Risks:

- accidental submission
- sensitive data logging
- selector mismatch
- ATS restrictions

Status: Done for synthetic-data dry run; real candidate-data run and final submission remain human-gated

## Phase 10: Runbook and Retrospective

Goal: Document the journey.

Tasks:

- write AI workflow runbook
- write retrospective
- record final decisions
- update README
- update execution tracker

Expected outputs:

- `docs/05-ai-workflow-runbook.md`
- `docs/07-retrospective.md`
- updated README

Risks:

- too much process noise
- not enough concrete evidence
- unclear explanation of human vs AI roles

Status: Done through retrospective; final submission is tracked separately in Phase 11

## Phase 11: Final Submission And Status Check

Goal: Complete the real application safely and record the result.

Tasks:

- generate final PDF versions of the reviewed CV and cover letter
- update `inputs/application-data.local.json` with real private values and PDF paths
- run the headed form-fill workflow
- human reviews uploaded files, filled fields, voluntary sections, consent choices, and terms
- human submits only after final approval
- record submission status, confirmation details if safe, and follow-up notes

Expected outputs:

- final reviewed PDF artifacts in `outputs/`
- updated `docs/06-form-submission-log.md`
- updated `docs/04-execution-tracker.md`
- final retrospective update if new lessons are discovered

Risks:

- accidental private data exposure in logs or screenshots
- ATS validation behavior differs from the synthetic run
- final confirmation contains sensitive data
- submitting before the human has reviewed every consent and voluntary field

Status: Not Started
