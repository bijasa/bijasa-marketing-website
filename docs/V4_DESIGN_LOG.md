# Bijasa website v4: design log

Branch `feature/bijasa-website-v4`, started from `feature/bijasa-website-v3` (4a06905). v2 and v3 are unchanged.
Method: the Anthropic `frontend-design` skill. Status: local review only. Nothing pushed, merged or deployed.

## Owner feedback on v3 (17 Nov 2026)

- Did not like the design: "too plain / light" and "looks too simple".
- Wording: do not limit Bijasa to a region, shops or workshops. That can cause problems and typecast the company.
- Chosen direction: bold and colourful.

## Decisions

| # | Decision | Why |
|---|---|---|
| 1 | Positioning: a software engineering company that builds any kind of software. No region, no industry | Owner feedback. The products show range, not a niche |
| 2 | Headline: "Ideas in. Working software out." | Broad, concrete and confident. Says what Bijasa does, not who it serves |
| 3 | Palette: cobalt `#2f3cff`, copper `#e0712f` (brand), lime `#d4f25a`, violet `#5a3fe0`, navy `#0e1233`, white | Bold blocks. Each colour is used as a whole section or tile, not as a small accent |
| 4 | Text copper `#a24a17` on white | The bright copper fails contrast as text; the darker one passes AA |
| 5 | Hero: the four real product screens fanned on a cobalt block with lime and copper circles. One "deal" animation on load, off for reduced motion | Depth and richness from real work, not stock art |
| 6 | "What we build": 8 tiles of different size and colour. The four coloured tiles name the product that proves them; the white ones link to services | Range with proof, without a uniform card grid |
| 7 | Products: one full-width colour band per product, with a large tilted screenshot and alternating sides | Bijadex violet, GearShift lime, Invoicing cobalt and Typing copper each come from that product's own interface |
| 8 | Process: navy band, five numbered steps in five colours | It is a real sequence |
| 9 | Contact: a cobalt band with a white form card | The last screen is a clear call to act |
| 10 | Product type labels (`kind`) added: Desktop app, Operations system, Web platform, Learning tool | Lets the home page describe range without naming an industry |
| 11 | Bijadex copy: "retail counters" instead of "Indian shops" | Same facts (GST, UPI, khata), less typecasting |
| 12 | Kept from v3: email-first contact form, no founder section, GearShift demo request, old anchors, Next 16.4.6 | Unchanged owner decisions and fixes |
| 13 | Removed `ProductSwitcher` | Replaced by the hero stage |

## Verification (17 Nov 2026)

- `tsc --noEmit` passed. Analytics: 15 pass. Contact: 10 pass. `npm run build` passed (14 pages).
- Playwright at 320, 390, 768 and 1440 px on 7 pages: no horizontal overflow.
- Screenshots: `docs/v4/home-desktop.jpg` and `docs/v4/home-mobile.jpg`.
- Not run: axe and Lighthouse. Run them before release.

## Open items

- Owner review of the copy and colours.
- Social links are still to be supplied.
