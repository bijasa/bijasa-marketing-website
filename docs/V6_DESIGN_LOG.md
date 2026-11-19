# Bijasa website v6: design log

Branch `feature/bijasa-website-v6`, started from `feature/bijasa-website-v5` at d8616b2 (approved copy, form, analytics and SEO). Worktree `~/bijasa-marketing-website-v6`, preview on port 3006. v5 is unchanged.
Status: local review only. Nothing pushed, merged or deployed.

## Owner feedback on v5.1

- v5 must not be changed again. v6 is a separate version.
- Ultramarine is not a Bijasa colour (it is not in the logo). Removed from this site.
- "It should look like a software company website, but hand-drawn. The tree must be the main element. Use the colour of the tree or of our brand logo; everything should be in sync. I want innovation, not inspiration from boring design."

## Palette: only the logo

Sampled from `bijasa-wordmark-primary.png` and `bijasa-avatar-400.png`:

| Token | Value | Source |
|---|---|---|
| `--ink` | `#18130e` | the "bijasa" letters and the avatar background |
| `--copper` | `#c3773e` | the seed loop and the dot over the j |
| `--bone` | `#f4f0e7` | the "b" on the avatar |

Tints and shades of the same family: copper light `#e0a574`, copper deep `#94522a` (copper text on bone, AA), trunk `#a8612f`, bark `#5b3a22`, raised ink `#241b13`, bone 2 `#ebe3d6`, card `#fbf8f2`. No blue and no green anywhere: buttons, links, focus rings, selection, illustrations and `theme-color` are all from this family. A search of `app`, `components`, `lib` and `public` for ultramarine, `#0332c7`, blue, cobalt and the old v4 colours finds nothing.

## Concept: the codebase tree

The tree is the spine of the page, and every part of it is software.

| Part of the tree | What it is drawn as | Where |
|---|---|---|
| The seed | The copper loop from the logo itself | Where the trunk meets the ground in the hero; the kicker; the HEAD marker |
| Leaves | Interface components: a deploy button, a toggle, a search field, a chart card, a checklist, an avatar, a version tag | Hero canopy; the canopy strip above "What we build" |
| Branches | An architecture diagram (ui, api, auth) that turns into canopy; git branches for the sectors | Hero; Sectors |
| Trunk | The `main` branch. It continues from the hero's taproot down the left side of the whole page. Each section is a commit on it (`main · philosophy`, `main · sectors` ...). A copper seed labelled HEAD rides down the trunk as you scroll, and the trunk grows behind it | Every section |
| Roots | A hand-drawn data model: work_items, users and events in the hero; the six beliefs as tables (`deep_roots.understand_the_work` ...) joined to the trunk by relation lines with crow's feet | Hero; Philosophy |
| Growth rings | A cross-section of the trunk. Four rings are the four stages: understand, shape, build, grow | How we work |
| Planting | A hand-drawn terminal: `git init your-idea`, `git commit -m "first conversation"`, planted on main | Contact |

Other pages (services, case studies, tools, privacy, products) show a small codebase tree beside the title, and the footer has one in copper on ink.

## Why it reads as a software company first

The drawings are interfaces, schemas, git graphs and a terminal: things a software team draws on a whiteboard. Product-grade details: hard-shadow cards with ink borders, monospace for code, table names and commit refs, copper pill buttons, crisp grid. The hand-drawn quality (a turbulence wobble, double pen strokes and Caveat notes) carries the warmth; the structure stays exact.

## Section order and copy

Unchanged from v5: hero, philosophy, sectors, what we build, how we work, contact. Only small labels were added: commit refs, "the roots", "the branches", "what grows", "how it grows", "plant the seed", the sector branch names, the belief table names and "ring 01" to "ring 04".

## Motion

- The hero tree draws itself on load (seed, roots, trunk, architecture, leaves). The taproot then bends into the page's trunk.
- `StoryMotion` (about 1 kB, no library) grows the trunk with scroll, moves the HEAD seed, and draws each section's diagram as it enters.
- With reduced motion or without JavaScript, everything is shown complete and nothing moves.

## Responsive

- 1300 px and wider: the philosophy is a full schema diagram with relation lines routed between the tables.
- Below 1300 px the tables stack in a grid (two columns, then one). Below 960 px each table has its own relation line from the trunk.
- Below 1180 px the canopy strip is hidden and the cards stack; the git branch graphs shrink.
- Phone: the trunk moves to the left edge (12 px in), the hero drawing sits under the headline and is fully visible on a 390 x 844 screen.

## Kept

Contact form wiring and modes, analytics, cookie consent, SEO metadata and structured data, `robots.txt` (GPTBot allowed), `llms.txt`, sitemap (including `/products/`), Services, case studies, tools, privacy, 404 and old anchors. Products stay on `/products/`. No client names, testimonials, numbers or awards.

## Verification (19 Nov 2026)

- `npm run typecheck` passed. Analytics: 15 pass. Contact: 10 pass. `npm run build` passed (15 pages).
- Playwright at 390 and 1440 px on `/`, `/products/` and `/services/`: no horizontal overflow.
- Screenshots (JPEG) in `docs/v6-screenshots/`: `home-desktop-fold`, `home-desktop`, `home-mobile-fold`, `home-mobile`, `products-desktop`, `products-mobile`, `services-desktop`, and mid-scroll frames `scroll-philosophy-desktop`, `scroll-philosophy-mobile`, `scroll-sectors-desktop`, `scroll-build-desktop`, `scroll-process-desktop` (these show the trunk part-grown and the HEAD seed). Full-page shots use reduced motion so every drawing is complete.
- Not run: axe and Lighthouse.

## Open items

- Owner review of the concept and the small labels (commit refs, table names, branch names, the terminal lines).
- Between 961 and 1299 px the belief tables have no relation lines (two-column grid).
- The hero drawing's last few pixels of taproot sit just below the first screen at 1440 x 900.
- Check scroll performance on a low-end phone.
