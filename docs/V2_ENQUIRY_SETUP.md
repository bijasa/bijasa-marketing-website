# Enquiry integration and approval boundary

The site remains a static GitHub Pages export. No API route, credentials, account or production setting was added. Existing Gmail, Outlook, default email and clipboard flows remain available.

## Local testing
In separate terminals from the V2 worktree:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run dev:mock
```

Open http://localhost:3000. The client selects the mock only on localhost / loopback. Mock binds 127.0.0.1:3401, accepts JSON from local HTTP origins only, validates input again, caps bodies at 12KB, limits attempts to five per IP per minute, and responds with `{ "accepted": true, "mock": true }`. It never stores or logs enquiry content or sends mail. Stop the mock to test connection errors. `curl` can test 422, 413, 429 and disallowed origins. Restart to reset rate limits. Node 22.18+ or Node 24+ is recommended for native TypeScript stripping in local scripts.

## Prepared live endpoint adapter (disabled)
`lib/enquiry-delivery.ts` accepts an HTTPS endpoint only when both build-time variables are configured:

- NEXT_PUBLIC_ENQUIRY_ENABLED=true
- NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://<approved-provider>/enquiries

These are public configuration, never secrets. No live endpoint is configured, called or approved. Do not enable until a provider is selected, its data-processing terms/retention are reviewed, privacy text is updated, and the owner approves tests and delivery activation.

Endpoint contract: POST application/json with name, email, company, projectType, budget, message, consent and website honeypot. Return HTTP 2xx JSON `{ "accepted": true }` only after durable acceptance; otherwise a non-2xx response. Client sends no credentials, omits referrer, times out after 12 seconds, retains entries on failure and prevents overlapping submissions. An ambiguous timeout must be checked before retrying in a live integration.

Required production server controls: use lib/contact.ts validation or equivalent; enforce size and enum bounds; origin/CORS allowlist; rate limits and provider anti-abuse/CAPTCHA with server-side verification if needed; honeypot; escaped output and parameterized persistence; fixed destination mailbox; never interpolate user input into mail headers; server-held credentials; no content logging; retention/deletion policy; durable queue and idempotency keys for retry safety; delivery monitoring. The local mock is not a production backend. Pick and test the actual provider before enabling this adapter. No claim of real delivery can be made from this review build.

## Analytics
Mock submissions never emit generate_lead. Confirmed live endpoint acceptance may emit generate_lead with method endpoint after analytics consent; this is not proof of delivered email. Draft preparation uses contact_form_ready; email/copy actions use contact_handoff. Never infer confirmed leads from those handoffs. No booking URL is verified, so no booking event or link is added.
