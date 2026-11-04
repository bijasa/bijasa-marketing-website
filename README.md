# Bijasa — Website V2

**Deep roots. Long reach.** A software engineering studio website built with Next.js App Router, React, strict TypeScript and plain CSS. Statically exported for GitHub Pages; all existing routes retained.

V2 is isolated on `feature/bijasa-website-v2`. **Local review only: do not push to main or dispatch the Pages workflow without explicit deployment approval.** Every push to main deploys automatically.

## Local review

Use Node 22.18+ (or Node 24+) for the local mock and tests.

```sh
npm ci
npm run build
npm run review
```

Open **http://localhost:3000**. `review` starts the production-export preview and the local enquiry mock together. Ctrl+C stops both. For live editing, use `npm run dev -- --hostname 127.0.0.1 --port 3000`, with `npm run dev:mock` in a second terminal. `npm run preview` / `npm start` serve only the static export.

## Checks

```sh
npm run typecheck
npm run test:analytics
npm run test:contact
npm run build
npm run test:browser
```

Browser QA uses separately installed Playwright, axe and Lighthouse. Setup and measured results are in [V2_CHANGELOG.md](V2_CHANGELOG.md). QA screenshots/reports stay in ignored `artifacts/v2/`.

## Content and configuration

- `lib/content.ts`: original industries and capabilities.
- `lib/services.ts` and `lib/service-details.ts`: services and example deliverables.
- `lib/case-studies.ts`: verified owned-product evidence and genuine screenshots.
- `lib/social.ts`: verified official profiles only.
- `lib/enquiry-delivery.ts`: disabled production endpoint adapter; loopback-only mock configuration.
- `app/globals.css` and `app/studio.css`: base styles, design tokens, components and responsive rules.
- `public/fonts/`: locally served Archivo and its SIL Open Font License.

Direct live enquiry delivery is **not configured**. Local mocks do not store messages or send email. Existing Gmail, Outlook, email app and draft-copy options remain. See [enquiry setup](docs/V2_ENQUIRY_SETUP.md) before enabling any provider. Never place credentials in public environment variables.

## Review documents

- [Architecture and baseline audit](V2_AUDIT.md)
- [Changes, test results and file list](V2_CHANGELOG.md)
- [Acceptance and deployment checklist](V2_REVIEW_CHECKLIST.md)
- [Missing verified content](docs/V2_CONTENT_GAPS.md)
- [Analytics behavior](docs/ANALYTICS.md)

© 2026 Bijasa. All rights reserved. See [LICENSE](LICENSE). The Archivo font has its own included license.
