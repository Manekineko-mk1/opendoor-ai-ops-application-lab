# Opendoor AI Ops Application Lab

This repository documents an AI-first job application workflow for Opendoor's Operations AI Engineer role. The goal is to treat the application itself as a small AI Ops workflow: analyze the role, map requirements to candidate evidence, tailor application materials, inspect the ATS form, assist with form completion, and produce a transparent runbook explaining how AI was used.

## Project Summary

This is a practical engineering exercise, not a normal resume-writing project. The application process is handled like an operations workflow with inputs, generated artifacts, review gates, evidence, and a final retrospective.

The intended framing is:

> A production-minded software engineer using AI to convert a messy real-world workflow into a documented, reviewable, partially automated system with clear safety boundaries.

## Why This Exists

The project was inspired by an Opendoor leadership post challenging applicants to use AI throughout the application process. This repository makes that workflow visible: what AI did, what the human reviewed, what was automated, and what stayed deliberately manual.

## Workflow

1. Collect source inputs: job description, seed CV, application data, and form notes.
2. Analyze the role and identify explicit and implied requirements.
3. Define an application strategy and candidate positioning.
4. Generate a tailored CV and cover letter from factual source material only.
5. Run skeptical review for truthfulness, privacy, consistency, and exaggeration risk.
6. Inspect the ATS form with AI-generated Playwright automation.
7. Fill safe draft fields with automation where appropriate.
8. Pause before consent or final submission for human review.
9. Document the runbook, evidence, decisions, and retrospective.

## Repository Structure

```text
docs/       Planning, analysis, logs, decisions, runbook, and retrospective
prompts/    Reusable prompts for AI agents in each phase
inputs/     Public or redacted inputs and examples
outputs/    Generated application artifacts, created later
scripts/    Playwright scripts, created in later phases
evidence/   Redacted screenshots and logs from inspection or dry runs
```

## Safety and Privacy Boundaries

This repository must not contain private application data, unredacted personal details, ATS confirmation numbers, or screenshots showing sensitive information. Real local application data should live in gitignored files such as `inputs/application-data.local.json`.

AI may draft, inspect, critique, and automate safe steps. The human remains responsible for factual correctness, consent, privacy review, and final submission approval.

## Current Status

The workflow has completed role discovery, role analysis, application strategy, reviewed Markdown drafts for the CV and cover letter, ATS inspection, safe form-fill automation, a synthetic dry run, and the AI workflow runbook.

Remaining work:

- human review of generated final PDF versions of the CV and cover letter
- prepare real local application data in `inputs/application-data.local.json`
- run the headed form-fill workflow with real reviewed PDFs
- complete human-only consent, voluntary, and final submission choices
- record final submission status or confirmation details safely
- write the retrospective

## How to Review the Project

Start with:

- [docs/00-problem-statement.md](docs/00-problem-statement.md)
- [docs/03-implementation-plan.md](docs/03-implementation-plan.md)
- [docs/04-execution-tracker.md](docs/04-execution-tracker.md)
- [docs/08-decision-log.md](docs/08-decision-log.md)
- [docs/10-ai-working-guidelines.md](docs/10-ai-working-guidelines.md)

Then review phase-specific documents as they are completed.

## Notes

The quality of the process matters as much as the final application materials. The project should stay honest, traceable, engineer-friendly, and useful to a hiring manager or engineering reviewer.
