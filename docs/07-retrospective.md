# Retrospective

Status: Complete through final submission workflow

Last updated: 2026-05-13

## Purpose

This retrospective captures what we learned from using AI to prepare a real job application workflow for Opendoor's Operations AI Engineer role.

It covers the work completed through role discovery, application material drafting, ATS inspection, safe form automation, synthetic dry run, runbook creation, and final submission attempts.

## What Worked

The strongest part of the workflow was turning an ambiguous challenge into a staged system.

Instead of asking AI to "apply for the job" in one move, the project broke the work into source collection, role analysis, strategy, drafting, review, form inspection, automation, evidence, and human approval gates. That structure made the output more trustworthy and easier to debug.

The role intelligence report was especially useful. It separated explicit requirements from implied evaluation criteria, which helped the CV and cover letter avoid generic AI enthusiasm. The application became about operational systems judgment, documentation, automation, data trust, and human-in-the-loop safety.

The skeptical review stage also paid off. It caught the need to scope AI-tool experience precisely: Figma had professional context through Desjardins, while MCP, Replit, Claude Code, and Cursor were personal-project or current-workflow experience. It also prevented unsupported claims around LLM deployment and model drift monitoring.

Playwright worked well for ATS inspection and safe draft-fill automation. The blank-form inspection produced useful field notes, and the synthetic dry run proved the script could upload a file, fill draft fields, capture redacted evidence, and stop before final submission.

## What Did Not Work Perfectly

The seed CV extraction was messy. The PDF-to-Markdown output contained formatting artifacts and read more like raw data than a polished document. It was still useful as a factual source, but it was not suitable as a public or final artifact.

The original leadership post that inspired the challenge was not captured as a source. Because of that, the cover letter and strategy had to refer to the public challenge carefully instead of naming a specific person or quoting the post.

The synthetic form-fill screenshot showed that ATS validation can be visually noisy even when automation completes. Phone values may be normalized, and location may require human review in case the ATS expects a resolved city selection. This reinforces the decision to keep final submission human-gated.

The Markdown-first approach made the process traceable, but it created one more final-mile task: converting the reviewed CV and cover letter into polished, selectable-text PDFs for upload.

## Where AI Helped Most

AI was most valuable in high-context synthesis work:

- identifying the correct job description without being given the direct link
- extracting role signals and hidden evaluation criteria
- converting those signals into an application strategy
- drafting role-specific CV and cover letter materials
- acting as a skeptical reviewer for truthfulness and exaggeration risk
- producing Playwright scripts quickly enough to make ATS inspection practical
- maintaining the execution tracker, decision log, and runbook as the workflow evolved

The pattern was not "AI replaced the applicant." The pattern was "AI carried the cognitive and mechanical load while the human supplied judgment, facts, and final approval."

## Where Human Judgment Was Essential

Human input was required anywhere the workflow touched truth, identity, privacy, or intent.

Important human decisions included:

- confirming the located job description was correct
- approving how AI usage should be framed
- correcting and scoping AI-tool experience
- confirming no LLM deployment or model drift monitoring experience
- confirming Canadian citizenship and Canada work authorization
- deciding that the cover letter needed stronger mission alignment
- deciding that final uploads should be PDFs rather than Markdown
- requiring final submission and status check as a separate A-020 phase

These choices changed the output materially. Without them, the application would have been more generic, less accurate, and potentially misleading.

## Risks Discovered

Truthfulness risk:

AI can make adjacent experience sound broader than it is. The strongest safeguard was explicit human confirmation plus skeptical review.

Privacy risk:

Real candidate data can leak through local configs, screenshots, logs, generated PDFs, or extracted CV text. The project reduced this risk with `.gitignore`, redacted evidence, synthetic dry runs, and private local artifacts.

ATS risk:

Dynamic forms can change behavior between inspection, dry run, and real submission. The automation should be treated as assistance, not authority.

Tone risk:

An AI-first application can easily become gimmicky. The cover letter improved when it connected the process to Opendoor's mission and the housing problem rather than only emphasizing tool usage.

Evidence risk:

It is tempting to prove too much with screenshots or logs. The better evidence is process-level: tracker updates, decisions, redacted logs, and clear human gates.

## Lessons For Real AI Ops Workflows

A useful AI workflow needs more than prompts. It needs:

- source boundaries
- factual grounding
- review roles
- execution tracking
- durable decisions
- privacy rules
- dry-run evidence
- human approval gates
- a clear definition of what the system must not do

The "must not do" list was as important as the task list. Not submitting automatically, not answering consent fields, not inventing candidate claims, and not logging private data made the workflow more credible.

The project also showed that AI can be strongest when it makes human judgment easier. The best artifacts were not just generated outputs; they were structured choices the human could inspect, correct, and approve.

## Improvements For Next Time

- Capture the original public challenge post as a sourced input early.
- Create a cleaner intermediate CV source rather than relying on raw PDF extraction.
- Add a small PDF-generation step once the Markdown drafts are reviewed.
- Consider a redacted public version of the tailored CV if the repository will be shared.
- Add explicit pre-submit checklist items for file names, uploaded PDFs, consent fields, and confirmation logging.
- Improve location-field handling if the real ATS run shows autocomplete requirements.
- For future final submissions, treat a clicked Apply button as insufficient; require a success page, confirmation email, or post-submit status.

## Current Outcome

The project successfully produced a traceable AI-assisted application workflow through final submission.

Completed outcomes:

- correct job description located and saved
- role intelligence report completed
- application strategy completed
- tailored CV drafted and reviewed privately
- cover letter drafted and revised for mission alignment
- ATS form inspected safely
- form-fill script created
- synthetic dry run completed without private data or submission
- AI workflow runbook completed
- final PDF drafts generated and reviewed
- final headed submission automation attempted with local video recording
- real-browser assist flow used to fill in trusted Chrome session, then human completed challenge and submitted successfully.

## Final Reflection

The best result of this project is not that AI produced a resume or filled a form. The best result is that the application process became legible.

The workflow shows how AI can operate inside a controlled system: fast enough to create leverage, careful enough to preserve trust, and humble enough to stop where human accountability matters.

