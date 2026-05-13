# AI Working Guidelines

These guidelines define how AI should work on this project.

Future AI sessions must read these documents before meaningful work:

- `docs/00-problem-statement.md`
- `docs/03-implementation-plan.md`
- `docs/04-execution-tracker.md`
- `docs/08-decision-log.md`
- `docs/10-ai-working-guidelines.md`

Depending on the task, also read:

- `docs/01-role-intelligence-report.md`
- `docs/02-application-strategy.md`
- `docs/05-ai-workflow-runbook.md`
- `docs/06-form-submission-log.md`

## General Workflow

For meaningful work:

1. Understand the work.
2. Check relevant existing docs.
3. Propose an approach before coding or generating artifacts.
4. Explain meaningful trade-offs.
5. Recommend a preferred option.
6. Implement in small, focused steps.
7. Review the result.
8. Update the execution tracker.
9. Update the decision log if a durable decision was made.
10. Update affected documentation.

## Scope Discipline

Keep changes focused.

Avoid:

- unrelated refactoring
- unrelated formatting changes
- unnecessary abstractions
- adding tools before they are needed
- over-engineering the application workflow
- pretending this is a production SaaS product

Build the smallest correct version that demonstrates the AI Ops workflow clearly.

## Engineering Principles

Use pragmatic software engineering standards:

- simple over clever
- readable over fancy
- maintainable over impressive
- explicit over hidden
- defensive handling of external systems
- clean separation between inputs, outputs, scripts, prompts, and evidence
- no secrets in source control
- no private data in public examples

## Application Safety and Integrity Rules

This project may produce real job application materials and interact with a real ATS form. Any workflow that generates resume content, cover letters, form responses, uploaded files, or final submission actions is application-integrity-sensitive.

Before generating or submitting application material, ask:

- Could this claim exaggerate or misrepresent Jesse's experience?
- Could this imply credentials that were not provided?
- Could this imply employment history that was not provided?
- Could this imply education history that was not provided?
- Could this imply location, work authorization, or relocation intent that was not confirmed?
- Could this submit private information without explicit review?
- Could this bypass an ATS security, consent, login, or CAPTCHA control?
- Could this create misleading evidence about how AI was used?
- Are generated artifacts traceable to factual seed inputs?
- Is the final submission reviewed before being sent?

## ATS Automation Rules

Browser automation may:

- inspect form fields
- record field labels
- prepare draft answers
- fill safe fields
- upload prepared documents
- capture screenshots
- capture logs
- pause before submission

Browser automation must not:

- bypass CAPTCHA
- bypass login controls
- bypass consent gates
- bypass anti-bot controls
- submit without final approval
- store private application data in the public repo
- log sensitive personal data unnecessarily

The preferred implementation is AI-generated Playwright automation that inspects and fills the form, then pauses before final submission for human review.

## Privacy Rules

Do not commit real private data to the public repository.

Private data includes:

- phone number
- home address
- personal email if not intended for public sharing
- private resume details not meant for public release
- application answers containing sensitive data
- screenshots showing personal information
- ATS confirmation numbers
- uploaded document copies if they contain private data

Use example files instead:

- `inputs/application-data.example.json`
- redacted screenshots
- redacted logs

If real local config is needed, use a gitignored file such as:

- `inputs/application-data.local.json`

## Documentation Rules

When work changes project direction, update the relevant documentation.

Examples:

- New durable decision: update `docs/08-decision-log.md`
- Task progress: update `docs/04-execution-tracker.md`
- Role understanding changes: update `docs/01-role-intelligence-report.md`
- Application strategy changes: update `docs/02-application-strategy.md`
- Form behavior discovered: update `docs/06-form-submission-log.md`
- Workflow process changes: update `docs/05-ai-workflow-runbook.md`

Avoid documentation drift. If implementation differs from documentation, call out the mismatch, recommend which side should change, and update the affected doc after the decision is made.

## Review Expectations

Before considering a change complete, perform:

- factual accuracy review
- privacy review
- application-integrity review
- code review if scripts changed
- documentation review
- execution tracker update
- decision log update if needed

## Testing Expectations

For scripts:

- prefer Playwright tests or scripts that can be run locally
- avoid depending on final submission
- support a dry-run mode
- capture screenshots during inspection
- log detected fields in a readable format
- avoid logging secrets or sensitive data
- fail clearly when selectors are not found
- pause before final submit

## Comment Style

Use comments sparingly. Prefer clear naming and simple structure.

When comments are useful, use concise English and French comments.

Example:

- EN: Pause before final submit for human review.
- FR: Pause avant l'envoi final pour validation humaine.
