# Seed CV Working Extract

Status: Private local working file

Source: `inputs/Seed_cv.pdf`

Privacy note: This file is gitignored and may contain private candidate data. Do not commit it or copy private details into public docs.

## Page 1

Page 1
Jesse Tsang
Full-Stack Software Engineer | Angular / TypeScript / Java
 Montreal, QC | JesseTsang09@gmail.com | 438-995-9671 | linkedin.com/in/jesse-tsang
PROFESSIONAL SUMMARY
Full-Stack Software Engineer with 6+ years of end-to-end product delivery experience building responsive,
accessible web applications used by end-users at scale across Angular, TypeScript, Java Spring Boot, and
Node.js. Proven track record designing and shipping production-grade features across customer-facing
booking flows, payment systems, and cross-cutting infrastructure, with strong experience in Angular
(reactive programming, RxJS, HttpInterceptor, component orchestration), RESTful API design and
consumption, automated testing (Jest, Cypress, ATDD), and CI/CD engineering.
Currently engineering features on ViaRail’s national passenger booking SPA, a high-traffic customer-facing
platform supporting booking journeys across Canada and the U.S., including a double-payment prevention
interceptor, multi-flow payment orchestration, and domain logic corrections presented to client architects.
After 5+ years delivering across CGI mandates, I am seeking a permanent product engineering role to build
long-term within a single team and product.
Actively leverages AI tooling across the full development lifecycle, from architecture planning and
implementation to security review and automated test authoring, to improve delivery speed and test
coverage while retaining full ownership of every output.
Backed by a B.Sc. in Computer Science (Concordia University, 2020, specialization: Web Services and
Applications).
TECHNICAL SKILLS
Frontend
Angular, TypeScript 5, RxJS 7, NgRx, Reactive Forms, Angular HttpClient /
Interceptors, HTML5, SCSS/CSS3, AG Grid
Testing
Jest, Cypress, Playwright, Postman (automation), ATDD
Backend
Java 17, Spring Boot, Spring Batch, REST API design, Scala (microservices),
Node.js / Express
Accessibility
WCAG 2.1 / A11Y, semantic HTML5, keyboard navigation, ARIA
Database
PostgreSQL, SQL, relational data modeling, Hibernate / JPA
Cloud &
Observability
AWS RUM, Azure, Docker
CI/CD & DevOps
GitHub Actions, Jenkins, SonarQube, JFrog Artifactory, XL Deploy, Git
AI-Augmented
Engineering
GitHub Copilot, LLM-assisted architecture planning, automated test authoring,
security review support
UI/UX
Responsive UI design, component-driven architecture, practical application of
UI/UX principles
Languages
Python, JavaScript (ES6+)
PROFESSIONAL EXPERIENCE
ViaRail — New Reservation System (NRS) · Full-Stack Engineer (Angular / TypeScript)
CGI Inc. (Mandate) · March 2026 – Present · Montreal, QC (Remote)
High-traffic Angular SPA serving ViaRail's national passenger booking platform — payment flows, fare
selection, group search, and booking modification across B2C and B2E (agent) journeys. Stack: Angular 20,
TypeScript 5.8, RxJS 7, Jest, AWS RUM, REST APIs.
Flagship delivery — Cross-cutting infrastructure:
 Architected and shipped a production-safe Angular HttpInterceptor to prevent double-payment race
 conditions on POST /payment, using RxJS request coalescing (shareReplay), TTL-based response caching,
and a declarative rule model for configurable endpoint coverage. Released behind a feature flag with AWS
RUM telemetry and presented the architecture and security review to client architects.
## Page 2

Page 2
 Validated the interceptor with 37 ATDD-driven automated tests across 5 suites, covering request coalescing,
 TTL expiry, LRU eviction, interceptor-chain integration, and configuration acceptance criteria.
Additional feature delivery:
 Resolved a payment orchestration regression in the B2C modify flow where non-main-contact loyalty
 members could incorrectly access restricted payment methods: composed a multi-condition eligibility rule
to eliminate condition drift across components, fixed a RxJS startup race condition in payment method
loading, corrected a payment-method cache keying bug that allowed restricted context entries to leak into
unrestricted sessions, and added timeout/retry resilience to prevent Review & Pay from stalling on
profile-resolution failures.
 Identified a frontend-only enforcement gap during security review of the payment restriction logic;
 escalated and coordinated server-side enforcement with the backend team.
 Diagnosed and fixed a sleeper fare matrix display failure for group searches on regional routes by
 identifying that the split-API trigger compared passenger count against aggregate train inventory rather
than per-cabin configuration — rewrote the comparison in JourneyService against per-class cabin
maximums and validated with 6 boundary-aware unit tests.
 Fixed a multi-fare upgrade refund integrity bug where a reduce-based merge silently dropped replacement
 item IDs from all but the first selected fare, causing incomplete refunds and stale line items on the Review
& Pay summary; added a targeted regression test.
 Delivered all UI features in compliance with ViaRail's WCAG 2.1 A/AA accessibility mandate — applying
 semantic HTML, ARIA attributes, keyboard navigation patterns, and screen-reader compatibility as standard
practice across every Angular component shipped. Coordinated REST API contract updates with Node.js
backend services to align frontend feature requirements.
Desjardins — Enterprise Loan System Modernization · Software Developer
CGI Inc. (Mandate) · June 2025 – December 2025 · Montreal, QC
End-to-end delivery on a greenfield enterprise lending platform used by Desjardins loan officers across
multiple business units.
 Owned full-stack feature delivery from tech design through QA: built Angular 15 reactive UI modules
 (AG-Grid data tables, Reactive Forms with complex validation) backed by Java Spring Boot and Spring Batch
processing pipelines — responsible for correctness, performance, and production readiness at every layer.
 Collaborated directly with business analysts and product managers in Agile ceremonies to refine
 requirements, propose technical approaches, and break down features into testable increments — bridging
the gap between business needs and engineering implementation.
 Spearheaded QA automation for the team: built Postman scripted test collections and Cypress end-to-end
 suites that became the shared release validation baseline, reducing manual regression effort and improving
confidence in every release.
 Automated multi-schema test data generation (Python → SQL inserts) that cut QA environment setup time
 and unblocked parallel developer testing across the team.
 Mentored junior engineers through regular code reviews, raising code quality standards and accelerating
 their ramp-up on Angular and Spring patterns.
Key technologies: Angular 15, TypeScript, RxJS, Java Spring Boot, Spring Batch, PostgreSQL, Cypress, Postman,
Docker, SonarQube, Git.
CGI — HR Application Modernization · Software Developer
CGI Inc. · April 2024 – June 2025 · Montreal, QC
Full Angular SPA migration of a legacy IBM/i HR system to a modern Spring Boot architecture, serving HR
teams across the organization.
 Delivered Angular SPA modules end-to-end — routing, reactive forms, RxJS-driven component state —
 integrated across both new Spring Boot APIs and legacy Thymeleaf templates during a live, parallel-running
migration.
 Maintained Cypress test suites as the primary functional parity guarantee across all migrated modules,
 ensuring no regressions reached production during a high-risk legacy cutover.
 Enforced quality gates via SonarQube, coordinated artifact promotion with JFrog, and managed deployment
 pipelines with XL Deploy — owning the full CI/CD loop for the team's deliverables.
Key technologies: Angular 15, TypeScript, RxJS, Java Spring Boot, Cypress, IBM/i, SonarQube, XL Deploy, JFrog.
Airbus — A220 Path Management · Lead Software Developer
CGI Inc. (Mandate) · January 2024 – March 2024 · Montreal, QC
## Page 3

Page 3
Short-mandate technical lead role: assessed constraints, proposed the solution, and delivered it end-to-end.
 Proposed and implemented a Python-based automated document path migration tool (Bombardier →
 Airbus), owning the full lifecycle from solution design to on-site stakeholder validation.
 Built a dual-strategy processing pipeline (dictionary normalization + regex) with CLI tooling and modular
 libraries designed for reuse; achieved ~10,000 files/hour throughput, materially reducing manual migration
effort.
 Authored user-facing documentation and conducted on-site validation with stakeholders, ensuring adoption
 by non-technical users.
Key technologies: Python, CLI tooling, unit testing, technical documentation.
Société Générale — CAT/CAIS Regulatory Reporting · Java Backend Developer
October 2021 – December 2023 · Montreal, QC
Microservices-based regulatory reporting platform for U.S. markets (CAT/CAIS), processing trade data at scale
under strict compliance and uptime requirements.
 Designed and maintained Java Spring Batch and Scala microservices for high-volume regulatory reporting
 pipelines; consumed and produced REST APIs integrated with compliance monitoring systems — owning the
full development lifecycle from design to production support.
 Provided L3 production support for New York operations: triaged incidents, clarified requirements directly
 with business stakeholders, and delivered fixes under time pressure across time zones — building strong
cross-functional communication skills with distributed teams.
 Managed Jenkins CI/CD pipelines, code review workflows, SonarQube quality gates, and JFrog artifact
 management — responsible for the reliability and repeatability of every release.
 Ran Agile ceremonies as interim Scrum Master: sprint planning, grooming, retrospectives, and stakeholder
 demos — practiced at keeping engineering and product aligned on priorities and progress.
 Conducted structured code reviews and ran knowledge-sharing sessions that raised the team's technical
 standards across the pipeline codebase.
Key technologies: Java Spring Boot, Spring Batch, Scala, Python, PostgreSQL, Azure, Jenkins, Docker,
SonarQube, JFrog, Angular 14/15.
Nuance Communications — Enterprise Access Management · R&D Developer
(Internship)
September 2019 – April 2020 · Built internal access management tooling (Spring Boot, HTML/JS front-end,
SSO/Keycloak integration, role-based access control).
EDUCATION
Bachelor of Computer Science — Concordia University, Montreal · 2020
Specialization: Web Services and Applications
LANGUAGES
English (Professional) · French (Professional) · Cantonese (Native) · Mandarin (Fluent)
 Delivered through CGI Inc. — all mandates listed above are CGI client placements.
