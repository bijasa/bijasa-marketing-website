# Bijasa website v3: design log

Branch `feature/bijasa-website-v3`, started from `feature/bijasa-website-v2` (a7388b9). v2 is unchanged.
Method: the Anthropic `frontend-design` skill (plan, check the plan against generic defaults, build, critique with screenshots).
Status: local review only. Nothing pushed, merged or deployed.

## Why v3

Review of v2 (17 Nov 2026) found:

1. Every section used the same layout: small label, giant two-line headline, paragraph on the right.
2. Lots of mood copy ("Deep roots", "engineer it") and little proof. No product beyond Invoicing and Typing.
3. Dark and copper did not match any Bijasa product (Invoicing is light and blue, Bijadex is violet, GearShift is navy and lime).
4. Repetition: "What we do" (7 cards), "Beyond categories" (8 tiles) and "Industries" (6, with no proof) covered the same ground.
5. On the live domain the contact form's main button was disabled (no enquiry provider yet): a dead call to action.
6. Text-symbol icons (⌘ ☁ ↻), "Explore the possibilities" on all 7 cards, lowercase "ai" and "devops" on Services.

## Decisions

| # | Decision | Why |
|---|---|---|
| 1 | Brief: software for Indian shops, garages and small businesses; products are the proof | That is what Bijasa has actually built |
| 2 | Base colours: cool paper `#f2f3ef`, ink `#18201d`, line `#d3d7cf` | Not warm cream, which is a common AI default. Light matches the products |
| 3 | Copper `#9e4f22` only for the logo and the main action | Keeps the brand mark; darker than v2 for white-text contrast |
| 4 | Each product keeps its own colour, used only in its own panel | The site's colours come from the products, not from a template |
| 5 | Bricolage Grotesque for headings (bundled, OFL), Archivo for body | Bricolage is Bijadex's heading font, so the family is shared. No font service is contacted |
| 6 | One bold element: the hero product switcher (Shop, Garage, Freelancer, Student) | It opens with the real thing. ARIA tabs with arrow, Home and End keys |
| 7 | Products as a plain index (name, who it is for, status, what it does, links) | No repeated screenshots; the hero already shows them |
| 8 | Services: one list (7 capabilities) | Replaces three overlapping sections. Industries dropped: no evidence behind it |
| 9 | Numbers only on "How we work" | It is the only real sequence. Removed 01/02 markers elsewhere |
| 10 | Removed ALL-CAPS labels, the → and ↗ glyphs in link text, and the one-word colour accent in headlines | Template tells. Links say what they do |
| 11 | No founder or team section | Owner decision (17 Nov 2026) |
| 12 | GearShift shown as a product with status "Windows app" and "Ask for a GearShift demo" | Owner decision (17 Nov 2026). The repo is private and has no public download, so the call to action is a demo request, not a download link |
| 13 | Contact form: when direct submission is off, "Prepare email" is the main button and the disabled Send button is hidden | No dead call to action on the live site |
| 14 | Motion: one fade when a switcher tab is picked; off for reduced motion | User-triggered only |
| 15 | Old anchors (`#top`, `#tools`, `#capabilities`, `#domains`, `#expertise`, `#approach`, `#contact`) kept | Existing links do not break |
| 16 | Next.js 16.4.0 → 16.4.6 | 16.4.0 to 16.4.4 had a moderate advisory (GHSA-mfr8-8qww-v76h), and the build stopped on it. `npm audit`: 0 vulnerabilities after the bump |

## Product facts and sources

- **Bijadex**: release v1.1.0 on github.com/bijasa/bijadex-releases (public), with Windows x64 and Mac (arm64, x64) builds. Features are taken from the app and its docs. Screenshot: `Documents/Bijadex Screenshots/01-checkout-weighed-item.png` (sample data).
- **GearShift**: features are taken from the GearShift README (repo bijasa/GearShift, private). Screenshot: `release/GearShift-Live-Floor.png`. It shows a demo workspace with sample data, as the caption says.
- No customer names, numbers, testimonials or pilot details are published.

## Files

- `app/studio.css`: rewritten (v3 tokens and components; old variable names kept as aliases for the work pages and the form).
- `app/page.tsx`: new home page (hero and switcher, products, services, process, contact).
- `components/ProductSwitcher.tsx`: new.
- `lib/case-studies.ts`: adds Bijadex and GearShift, plus per-product fields (`who`, `for`, `status`, `cta`, `tone`, `flow`, `tradeoff`, image size).
- `app/work/[slug]/page.tsx`: reads the flow and tradeoff from data; next case study cycles through all four.
- Header, footer, layout (fonts, meta), form, work index, services, tools, 404, sitemap: copy and link updates.
- `public/work/bijadex.jpg`, `public/work/gearshift.jpg`, `public/fonts/bricolage-grotesque-latin-opsz-normal.woff2` and its licence.

## Verification (17 Nov 2026)

- `npm run typecheck` passed. `npm run test:analytics`: 15 pass. `npm run test:contact`: 10 pass. `npm run build` passed: 14 static pages, including `/work/bijadex/` and `/work/gearshift/`.
- Playwright at 320, 390 and 768 px on `/`, `/work/`, `/work/bijadex/`, `/work/gearshift/`, `/services/`, `/tools/` and `/privacy/`: no horizontal overflow.
- Chrome at 1440 px: the switcher works by mouse and by arrow keys.
- Screenshots: `docs/v3/before/` (v2) and `docs/v3/after/` (v3).
- Not run: axe and Lighthouse (`npm run test:browser` needs QA packages that are not installed here). Run them before release.

## Open items

- Owner review of the copy, especially product claims and service descriptions.
- Run `npm run test:browser` (axe, Lighthouse) on a machine with the QA packages installed.
- Social links (LinkedIn and others) are still to be supplied.
- The free tools page lists only the two free web tools, which is correct; Bijadex and GearShift appear under Products.
