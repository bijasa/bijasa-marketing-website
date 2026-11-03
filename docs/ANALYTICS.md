# Marketing analytics

GA4 property: 558396770. Web stream: 16103286484. Measurement ID: G-VQ2CJHF54W.

Enhanced measurement was switched off in the stream on 3 November 2026. Keep it off: automatic outbound URL capture could expose email-compose parameters, and automatic page views would duplicate manual views.

No tag loads before affirmative consent. Declining leaves all site features available. Each event checks the current choice; withdrawal disables GA, clears this site's analytics cookies and attribution enum, and honours changes from another tab. Advertising storage, advertising user data, personalisation and Google Signals are disabled. Analytics errors must not interrupt navigation or enquiry preparation.

Only fixed route descriptions and enum values are sent. No form values, email-draft URLs, arbitrary event names, arbitrary query values, fragments, personal identifiers or referrer paths are included. Unknown paths become /other. Cookie prefix: bijasa_marketing; host-only scope; 180-day expiry. Local and unrecognised hosts do not collect.

Events: page_view; nav_click (section); tool_open (tool); case_study_open and case_study_view (case_study); enquiry_cta_click (entry_point); contact_start; contact_form_ready; generate_lead (method).

source_product is invoicing, typing or direct_or_external. It comes from a recognised referrer origin or a fixed via=invoicing / via=typing link parameter, and persists in this browser tab only after consent. It is not a cross-site user ID. Other query parameters are dropped. Report it as a referral source, not proof that a particular person completed an action in another property.

generate_lead means an enquiry handoff action (Gmail, Outlook, email app, copy, or fixed email link). The static site cannot verify that mail was sent or received. contact_form_ready means local validation and draft preparation succeeded. Neither is a confirmed or qualified sales lead.

Run npm run test:analytics before building. CI runs these privacy and consent regressions before deployment. Review route and enum lists when adding pages or actions.
