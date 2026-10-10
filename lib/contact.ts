// Validation for the contact form. Message length is capped so the mailto: link stays within mail-client URL limits.

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 120, email: 254, company: 160, message: 1500 } as const;

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

export function normalize(raw: Record<string, unknown>): ContactInput {
  const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  return { name: s(raw.name), email: s(raw.email), company: s(raw.company), message: s(raw.message) };
}

export function validate(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!input.name) e.name = 'Please tell us your name.';
  else if (input.name.length > LIMITS.name) e.name = 'That name is too long.';

  if (!input.email) e.email = 'We need an email to reply to.';
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email)) e.email = 'That email doesn’t look right.';

  if (input.company.length > LIMITS.company) e.company = 'That company name is too long.';

  if (input.message.length < 10) e.message = 'A sentence or two about the project, please.';
  else if (input.message.length > LIMITS.message) e.message = `Please keep it under ${LIMITS.message} characters.`;
  return e;
}
