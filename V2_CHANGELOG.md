# Bijasa Website V2 — local review

## Safety and location
- Original checkout: /Users/himanshupatil/bijasa-marketing-website, main, preserved clean.
- Isolated worktree: /Users/himanshupatil/bijasa-marketing-website-v2.
- Branch: feature/bijasa-website-v2; baseline fde2bea.
- No commits pushed, merges, workflow dispatches, deployment changes, DNS changes or product-application changes.

## Implemented
- Premium dark surfaces with copper and bone accents, Archivo, readable fluid typography, spacing, borders, radii and lightweight motion tokens. Removed obsolete scroll-drawing CSS and the 520vh homepage hero dependency. No new runtime dependencies.
- Shared sticky navigation across routes: Home, Services, Industries, Our Work, Free Tools, About, Contact and Discuss a Project. Mobile disclosure supports Escape, outside click, focus departure and link selection; added skip link and active page indicators.
- Direct hero positioning, original brand philosophy, complete seven-capability bento, Beyond Categories and eight-discipline grid with feasibility qualification, both genuine product screenshots, all six original industries, five-stage process, principles, engagement options, final CTA and expanded enquiry section.
- Preserved original public routes and homepage domains, capabilities, expertise, tools, contact, top and approach anchors.
- Enhanced service index with all original capabilities; detail pages add example deliverables, approach, engagement and relevant project evidence. Case studies retain existing content and add accessible product workflow diagrams and explicit architectural tradeoffs. Tools now display genuine supplied screenshots.
- Shared social navigation in footer, contact and mobile menu, with labeled SVG icons and safe external links. GitHub organization configured from repository origin. Unverified social profiles omitted; setup gaps documented.
- Name/email/company/project type/budget/project description/acknowledgement, enum and length validation, field errors, focus management, loading, success/error states and request locking. Kept Gmail, Outlook, mail app and copy options. Draft preparation does not send anything.
- Static-host-compatible HTTPS endpoint adapter is disabled pending provider approval. Local mock revalidates requests, bounds bodies, enforces local origins, applies rate limits and stores/sends nothing. No real email delivery claim. See docs/V2_ENQUIRY_SETUP.md.
- Preserved GA4 opt-in, withdrawal, hostname limits, attribution/campaign allowlists, metadata, canonicals, schema, robots and sitemap. Split contact_handoff from confirmed endpoint acceptance, added service exploration. No analytics contain form entries. No booking URL invented.
- Locally bundled licensed Archivo font removes build-time font requests. Existing WebP product assets retain dimensions and lazy loading. Reduced-motion preferences disable transitions and smooth scrolling.
- Added branded not-found page, local static preview server, contact tests and browser/a11y/screenshot QA harness. npm start now serves the static export instead of invoking next start, which does not serve this project's export mode.

## Verification
- TypeScript: npm run typecheck passed.
- Production build: npm run build passed; all original routes statically generated.
- Analytics: npm run test:analytics passed, 15 tests.
- Contact and mock/adapter: npm run test:contact passed, 10 tests.
- git diff --check passed. Static export audit passes for all 13 generated HTML files and 300 internal link references (including branded not-found pages); all anchor and image targets resolve.
- Final browser run: **122 checks passed**, 4 November 2026, 16:14:57 UTC. All 10 content routes; 60 route/viewport combinations across 320, 375, 768, 1024, 1440 and 1920px; zero horizontal overflow; zero automated WCAG A/AA violations on all 10 pages. Mobile disclosure/Escape/focus/link selection, required-field focus, loading, error retention, mock acceptance and email-draft fallback pass. No browser exceptions. All three external product/social URLs returned HTTP 200.
- Lighthouse **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**. Single production-export run using default mobile simulated throttling on localhost. This is a measured local lab result, not a field-performance guarantee.
- Initial browser run stopped on an automation locator that changed accessible name when the menu opened. Fixed the test locator; the final run above passed.
- Desktop/mobile hero and full-page screenshots, contact state, original live desktop screenshot, QA JSON and Lighthouse HTML/JSON saved under artifacts/v2/. Screenshots reviewed locally.
- No lint configuration or lint command existed; no lint result is claimed.
- This managed session cannot bind local ports or launch Chromium; the owner runs the prepared QA command in Terminal. Build, typecheck and unit tests run in this session. Screenshots are reviewed here after generation.

## Local preview
Requires Node 22.18+ (or Node 24+) for native TypeScript in local mock/tests.

```sh
cd ~/bijasa-marketing-website-v2
npm ci
npm run build
npm run review
# Starts both static preview and local enquiry mock. Ctrl+C stops both.
# Alternatively: npm run preview and npm run dev:mock in separate terminals.
```

Open http://localhost:3000. For live editing, use `npm run dev -- --hostname 127.0.0.1 --port 3000` instead of preview. Local requests select the mock, never the production adapter.

## QA reproduction
```sh
npm run typecheck
npm run test:analytics
npm run test:contact
npm run build
npm run test:browser
```

Browser QA uses local Playwright, axe-core and Lighthouse tooling without adding production dependencies. In this workspace, QA-only packages are linked inside ignored node_modules from existing installed tools. For another machine: `npm install --no-save --package-lock=false playwright @axe-core/playwright lighthouse`, then `npx playwright install chromium`. The harness starts temporary static and mock servers, uses synthetic enquiries, and shuts down its child processes. It never submits to a live service. Output is ignored under artifacts/v2/.

## Required configuration and remaining review
- Verified LinkedIn, Instagram, X/Twitter and YouTube URLs (docs/V2_CONTENT_GAPS.md).
- Approved enquiry provider, server-side controls and tested delivery before enabling either public environment variable. Privacy/provider disclosure must match that decision.
- Human keyboard/screen-reader, content and cross-browser review remains appropriate; automated axe scans do not establish full WCAG conformance.
- Lighthouse figures, when present, are single local lab measurements, not real-user guarantees.
- Stop here for review. Deployment requires a separate explicit authorization.

## Files changed or added

```text
V2_AUDIT.md
V2_CHANGELOG.md
V2_REVIEW_CHECKLIST.md
app/not-found.tsx
app/studio.css
components/SiteFooter.tsx
components/SiteHeader.tsx
components/SocialLinks.tsx
docs/V2_CONTENT_GAPS.md
docs/V2_ENQUIRY_SETUP.md
lib/enquiry-delivery.ts
lib/service-details.ts
lib/social.ts
public/fonts/Archivo-LICENSE.txt
public/fonts/README.md
public/fonts/archivo-latin-wght-normal.woff2
scripts/browser-qa.cjs
scripts/contact.test.mjs
scripts/mock-enquiries.mjs
scripts/mock-enquiry-handler.mjs
scripts/preview.mjs
scripts/review.mjs
.gitignore
README.md
app/globals.css
app/layout.tsx
app/page.tsx
app/privacy/page.tsx
app/services/[slug]/page.tsx
app/services/page.tsx
app/tools/page.tsx
app/work/[slug]/page.tsx
app/work/work.module.css
components/ContactForm.tsx
components/ContentPage.tsx
docs/ANALYTICS.md
lib/analytics.ts
lib/contact.ts
package.json
scripts/analytics.test.cjs
```
