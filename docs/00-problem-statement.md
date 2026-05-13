# Problem Statement

## What We Are Trying To Do

This project treats a job application as a small AI Ops workflow. The goal is to use AI to support the application process for Opendoor's Operations AI Engineer role while keeping the workflow honest, auditable, and bounded by human review.

## Why We Are Doing It

The role itself appears to value practical automation, operational judgment, documentation, and AI-assisted execution. The application can demonstrate those same qualities by showing how an ambiguous real-world process becomes a documented, reviewable workflow.

This is also a fun engineering challenge. The point is not to pretend AI can own every step. The point is to show where AI helps, where human judgment remains necessary, and how to design the handoff between the two.

## What AI-First Application Workflow Means

AI-first means AI is used as the default assistant for analysis, drafting, critique, planning, and safe automation. It does not mean AI has unchecked authority.

AI can:

- analyze the role and public job materials
- map requirements to candidate evidence
- draft a tailored CV and cover letter from factual inputs
- review generated materials for unsupported claims
- inspect an ATS form
- generate browser automation scripts
- record workflow evidence and process notes

The human remains responsible for:

- providing factual source material
- approving private data use
- reviewing all application claims
- handling consent, login, CAPTCHA, or legal boundaries
- making the final submission decision

## Scope

In scope:

- Markdown-first planning and documentation
- role intelligence analysis
- application strategy
- truthful CV and cover letter drafting
- skeptical review of application materials
- Playwright-based ATS form inspection
- safe form-fill assistance that pauses before final submission
- runbook, decision log, execution tracker, and retrospective

Out of scope:

- bypassing ATS protections
- submitting without human approval
- inventing candidate facts
- storing private data in the public repository
- building a production SaaS product
- over-engineering the workflow beyond what demonstrates the application process

## Success Criteria

The project succeeds if it produces:

- a clear repo structure
- readable planning documentation
- traceable inputs and generated outputs
- truthful, reviewed application materials
- safe ATS inspection and optional draft-fill automation
- evidence that does not expose private data
- a final runbook explaining how AI was used
- a retrospective showing what worked, what did not, and where human judgment mattered
