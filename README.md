<div align="center">

<a href="https://bijasa.com"><img src="public/icon-192.png" alt="Bijasa" width="88" height="88"></a>

# Bijasa

**Deep roots. Long reach.**

The website of Bijasa, a software company. Live at **[bijasa.com](https://bijasa.com)**.

[![Deploy](https://github.com/bijasa/bijasa-marketing-website/actions/workflows/pages.yml/badge.svg)](https://github.com/bijasa/bijasa-marketing-website/actions/workflows/pages.yml)

</div>

---

## Overview

A single-page site. Its main feature is a scroll-driven hero: the lowercase **b** draws itself, then grows into the full *bijasa* wordmark as you scroll. Below it are sections on our approach, the industries we work in, our capabilities, our team and how to contact us.

- **Fast and static.** Every page is pre-built HTML, with no server at runtime.
- **Accessible.** Uses semantic markup and keyboard-friendly forms, and respects `prefers-reduced-motion`.
- **Responsive.** Fluid type and layout from 390px phones to wide desktops.

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router, static export) |
| Language | TypeScript, React |
| Styling | Plain CSS with design tokens, Archivo typeface |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to ./out
```

## Project structure

```
app/
  layout.tsx          Page shell, metadata, fonts
  page.tsx            All page sections
  globals.css         Design tokens and styles
components/
  ScrollEffects.tsx   Scroll-linked animation (hero, reveals, thread)
  ContactForm.tsx     Contact form
  Logo.tsx            Bijasa symbol and wordmark
lib/
  content.ts          Site copy (domains, capabilities, teams, contact email)
  contact.ts          Form validation
public/               Icons and static assets
```

Most text changes only need an edit to `lib/content.ts`.

## Contact form

The form doesn't need a server. It checks what the visitor typed, then opens a ready-to-send email to the Bijasa inbox in **Gmail**, **Outlook** or the visitor's own email app. Visitors can also copy the message to send it themselves.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages automatically ([workflow](.github/workflows/pages.yml)).

## Contact

**[hello@bijasa.com](mailto:hello@bijasa.com)**

## License

© 2026 Bijasa. All rights reserved.
The source code, content, name and logo are not licensed for reuse. See [LICENSE](LICENSE).
