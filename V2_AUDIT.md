# Bijasa V2 audit

Baseline: fde2bea, main, clean working tree. V2 isolated at ../bijasa-marketing-website-v2 on feature/bijasa-website-v2. No remote mutations authorized.

## Architecture and information architecture
Next.js 16.4 App Router, React 19.3, strict TypeScript, plain global CSS plus a work-page CSS module. Static export with trailing slashes and unoptimized images. Archivo is downloaded at build time by next/font and served locally. GitHub Pages workflow deploys on pushes to main or manual dispatch. Deployment configuration, CNAME and credentials are untouched.

Routes: / (approach, domains, capabilities, expertise, tools, contact anchors); /services/ and three detail routes (web-mobile-development, cloud-platforms-devops, data-engineering-ai); /work/ and invoicing-platform, typing-practice details; /tools/; /privacy/. No separate about/contact/industries routes. Preserve all routes and anchors.

Reusable sources: lib/content.ts has six industries, seven capabilities and five expertise disciplines; lib/services.ts has service articles; lib/case-studies.ts has detailed product evidence and authentic 1280×720 screenshots. Logo, ContentPage, ContactForm, CookieConsent and ScrollEffects are existing components. Copper, bone and basalt tokens anchor the brand.

## Functionality and problems
- Hero occupies 520vh and depends on scroll drawing before explaining the business. Replace with immediate positioning and lightweight geometry.
- Navigation lacks a proper mobile disclosure, Work and Services visibility, skip link and social links.
- No verified social URLs in repository. GitHub repository URL establishes the bijasa organization; use that organization profile only. Keep other networks unset in typed configuration.
- Contact validates name/email/company/message, then prepares Gmail/Outlook/mailto drafts or clipboard copy. No backend exists. Retain these options; add project type, budget, acknowledgement, honeypot and mock/provider adapter. No real submission without explicit setup and approval.
- Existing generate_lead means a handoff, not delivery. Stop emitting it from handoffs; reserve it for confirmed provider acceptance. Add separate fixed-enum events.
- GA4 G-VQ2CJHF54W only loads on production hostnames after opt-in; route, attribution and campaign values are allowlisted and strip private URL content. Preserve this and regression tests.
- Canonicals, descriptions, OG/Twitter, organization/site/service/article JSON-LD, sitemap and robots already exist. Keep routes and metadata.
- Case studies distinguish owned products and explain real implementation decisions. No verified product framework versions, founder identity, client outcomes or certifications. Do not add those claims.
- No lint script or general test suite; only analytics regressions. Add meaningful contact and browser checks, run typecheck and build.

## Plan
Shared responsive header/footer and social configuration; premium dark homepage with copper accents, all original categories, Beyond Categories, real product imagery, process, principles and conversion sections. Upgrade shared article layouts and service deliverables. Prepare safe static-host-compatible form endpoint with a localhost-only mock. Validate all routes, responsive widths, keyboard flows, form states, consent and output. Record measured results and limitations in V2_CHANGELOG.md and V2_REVIEW_CHECKLIST.md. Stop at local review.

## Completed verification
See V2_CHANGELOG.md for final implementation and results: build/typecheck, 15 analytics tests, 10 contact tests, 122 browser checks, 60 responsive combinations, zero automated WCAG A/AA violations across 10 routes, and a local Lighthouse 100/100/100/100 measurement. Original main checkout remains clean; no deployment actions taken.
