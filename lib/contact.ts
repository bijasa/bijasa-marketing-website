export const PROJECT_TYPES = ['New website or application', 'Enterprise / custom software', 'Cloud & DevOps', 'Data / AI / automation', 'APIs & integrations', 'Design / modernization', 'Maintenance & support', 'Other / Custom Requirement'] as const;
export const BUDGET_RANGES = ['Not sure yet', 'Under ₹1 lakh', '₹1–5 lakh', '₹5–20 lakh', '₹20 lakh+', 'Prefer to discuss'] as const;
export type ContactInput = { name: string; email: string; company: string; projectType: string; budget: string; message: string; consent: boolean; website: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export const LIMITS = { name: 120, email: 254, company: 160, projectType: 80, budget: 80, message: 1500, website: 200 } as const;
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;
export function normalize(raw: Record<string, unknown>): ContactInput {
 const s = (v: unknown) => typeof v === 'string' ? v.trim() : '';
 return { name:s(raw.name), email:s(raw.email), company:s(raw.company), projectType:s(raw.projectType), budget:s(raw.budget), message:s(raw.message), consent: raw.consent === true || raw.consent === 'on', website:s(raw.website) };
}
export function validate(input: ContactInput): ContactErrors {
 const e: ContactErrors = {};
 if (!input.name || input.name.length > LIMITS.name || /[\r\n\x00-\x1f]/.test(input.name)) e.name='Please enter your name (up to 120 characters).';
 if (!EMAIL_RE.test(input.email) || input.email.length > LIMITS.email) e.email='Please enter a valid email address.';
 if (input.company.length > LIMITS.company || /[\r\n\x00-\x1f]/.test(input.company)) e.company='Please enter a company name of up to 160 characters.';
 if (!(PROJECT_TYPES as readonly string[]).includes(input.projectType)) e.projectType='Please choose a project type.';
 if (input.budget && !(BUDGET_RANGES as readonly string[]).includes(input.budget)) e.budget='Please choose a listed budget range.';
 if (input.message.length < 10 || input.message.length > LIMITS.message || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(input.message)) e.message='Please describe your project in 10–1500 characters.';
 if (!input.consent) e.consent='Please acknowledge how we will use your enquiry.';
 if (input.website) e.website='We could not accept this enquiry. Please email us instead.';
 return e;
}
