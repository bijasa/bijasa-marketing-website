# bijasa.com

Marketing site for Bijasa, built with Next.js (App Router).

© 2026 Bijasa. All rights reserved. See [LICENSE](LICENSE).

## Run

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build                # static site in out/
```

## Structure

- `app/page.tsx` — all sections (hero, approach, domains, capabilities, expertise, contact)
- `app/globals.css` — design tokens + styles
- `components/ScrollEffects.tsx` — every scroll-linked effect (port of the prototype's `upd()`); respects `prefers-reduced-motion`
- `components/Logo.tsx` — b symbol + hero wordmark SVG
- `components/ContactForm.tsx` — contact form: validates, then opens the visitor's email app pre-filled
- `lib/content.ts` — copy for domains / capabilities / teams, and the contact email

## Contact form

No backend. On **Send message** the form validates, then opens a `mailto:hello@bijasa.com` link with subject and body (message, name, email, company) pre-filled in the visitor's default email app. If no email app opens, the form offers a "Copy the message" fallback. The address lives in `lib/content.ts` (`CONTACT_EMAIL`).

## Deploy

GitHub Pages, via `.github/workflows/pages.yml`: every push to `main` builds a static export (`next build` with `output: 'export'`, written to `out/`) and publishes it. Custom domain `bijasa.com` comes from `public/CNAME`.

GoDaddy DNS for bijasa.com:

- `A` records on `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` `www` → `bijasa.github.io`
- Leave the Zoho `MX` / `TXT` mail records untouched.
