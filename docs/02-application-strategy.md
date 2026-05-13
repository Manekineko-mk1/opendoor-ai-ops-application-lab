# Application Strategy

Status: Complete

Last updated: 2026-05-13

## Purpose

This document defines how to apply to Opendoor's Operations AI Engineer role in a way that is role-relevant, truthful, practical, and clear about AI usage.

The strategy is based on:

- `inputs/job-description.md`
- `docs/01-role-intelligence-report.md`
- the project safety and privacy rules in `docs/10-ai-working-guidelines.md`

Private seed CV details are not included in this tracked strategy.

## Strategic Thesis

The application should demonstrate the role rather than merely describe fit for it.

The role asks for someone who can turn ambiguity into systems, use AI fluently, build automation, document workflows, evaluate trade-offs, and preserve operational trust. This project can show those abilities directly by treating the application as a small AI Ops workflow.

Recommended framing:

> I use AI to turn messy operational workflows into reliable, documented, and reviewable systems, with clear human judgment gates where truthfulness, privacy, consent, or business risk matter.

## Positioning

Primary positioning:

- production-minded software engineer
- practical AI workflow builder
- systems thinker for ambiguous operational problems
- strong on documentation, reviewability, and operational handoff
- comfortable using AI tools without treating them as magic

Avoid positioning as:

- a pure machine learning researcher
- an AI hype generalist
- a fully autonomous agent builder with no human review
- a candidate claiming direct experience not supported by the seed CV

The tone should be confident, direct, and grounded. The application can be slightly playful in concept, but the artifacts should feel serious and useful.

## CV Strategy

The tailored CV should be ATS-readable and evidence-first.

Emphasize, only where supported by the private seed CV:

- production software engineering
- automation and internal tooling
- backend, SQL, API, data, or reporting work
- operational reliability, troubleshooting, monitoring, support, or RCA
- cross-functional work with business, product, data, or operations stakeholders
- documentation, dashboards, runbooks, or process clarity
- AI-assisted development habits and practical automation work

Use role keywords naturally:

- AI-powered workflows
- automation
- SQL
- APIs
- internal tools
- system design
- operational reliability
- dashboards
- trustworthy data
- monitoring
- root cause analysis
- runbooks
- context engineering, if factually supported

Do not:

- invent ML deployment experience
- imply model monitoring or drift work unless supported
- inflate AI tool usage into production AI expertise
- add unconfirmed location, work authorization, sponsorship, or relocation claims
- over-optimize for keywords at the cost of readability

Recommended CV shape:

- concise professional summary tied to production engineering and AI-assisted workflow design
- selected technical skills relevant to the posting
- experience bullets rewritten around operational impact, systems, automation, and data visibility
- optional project section for this application lab if it helps explain the AI-first challenge

## Cover Letter Strategy

The cover letter should be short and practical. It should not retell the whole CV.

Recommended purpose:

- explain why this role is interesting
- connect to Opendoor's housing mission and technology-driven homeownership work
- make the AI-first application workflow legible
- connect the project to Opendoor's stated needs
- show judgment around truthfulness, privacy, and human approval

Recommended message:

- Opendoor is working on a complex housing problem with meaningful human stakes, and the candidate wants to contribute practical engineering judgment to that mission.
- The application was created in response to a public challenge from Opendoor leadership to apply using AI; avoid naming a specific person until the source post is captured.
- Opendoor's framing of AI as "how we work" is the reason this application was treated as a workflow.
- The candidate approached the application like an operations problem: source collection, role analysis, artifact generation, QA, form inspection, human approval, and retrospective.
- The process demonstrates the same habits the role asks for: AI fluency, systems thinking, practical automation, documentation, and safety boundaries.

Avoid:

- a long narrative about loving AI
- a gimmicky "AI wrote this application" claim
- unsupported claims about domain expertise
- overstating final submission automation

## AI-First Challenge Strategy

The repository is part of the application artifact. It should show that AI was used heavily but responsibly.

The best story is:

1. AI helped locate and verify the job description.
2. AI created a role intelligence report.
3. AI created the application strategy.
4. AI will tailor the CV from a private factual seed source.
5. AI will generate a concise cover letter.
6. AI will run skeptical review for unsupported claims and privacy risk.
7. AI will inspect the ATS form and prepare safe automation where appropriate.
8. Automation will pause before consent or final submission.
9. The human remains accountable for facts, privacy, and final approval.

This keeps the challenge interesting while avoiding fake autonomy claims.

## ATS Form Submission Strategy

The ATS workflow should be staged.

Stage 1: Inspect.

- Use Playwright to open the application page.
- Detect visible fields, required inputs, file upload controls, and consent or EEOC sections.
- Save redacted notes to `inputs/application-form-notes.md` and `docs/06-form-submission-log.md`.
- Capture screenshots only if they do not expose private candidate data.

Stage 2: Prepare data.

- Use `inputs/application-data.example.json` for public shape.
- Use gitignored `inputs/application-data.local.json` for real private values.
- Keep local values out of logs and screenshots.

Stage 3: Draft fill.

- Fill safe fields from local config.
- Upload prepared CV and optional cover letter if supported.
- Capture only redacted evidence.

Stage 4: Human review.

- Pause before certification, consent, or final submission.
- Human reviews all fields and uploaded files.
- Human decides whether to submit.

Automation must not bypass CAPTCHA, login, anti-bot controls, consent gates, or final approval.

## Risk Controls

Truthfulness controls:

- every CV and cover letter claim must trace to `inputs/seed-cv.md` or explicit human confirmation
- use skeptical reviewer prompt before finalizing materials
- separate role-source facts from candidate-source facts

Privacy controls:

- keep seed CV and extracted CV text gitignored
- do not commit real application config
- redact screenshots and logs
- avoid copying private candidate details into tracked docs unless explicitly approved

ATS controls:

- inspect before filling
- do not bypass protections
- do not submit automatically
- pause before consent and final submission

Tone controls:

- practical over theatrical
- honest over impressive
- traceable over glossy
- confident but not inflated

## Recommended Artifact Package

Primary application artifacts:

- tailored CV
- short cover letter or application note
- GitHub repository link if appropriate and safe to share

Supporting process artifacts:

- `docs/01-role-intelligence-report.md`
- `docs/02-application-strategy.md`
- `docs/05-ai-workflow-runbook.md`
- `docs/07-retrospective.md`
- `docs/08-decision-log.md`

The runbook should become the clearest shareable artifact because it explains what AI did, what the human reviewed, and how safety boundaries were enforced.

## Open Questions For Human Confirmation

Confirm before CV tailoring or form filling:

- Which private CV details may be reflected in tracked outputs?
- Which email, phone, location, LinkedIn, and GitHub values should be used in local application data?
- Is Toronto relocation, hybrid availability, or Canada work authorization relevant and confirmed?
- Should the repository be shared directly in the application, linked in the cover letter, or kept as a supporting artifact?
- Should the cover letter mention that the project is partly a fun engineering challenge, or keep that context limited to the repo?

## Final Recommendation

Proceed with a practical, role-aligned application package:

- use the CV to prove engineering, automation, data, operations, and documentation experience
- use the cover letter to explain the AI-first application workflow in a concise human voice
- use the repository to demonstrate process quality, safety gates, and systems thinking
- keep private candidate facts local until explicitly approved
- keep final ATS submission human-reviewed

The strongest application is not "AI did everything." The strongest application is "AI was used aggressively, but the workflow remained truthful, reviewable, and operationally safe."
