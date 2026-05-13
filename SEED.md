# Opendoor AI Ops Application Lab Seed Document

## 1. Project Name

opendoor-ai-ops-application-lab

## 2. Repository

GitHub repository:

https://github.com/Manekineko-mk1/opendoor-ai-ops-application-lab

## 3. Project Context

This repository is a small AI-first engineering experiment.

The project was created after seeing an interesting X / Twitter post from Opendoor leadership about hiring AI Ops Engineers in Toronto. The post challenged applicants to apply to the role using only AI, including creating documents, filling forms, and explaining how the AI workflow was used.

The official application page is:

https://ats.rippling.com/en-CA/opendoor/jobs/f572e889-0644-4590-8a5a-64f73d7db17d/apply?step=application

This repository should document and support an AI-first application workflow for that role.

This is being done mainly as a fun engineering challenge, not as a normal job search activity.

## 4. Goal

The goal is to treat a job application as a small AI Ops workflow.

The project should demonstrate how AI can be used to:

- analyze a job post and role requirements
- map the role requirements to a candidate profile
- tailor a CV from a seed CV
- generate a short cover letter or application note
- review generated materials for accuracy and exaggeration risk
- inspect and prepare for an ATS application form
- assist with form filling through AI-generated browser automation where reasonable
- document the entire process in a readable and auditable way
- produce a final runbook explaining how the application was completed using AI

The final result should not only be an application package. It should also be a clear process artifact showing how the workflow was designed, executed, reviewed, and improved.

## 5. Challenge Constraint

Use AI as much as reasonably possible.

AI should be used for:

- role analysis
- document generation
- document critique
- CV tailoring
- cover letter generation
- form inspection
- browser automation planning
- browser automation script generation
- process logging
- retrospective writing
- repo documentation

The human may still act as:

- factual source of truth
- product owner
- reviewer
- final approver
- safety gate for private data
- final submitter if the ATS, CAPTCHA, login, consent, or legal/privacy boundary requires it

The project should not make false claims that the AI performed actions it did not perform.

The correct framing is:

The workflow uses AI for the application process, while the human remains responsible for factual correctness, consent, privacy, and final approval.

## 6. Core Product Thesis

The application itself should demonstrate the role.

The role is about AI operations, practical automation, workflow design, and operational problem-solving. Therefore, the application should be treated as an operations workflow:

Input facts
→ role analysis
→ candidate-fit mapping
→ tailored CV
→ cover letter
→ AI review
→ form inspection
→ AI-assisted form filling
→ human approval
→ submission
→ retrospective

This repository should make that workflow visible.

## 7. Recommended Positioning

The candidate should not be positioned as a pure machine learning researcher.

The strongest positioning is:

A production-minded software engineer who uses AI to convert messy operational workflows into reliable, documented, and reviewable systems.

Likely strengths to emphasize:

- production software engineering
- automation
- internal tooling
- data/reporting workflows
- SQL and backend experience
- production support / operational reliability
- stakeholder communication
- documentation
- practical AI-assisted development workflow
- ability to decompose ambiguous work into safe, shippable steps

## 8. Proposed Repository Structure

Create the following structure:

    README.md
    SEED.md
    docs/
      00-problem-statement.md
      01-role-intelligence-report.md
      02-application-strategy.md
      03-implementation-plan.md
      04-execution-tracker.md
      05-ai-workflow-runbook.md
      06-form-submission-log.md
      07-retrospective.md
      08-decision-log.md
      10-ai-working-guidelines.md
    prompts/
      00-master-prompt.md
      01-role-analysis-prompt.md
      02-cv-tailoring-prompt.md
      03-cover-letter-prompt.md
      04-reviewer-agent-prompt.md
      05-form-agent-prompt.md
    inputs/
      seed-cv.pdf
      job-description.md
      application-data.example.json
      application-form-notes.md
    outputs/
      tailored-cv.md
      cover-letter.md
      ai-workflow-runbook.md
    scripts/
      inspect-form.spec.ts
      fill-application.spec.ts
    evidence/
      screenshots/
      logs/

If a directory would otherwise be empty, add a .gitkeep file.

## 9. Document Purposes

### README.md

Explain what the project is, why it exists, and how the workflow is organized.

It should be readable by a recruiter, engineer, or hiring manager.

It should include:

- project summary
- challenge summary
- workflow overview
- repo structure
- privacy note
- current status
- how to reproduce or review the process

### docs/00-problem-statement.md

Define the problem, goal, constraints, and success criteria.

Should answer:

- What are we trying to do?
- Why are we doing it?
- What does “AI-first application workflow” mean?
- What is in scope?
- What is out of scope?
- What counts as success?

### docs/01-role-intelligence-report.md

Analyze the target role.

Should include:

- role summary
- signals from the public post
- signals from the job description
- explicit requirements
- hidden evaluation criteria
- candidate-fit mapping
- strengths
- gaps
- risks
- recommended application angle

Use this name instead of “investigation report” because it sounds more strategic and less forensic.

### docs/02-application-strategy.md

Describe the strategy for applying.

Should include:

- positioning
- CV strategy
- cover letter strategy
- AI-only challenge strategy
- form submission strategy
- risk controls
- final recommendation

### docs/03-implementation-plan.md

Define the implementation plan.

Should include phases:

- Phase 1: Repository setup
- Phase 2: Input collection
- Phase 3: Role analysis
- Phase 4: CV tailoring
- Phase 5: Cover letter generation
- Phase 6: Review and QA
- Phase 7: ATS form inspection
- Phase 8: AI-assisted form filling
- Phase 9: Final submission support
- Phase 10: Runbook and retrospective

For each phase include:

- goal
- tasks
- expected outputs
- risks
- status

### docs/04-execution-tracker.md

Living task tracker.

Suggested initial table columns:

- ID
- Task
- Status
- Owner
- Notes
- Last Updated

Suggested initial tasks:

- A-001: Create repository structure
- A-002: Create AI working guidelines
- A-003: Create problem statement
- A-004: Create implementation plan
- A-005: Create execution tracker
- A-006: Save job description
- A-007: Prepare seed CV
- A-008: Generate role intelligence report
- A-009: Generate application strategy
- A-010: Generate tailored CV
- A-011: Review tailored CV for accuracy
- A-012: Generate cover letter
- A-013: Review cover letter
- A-014: Inspect ATS form
- A-015: Prepare application data example config
- A-016: Generate Playwright form inspection script
- A-017: Generate Playwright form fill script
- A-018: Dry-run form automation
- A-019: Prepare AI workflow runbook
- A-020: Prepare retrospective

Statuses:

- Not Started
- In Progress
- Blocked
- Done
- Deferred

### docs/05-ai-workflow-runbook.md

This is the main artifact that may eventually be shared with Opendoor.

It should explain:

- overview
- tools used
- workflow diagram
- prompt strategy
- agent roles
- quality gates
- form interaction method
- final artifacts
- limitations
- what could be improved

Tone should be professional, concise, and practical.

### docs/06-form-submission-log.md

Track the ATS form interaction.

Should include:

- form URL
- date inspected
- fields detected
- required inputs
- optional inputs
- AI-generated responses
- attachments uploaded
- validation issues
- screenshots or evidence paths
- final submission notes

Do not include private personal data in a public repo.

### docs/07-retrospective.md

Reflect on the project after execution.

Should include:

- what worked
- what did not work
- where AI helped most
- where human judgment was still required
- risks discovered
- lessons for real AI Ops workflows
- future improvements

### docs/08-decision-log.md

Record durable decisions.

Suggested columns:

- Date
- Status
- Decision
- Rationale
- Trade-off
- Impact

Initial decisions to record:

- Use Markdown-first documentation.
- Use Playwright for browser automation.
- Keep final submission human-approved.
- Do not commit private application data.
- Use redacted example config for form data.
- Treat CV truthfulness and ATS consent as safety-critical boundaries.

### docs/10-ai-working-guidelines.md

Define how AI should work on this project.

This should be adapted from the PoorToPour AI working guidelines, but changed for this application-lab project.

It should focus on:

- planning before coding
- small safe steps
- scope discipline
- documentation updates
- decision log updates
- execution tracker updates
- truthfulness
- privacy
- consent
- ATS automation boundaries
- review before final submission

## 10. AI Working Guidelines

Future AI sessions must read these documents before meaningful work:

- docs/00-problem-statement.md
- docs/03-implementation-plan.md
- docs/04-execution-tracker.md
- docs/08-decision-log.md
- docs/10-ai-working-guidelines.md

Depending on the task, also read:

- docs/01-role-intelligence-report.md
- docs/02-application-strategy.md
- docs/05-ai-workflow-runbook.md
- docs/06-form-submission-log.md

### 10.1 General Workflow

For meaningful work, follow this process:

1. Understand the work.
2. Check relevant existing docs.
3. Propose an approach before coding.
4. Explain trade-offs.
5. Recommend a preferred option.
6. Implement in small, focused steps.
7. Review the result.
8. Update the execution tracker.
9. Update the decision log if a durable decision was made.
10. Update affected documentation.

### 10.2 Scope Discipline

Keep changes focused.

Avoid:

- unrelated refactoring
- unrelated formatting changes
- unnecessary abstractions
- adding tools before they are needed
- over-engineering the application workflow
- pretending this is a production SaaS product

Build the smallest correct version that demonstrates the AI Ops workflow clearly.

### 10.3 Engineering Principles

Use pragmatic software engineering standards:

- simple over clever
- readable over fancy
- maintainable over impressive
- explicit over hidden
- defensive handling of external systems
- clean separation between inputs, outputs, scripts, prompts, and evidence
- no secrets in source control
- no private data in public examples

### 10.4 Application Safety and Integrity Rules

This project may produce real job application materials and interact with a real ATS form.

Any workflow that generates resume content, cover letters, form responses, uploaded files, or final submission actions must be treated as application-integrity-sensitive.

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

### 10.5 ATS Automation Rules

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
- store private application data in a public repo
- log sensitive personal data unnecessarily

The preferred implementation is:

AI-generated Playwright automation that inspects and fills the form, then pauses before final submission for human review.

### 10.6 Privacy Rules

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

- inputs/application-data.example.json
- redacted screenshots
- redacted logs

If real local config is needed, use a gitignored file such as:

- inputs/application-data.local.json

### 10.7 Documentation Rules

When work changes project direction, update the relevant documentation.

Examples:

- New durable decision: update docs/08-decision-log.md
- Task progress: update docs/04-execution-tracker.md
- Role understanding changes: update docs/01-role-intelligence-report.md
- Application strategy changes: update docs/02-application-strategy.md
- Form behavior discovered: update docs/06-form-submission-log.md
- Workflow process changes: update docs/05-ai-workflow-runbook.md

Avoid documentation drift.

If implementation differs from documentation:

1. call out the mismatch
2. recommend which side should change
3. update the affected doc after the decision is made

### 10.8 Review Expectations

Before considering a change complete, perform:

- factual accuracy review
- privacy review
- application-integrity review
- code review if scripts changed
- documentation review
- execution tracker update
- decision log update if needed

### 10.9 Testing Expectations

For scripts:

- prefer Playwright tests or scripts that can be run locally
- avoid depending on final submission
- support a dry-run mode
- capture screenshots during inspection
- log detected fields in a readable format
- avoid logging secrets or sensitive data
- fail clearly when selectors are not found
- pause before final submit

### 10.10 Comment Style

Use comments sparingly.

Prefer clear naming and simple structure.

When comments are useful, use concise English and French comments.

Example:

- EN: Pause before final submit for human review.
- FR: Pause avant l'envoi final pour validation humaine.

## 11. Suggested Scripts

### scripts/inspect-form.spec.ts

Purpose:

- open the Rippling application form
- inspect visible labels, inputs, buttons, and required fields
- capture screenshots
- save findings to evidence/logs and inputs/application-form-notes.md
- do not submit anything

Expected behavior:

- launch Chromium
- navigate to the application URL
- wait for form elements
- collect labels and placeholders
- take screenshot
- write a Markdown summary of detected fields

### scripts/fill-application.spec.ts

Purpose:

- open the Rippling application form
- load local application data
- fill fields where selectors are known
- upload generated CV and cover letter if supported
- pause before final submission
- do not submit automatically unless explicitly configured for a final approved run

Expected behavior:

- require local config file
- validate required values before filling
- redact sensitive values from logs
- take screenshots at key steps
- pause before submit

### inputs/application-data.example.json

Purpose:

Provide a redacted example config.

Suggested shape:

    {
      "firstName": "Jesse",
      "lastName": "Example",
      "email": "jesse@example.com",
      "phone": "+1-000-000-0000",
      "location": "Montreal, QC, Canada",
      "linkedinUrl": "https://www.linkedin.com/in/example",
      "githubUrl": "https://github.com/example",
      "resumePath": "outputs/tailored-cv.pdf",
      "coverLetterPath": "outputs/cover-letter.pdf",
      "workAuthorization": "To be confirmed by candidate",
      "requiresSponsorship": "To be confirmed by candidate"
    }

Do not store the real config in Git.

## 12. Prompt Files

### prompts/00-master-prompt.md

Defines the overall operating prompt for AI sessions.

Should include:

- project goal
- role context
- workflow expectations
- safety boundaries
- documentation requirements
- review requirements

### prompts/01-role-analysis-prompt.md

Used to analyze the job post and job description.

Should instruct AI to extract:

- explicit requirements
- implied requirements
- hidden evaluation criteria
- role priorities
- candidate-fit mapping
- potential gaps
- recommended positioning

### prompts/02-cv-tailoring-prompt.md

Used to tailor the seed CV.

Must instruct AI to:

- only use facts from seed-cv.md
- not invent experience
- preserve truthful scope
- emphasize relevant experience
- include ATS-friendly keywords naturally
- avoid inflated claims
- output Markdown first

### prompts/03-cover-letter-prompt.md

Used to generate a concise cover letter or application note.

Should emphasize:

- practical AI workflow
- automation
- production systems
- operations mindset
- why the role is interesting
- concise, direct tone

### prompts/04-reviewer-agent-prompt.md

Used for skeptical review.

Should check:

- exaggeration
- unsupported claims
- missing evidence
- unclear wording
- privacy risks
- ATS keyword coverage
- consistency across CV, cover letter, and runbook

### prompts/05-form-agent-prompt.md

Used for form interaction.

Should instruct AI to:

- inspect before filling
- do not submit automatically
- pause before consent or submission
- avoid bypassing protections
- log field mappings
- redact sensitive information

## 13. Initial README Direction

The README should be clear and friendly.

Suggested sections:

- Project Summary
- Why This Exists
- Workflow
- Repository Structure
- Safety and Privacy Boundaries
- Current Status
- How to Review the Project
- Notes

Suggested project summary:

This repository documents an AI-first job application workflow for Opendoor's Operations AI Engineer role. The goal is to treat the application itself as a small AI Ops workflow: analyze the role, tailor documents, inspect the ATS form, assist with form completion, and produce a transparent runbook explaining how AI was used.

## 14. Initial Decision Log Entries

Add the following initial decisions to docs/08-decision-log.md:

### Decision 001: Use Markdown-first documentation

Status: Accepted

Reason:
Markdown is easy to version, review, diff, and convert into PDF later.

Trade-off:
Less polished than a designed document at first, but much better for traceability.

Impact:
All core planning and process documentation starts as Markdown.

### Decision 002: Use Playwright for ATS automation

Status: Accepted

Reason:
Playwright is widely used, deterministic, scriptable, and suitable for inspecting and filling browser forms.

Trade-off:
Dynamic ATS pages may require selector maintenance.

Impact:
Browser automation scripts will live under scripts/.

### Decision 003: Pause before final submission

Status: Accepted

Reason:
The project must respect consent, privacy, ATS boundaries, and factual review.

Trade-off:
The workflow is not fully autonomous end-to-end.

Impact:
Automation can prepare and fill, but should pause before final submit.

### Decision 004: Do not commit private application data

Status: Accepted

Reason:
The repo may be public or shared. Private application details should not be exposed.

Trade-off:
Reproduction requires local private config.

Impact:
Use example config in Git and local gitignored config for real data.

### Decision 005: Treat truthfulness as safety-critical

Status: Accepted

Reason:
Application documents can affect real hiring decisions. False or inflated claims are unacceptable.

Trade-off:
Some generated language may be less flashy.

Impact:
All CV and cover letter outputs require factual review.

## 15. Initial Execution Tracker Tasks

Create docs/04-execution-tracker.md with this initial tracker:

| ID | Task | Status | Owner | Notes | Last Updated |
| --- | --- | --- | --- | --- | --- |
| A-001 | Create repository structure | Not Started | AI | Create docs, prompts, inputs, outputs, scripts, evidence folders | TBD |
| A-002 | Create AI working guidelines | Not Started | AI | Adapt from PoorToPour guidelines for this application-lab project | TBD |
| A-003 | Create problem statement | Not Started | AI | Define goal, constraints, scope, and success criteria | TBD |
| A-004 | Create implementation plan | Not Started | AI | Define phased plan for docs, CV, form automation, and runbook | TBD |
| A-005 | Create execution tracker | Not Started | AI | Create living tracker | TBD |
| A-006 | Create decision log | Not Started | AI | Add initial accepted decisions | TBD |
| A-007 | Save job description | Not Started | AI + Human | Store public job description in inputs/job-description.md | TBD |
| A-008 | Prepare seed CV | Not Started | Human + AI | Use factual source CV as input | TBD |
| A-009 | Generate role intelligence report | Not Started | AI | Analyze role and hidden evaluation criteria | TBD |
| A-010 | Generate application strategy | Not Started | AI | Define positioning and application approach | TBD |
| A-011 | Generate tailored CV | Not Started | AI | Based only on seed CV and job requirements | TBD |
| A-012 | Review tailored CV | Not Started | AI + Human | Check truthfulness and relevance | TBD |
| A-013 | Generate cover letter | Not Started | AI | Short, practical, role-specific | TBD |
| A-014 | Review cover letter | Not Started | AI + Human | Check claims and tone | TBD |
| A-015 | Inspect ATS form | Not Started | AI | Use Playwright inspection script | TBD |
| A-016 | Prepare form-fill script | Not Started | AI | Use local config and pause before submit | TBD |
| A-017 | Dry-run form automation | Not Started | AI + Human | Confirm behavior without submitting | TBD |
| A-018 | Prepare AI workflow runbook | Not Started | AI | Main artifact explaining process | TBD |
| A-019 | Prepare retrospective | Not Started | AI | Summarize what worked and lessons learned | TBD |

## 16. Initial Implementation Plan

The implementation plan should follow these phases.

### Phase 1: Repository Setup

Goal:
Create the folder structure and baseline docs.

Tasks:
- create directories
- add .gitkeep files where needed
- create README
- create docs
- create prompts
- create example config

Outputs:
- initial repo skeleton
- baseline documentation

Risks:
- too much documentation before useful work
- unclear doc ownership

Status:
Not Started

### Phase 2: Input Collection

Goal:
Collect source material.

Tasks:
- save job description
- save seed CV
- save application URL
- define candidate facts
- define unknowns requiring human confirmation

Outputs:
- inputs/job-description.md
- inputs/seed-cv.md
- list of missing facts

Risks:
- using outdated job description
- missing required form details
- inventing facts not in seed CV

Status:
Not Started

### Phase 3: Role Analysis

Goal:
Understand the role and its signals.

Tasks:
- extract explicit requirements
- extract implied requirements
- infer hidden evaluation criteria
- map candidate experience to role
- identify gaps and mitigation

Outputs:
- docs/01-role-intelligence-report.md

Risks:
- overfitting to the job post
- reading too much into limited public wording

Status:
Not Started

### Phase 4: Application Strategy

Goal:
Decide how to apply.

Tasks:
- define positioning
- define CV strategy
- define cover letter strategy
- define AI-only challenge strategy
- define form strategy

Outputs:
- docs/02-application-strategy.md

Risks:
- being too gimmicky
- being too conventional
- unclear explanation of AI usage

Status:
Not Started

### Phase 5: CV Tailoring

Goal:
Create a truthful tailored CV.

Tasks:
- parse seed CV
- map experience to job requirements
- generate tailored CV
- review for factual accuracy
- revise for clarity and ATS readability

Outputs:
- outputs/tailored-cv.md
- eventually outputs/tailored-cv.pdf

Risks:
- exaggeration
- unsupported claims
- losing original nuance
- keyword stuffing

Status:
Not Started

### Phase 6: Cover Letter Generation

Goal:
Create a concise application note.

Tasks:
- generate cover letter
- emphasize practical AI workflow
- explain interest in role
- keep tone direct and human
- review for factual accuracy

Outputs:
- outputs/cover-letter.md
- eventually outputs/cover-letter.pdf

Risks:
- sounding generic
- sounding too cute
- overstating intent since this is partly a fun challenge

Status:
Not Started

### Phase 7: Review and QA

Goal:
Review documents before form work.

Tasks:
- run skeptical reviewer prompt
- check consistency
- check truthfulness
- check privacy
- check ATS keyword coverage
- revise outputs

Outputs:
- reviewed CV
- reviewed cover letter
- documented review notes

Risks:
- missing hidden exaggerations
- leaking private data

Status:
Not Started

### Phase 8: ATS Form Inspection

Goal:
Understand the Rippling application form.

Tasks:
- generate Playwright inspection script
- run script locally
- capture screenshots
- detect visible fields
- record required fields
- update form submission log

Outputs:
- scripts/inspect-form.spec.ts
- inputs/application-form-notes.md
- docs/06-form-submission-log.md
- evidence screenshots/logs

Risks:
- dynamic form fields
- CAPTCHA or consent gates
- selectors changing
- private data in screenshots

Status:
Not Started

### Phase 9: AI-Assisted Form Filling

Goal:
Prepare a safe form-fill workflow.

Tasks:
- create application-data.example.json
- create gitignored local config pattern
- generate fill script
- fill draft fields
- upload documents
- pause before final submission

Outputs:
- scripts/fill-application.spec.ts
- evidence logs
- dry-run screenshots

Risks:
- accidental submission
- sensitive data logging
- selector mismatch
- ATS restrictions

Status:
Not Started

### Phase 10: Runbook and Retrospective

Goal:
Document the journey.

Tasks:
- write AI workflow runbook
- write retrospective
- record final decisions
- update README
- update execution tracker

Outputs:
- docs/05-ai-workflow-runbook.md
- docs/07-retrospective.md
- updated README

Risks:
- too much process noise
- not enough concrete evidence
- unclear explanation of human vs AI roles

Status:
Not Started

## 17. Recommended First Codex Task

Start by creating the repository structure and documentation skeleton only.

Do not generate the final CV or form automation yet.

First task:

- create folders
- create README.md
- create docs/00-problem-statement.md
- create docs/03-implementation-plan.md
- create docs/04-execution-tracker.md
- create docs/08-decision-log.md
- create docs/10-ai-working-guidelines.md
- create prompt files with placeholders
- create input/output/script/evidence directories
- add .gitkeep where needed

After that, update docs/04-execution-tracker.md and docs/08-decision-log.md.

## 18. Definition of Done for Initial Setup

Initial setup is done when:

- repository structure exists
- core docs exist
- AI working guidelines are adapted to this project
- execution tracker has initial tasks
- decision log has initial decisions
- README explains the project clearly
- no private data has been committed
- no form submission has been attempted
- changes are small, focused, and reviewable

## 19. Important Tone Guidance

This project should feel:

- practical
- engineer-friendly
- honest
- traceable
- slightly playful but not gimmicky
- suitable for a hiring manager or engineering reviewer

Avoid:

- fake autonomy claims
- hype-heavy AI language
- pretending the application was fully autonomous if it was not
- exaggerated career claims
- unnecessary complexity
- “AI magic” framing

Preferred framing:

This is a small AI Ops workflow that shows how to turn an ambiguous real-world process into a documented, reviewable, partially automated system with clear safety boundaries.

## 20. Final Note for AI Agents

Do not treat this as a normal resume-writing task.

Treat it as a workflow design and execution project.

The quality of the process matters as much as the final application materials.