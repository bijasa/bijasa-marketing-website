# Bijasa website v5: design log

Branch `feature/bijasa-website-v5`, started from `feature/bijasa-website-v4` (cc38634). v2, v3 and v4 are unchanged.
Status: local review only. Nothing pushed, merged or deployed.

## Owner feedback on v4 (19 Nov 2026)

- "Design seems very not good."
- The home page revolved around Bijasa's own products. "Your products can't be your moat."
- The home page must be about (1) the firm's philosophy: how and why Bijasa builds software, (2) the sectors Bijasa works across, (3) a clear way to start a conversation.
- Products move to a separate page (`/products`). Linked from the navigation, not the pitch.
- New copy, written around the philosophy, not reused product copy.

## Positioning and philosophy

**Bijasa builds software from the roots up.**

The name comes from *bija*, a seed, and the existing line is "Deep roots. Long reach." v5 turns that line into the firm's point of view:

- **Deep roots.** Most of what decides whether software lasts is below the surface: how the work really runs, the data model, permissions, integrations, failure cases and tests. We start there, before the screens.
- **Long reach.** Software with good roots can change, grow and be handed on. It reaches more people, more sectors and more years than the first brief.

Hero line: "Software, built from the roots up."
Supporting line: "Bijasa is a software engineering firm. Before we design a single screen, we learn how the work really happens and build the structure underneath it: the data, the rules, the connections. That is what lets software last, change and grow."

## Home page section order

1. **Hero** (`#top`). Headline, supporting line, "Start a conversation" and email/phone. Below it, an annotated roots diagram: a small sprout above a ground line ("what people see") and labelled roots below it ("what decides whether it lasts"). This is the one illustration on the page and it carries the philosophy.
2. **Philosophy** (`#philosophy`, old `#approach`). Two columns, "Deep roots" and "Long reach", three principles each, numbered 01 to 06.
3. **Sectors** (`#sectors`, old `#domains`). "Bijasa works across" six sectors (fintech, healthcare, logistics, climate and energy, commerce, education), each with what tends to matter there. A closing line: the discipline travels, sectors not listed are welcome. No client names or claims of past work.
4. **What we build** (`#capabilities`). Web applications, mobile apps, AI applications and integrations, business software, plus cloud and data foundations. Links to Services. One quiet line at the end links to the products page (keeps old `#products` and `#tools` anchors alive).
5. **How an engagement runs** (`#process`, old `#expertise`). Four steps: Understand, Shape, Build, Grow. Scope and cost agreed before work starts.
6. **Contact** (`#contact`). A full ultramarine block: large email, phone, the existing enquiry form.

## Products page (`/products/`)

- Title "Things we make for ourselves." Intro: why a services firm keeps products (practice our own approach, try ideas on ourselves first). It does not sell the products as the firm's proof.
- Four entries as a ledger: number, name, type, status, a short description, screenshot, main action and "Read the case study".
- Closing: "Need something built around your own work?" to the contact section.
- `/work/` and the case studies stay as they are (restyled), `/tools/` stays.

## Visual direction

- Restraint and structure: bone background, ink text, one strong colour (ultramarine) used in two places only: the roots diagram and the contact block. Copper only for small marks (the logo loop, numbers, the sprout).
- Palette: bone `#f3eee5`, bone-2 `#ebe4d8`, ink `#1b1612`, ink-2 `#4a4239`, ultramarine `#0332c7`, copper `#c4783f`, copper text `#9a5426` (AA on bone).
- Type: Bricolage Grotesque (bundled) at a medium weight with tight tracking for display, Archivo for body, the system monospace for indices and labels. Large sizes, a 12-column grid, hairline rules instead of cards and shadows.
- No rounded colour tiles, no screenshots on the home page, no gradients, no stock imagery.
- Motion: none beyond hover states. Reduced-motion rule kept.

## Factual guard rails

No client names, testimonials, logos, results, numbers, years in business or awards. Sectors are written as "Bijasa works across" and describe what matters in each sector, not past projects. Capabilities, process and philosophy only.

## Kept

Contact form wiring and modes, analytics (adds `/products` to the safe route list), cookie consent, SEO metadata and structured data, `robots.txt` (GPTBot allowed), `llms.txt` (updated), sitemap (adds `/products/`), Services and service pages, `/work/` case studies, `/tools/`, privacy, 404, old anchors.

## Verification (19 Nov 2026)

- `npm run typecheck` passed. Analytics: 15 pass. Contact: 10 pass. `npm run build` passed (15 pages, including `/products/`).
- Playwright at 390 and 1440 px on `/`, `/products/` and `/services/`: no horizontal overflow.
- Screenshots: `docs/v5-screenshots/` (home desktop and mobile, full page and first screen; products desktop and mobile; services desktop).
- Built in a separate worktree (`~/bijasa-marketing-website-v5`) so the v4 preview on port 3000, which serves `out/` from the v2 worktree, is not overwritten.
- Not run: axe and Lighthouse.

## Open items

- Owner review of the philosophy copy, the six sector descriptions and the products page wording.
- The contact form shows "Local review mode" on localhost, as before. On bijasa.com it shows the email hand-off.
