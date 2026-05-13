# AI Workflow Runbook

Status: Complete for current workflow

Last updated: 2026-05-13

## Purpose

This runbook explains how AI was used to prepare an application for Opendoor's Operations AI Engineer role, where human judgment controlled the process, and how the workflow can be repeated without losing truthfulness, privacy, or consent boundaries.

The goal is not to claim that AI autonomously applied for the job. The goal is to show a practical AI Ops workflow: source discovery, role analysis, document drafting, review, form inspection, automation, evidence capture, and human approval gates.

## Operating Principle

Use AI aggressively for leverage, but make every risky step reviewable.

AI can accelerate research, drafting, critique, and browser automation. The human remains accountable for facts, private data, consent, final documents, and final submission.

## Workflow Summary

| Phase | AI Role | Human Role | Output |
| --- | --- | --- | --- |
| Source setup | Create structure and baseline docs | Approve direction | README, docs, prompts, folders |
| Job discovery | Locate and verify the correct job description | Confirm the target role | `inputs/job-description.md` |
| Role analysis | Extract requirements, signals, gaps, and evaluation criteria | Review quality of interpretation | `docs/01-role-intelligence-report.md` |
| Application strategy | Define positioning and artifact strategy | Confirm personal positioning | `docs/02-application-strategy.md` |
| CV drafting | Tailor from factual seed material | Confirm AI-tool scope and work authorization facts | `outputs/tailored-cv.md` |
| CV review | Identify exaggeration, unsupported claims, and privacy issues | Accept or correct recommendations | `outputs/tailored-cv.review.md` |
| Cover letter | Draft concise mission and AI-workflow narrative | Refine mission alignment and tone | `outputs/cover-letter.md` |
| Form inspection | Inspect ATS safely with Playwright | Approve moving to fill automation | `inputs/application-form-notes.md`, evidence |
| Form dry run | Fill with synthetic data and pause before submit | Review safety boundary | redacted log and screenshot |
| Final run | Prepare real local data and upload PDFs | Review consent, EEOC, terms, and final submission | Pending human-gated run |

## Tools Used

- Codex for planning, analysis, drafting, review, and code generation.
- Markdown for traceable source documents and reviewable artifacts.
- Playwright for ATS inspection and safe draft-fill automation.
- Local gitignored files for private application data.
- Redacted evidence logs and screenshots for auditability.

## Key Documents

- `docs/00-problem-statement.md`: defines the project and safety boundaries.
- `docs/01-role-intelligence-report.md`: role requirements and evaluation signals.
- `docs/02-application-strategy.md`: positioning and artifact strategy.
- `docs/04-execution-tracker.md`: task status.
- `docs/06-form-submission-log.md`: ATS inspection and dry-run evidence.
- `docs/08-decision-log.md`: durable decisions and trade-offs.
- `docs/10-ai-working-guidelines.md`: operating rules for AI sessions.

## Prompt And Agent Strategy

The workflow used specialized prompt stages instead of one large undifferentiated prompt.

| Prompt | Purpose |
| --- | --- |
| `prompts/00-master-prompt.md` | Overall AI operating frame |
| `prompts/01-role-analysis-prompt.md` | Role intelligence and hidden criteria |
| `prompts/02-cv-tailoring-prompt.md` | CV tailoring from factual inputs |
| `prompts/03-cover-letter-prompt.md` | Cover letter drafting |
| `prompts/04-reviewer-agent-prompt.md` | Skeptical review for truthfulness and risk |
| `prompts/05-form-agent-prompt.md` | ATS form inspection and automation behavior |

The separation matters because the reviewer role should not simply admire the draft. It should look for unsupported claims, privacy leaks, and places where the wording implies experience the candidate did not confirm.

## Human Review Gates

The workflow deliberately pauses at these points:

| Gate | Why It Exists |
| --- | --- |
| Candidate facts | AI must not invent employment history, credentials, location, authorization, or AI experience. |
| CV claims | Application materials must be truthful and traceable to the seed CV or explicit human confirmation. |
| Cover letter tone | The AI-first framing should feel serious, not gimmicky. |
| Private data | Personal contact details and local application data stay gitignored. |
| File uploads | Real CV and cover letter should be uploaded only after human review. |
| EEOC and consent | Voluntary demographic questions, SMS consent, terms, and AI-analysis choices require human choice. |
| Final submission | Automation must not click Apply. |

## ATS Automation Method

The ATS workflow has two scripts:

- `scripts/inspect-form.spec.ts`
- `scripts/fill-application.spec.ts`

Inspection behavior:

- opens the Rippling application page
- detects visible form metadata
- records required and optional fields
- captures a blank-form screenshot
- does not enter private data
- does not upload files
- does not submit

Fill behavior:

- reads `inputs/application-data.local.json`
- validates required values before browser interaction
- uploads the configured resume file
- optionally uploads the configured cover letter file
- fills safe draft fields
- writes a redacted log
- captures a pre-submit screenshot
- stops before EEOC, SMS consent, terms, opt-out, and final Apply

The first fill run used synthetic data and a placeholder PDF. This validated mechanics without exposing real candidate details or uploading real application documents.

For the final run, `npm.cmd run fill:form:headed:video` records a local Playwright video under `outputs/playwright-video/` and keeps the browser open for human review. Treat raw video as private evidence because it may include personal data, uploaded file names, consent choices, or confirmation details.

## Application Artifact Strategy

Markdown is the editable source format for drafts. PDF should be the upload format for the real ATS run.

Recommended final upload files:

- `outputs/Jesse_Tsang_Opendoor_Operations_AI_Engineer_CV.pdf`
- `outputs/Jesse_Tsang_Opendoor_Cover_Letter.pdf`

The PDFs should be generated as selectable text, not scanned images. Keep formatting simple: readable typography, minimal layout complexity, and no graphics-only text. This preserves the human reading experience while staying friendly to ATS parsing.

## Evidence Strategy

Evidence should prove the workflow without leaking private information.

Safe evidence:

- blank-form inspection logs
- blank-form screenshots
- synthetic dry-run logs
- synthetic dry-run screenshots
- execution tracker updates
- decision log entries

Unsafe evidence:

- screenshots containing real phone, email, or private application answers
- real local application config
- ATS confirmation numbers
- final submission receipts unless redacted
- unreviewed private CV extraction text

## What AI Did Well

- Turned a loose challenge into a concrete staged workflow.
- Located the correct ATS job description without being given the direct link.
- Converted the role into explicit and implied evaluation criteria.
- Drafted application materials from factual inputs and user-confirmed facts.
- Caught unsupported-claim risks around AI tooling, LLM deployment, and model monitoring.
- Built Playwright inspection and fill automation with pre-submit safety gates.
- Produced redacted evidence for the process.

## What Stayed Human

- Deciding that the located job description was correct.
- Confirming which AI tools were used professionally versus personally.
- Confirming there was no LLM deployment or model drift monitoring experience.
- Confirming Canadian citizenship, Canada work authorization, and no sponsorship requirement.
- Refining the cover letter's mission alignment.
- Deciding whether and how to mention the AI-assisted challenge.
- Reviewing final PDFs before upload.
- Handling EEOC, SMS consent, terms, AI-analysis choices, and final submission.

## Known Limitations

- The public leadership post that inspired the challenge has not been captured as a source, so the application should refer to it carefully.
- The tailored CV and cover letter are private local artifacts unless a redacted/shareable version is created.
- The synthetic dry-run screenshot validates automation mechanics, not final application readiness.
- The ATS may change selectors, validation rules, or upload behavior.
- The current workflow prepares application materials; it does not prove production LLM deployment or model monitoring experience.

## Repeatable Procedure

1. Read the AI working guidelines and current tracker.
2. Confirm the target job URL and job description.
3. Update role intelligence if the job description changes.
4. Update private candidate inputs locally.
5. Regenerate or revise CV and cover letter drafts.
6. Run skeptical review and incorporate human corrections.
7. Generate final PDFs from reviewed Markdown.
8. Update `inputs/application-data.local.json` with real local values and PDF paths.
9. Run `npm.cmd run fill:form:headed`, or `npm.cmd run fill:form:headed:video` if local video evidence is desired.
10. Review the browser state manually.
11. Complete voluntary and consent fields manually.
12. Submit only after final human approval.
13. Record the result in `docs/06-form-submission-log.md`.
14. Check application status or confirmation state if the ATS exposes one.
15. Add lessons learned to `docs/07-retrospective.md`.

## Final Notes

This workflow is intentionally not fully autonomous. That is a feature, not a defect. The role calls for AI fluency, automation, operational judgment, documentation, and trust. The strongest demonstration is a system where AI moves quickly, evidence is preserved, and the human remains clearly accountable for truth, consent, and final decisions.
