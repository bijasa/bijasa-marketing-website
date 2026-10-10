'use client';

import { useRef, useState, type FormEvent } from 'react';
import { LIMITS, normalize, validate, type ContactErrors, type ContactInput } from '@/lib/contact';
import { CONTACT_EMAIL } from '@/lib/content';

const FIELDS: { key: keyof ContactInput; label: string; optional?: boolean; full?: boolean }[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company', optional: true, full: true },
  { key: 'message', label: 'Project', full: true },
];

function compose(c: ContactInput) {
  const subject = `Project enquiry from ${c.name}${c.company ? ` (${c.company})` : ''}`;
  const body = [
    c.message,
    '',
    '—',
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    c.company ? `Company: ${c.company}` : null,
  ]
    .filter((l) => l !== null)
    .join('\n');
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, href };
}

/**
 * Validates the enquiry, then opens the visitor's default email app with a
 * pre-filled message to CONTACT_EMAIL. No backend involved.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draft, setDraft] = useState<ReturnType<typeof compose> | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const input = normalize(Object.fromEntries(new FormData(ev.currentTarget).entries()));
    const errs = validate(input);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = FIELDS.find((f) => errs[f.key]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.key}"]`)?.focus();
      return;
    }
    const d = compose(input);
    setDraft(d);
    setCopied(false);
    window.location.href = d.href;
  }

  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-label="Contact Bijasa">
      {FIELDS.map((f) => {
        const id = `cf-${f.key}`;
        const err = errors[f.key];
        const common = {
          id,
          name: f.key,
          maxLength: LIMITS[f.key],
          'aria-invalid': err ? true : undefined,
          'aria-describedby': err ? `${id}-err` : undefined,
          required: !f.optional,
        };
        return (
          <div key={f.key} className={f.full ? 'field full' : 'field'}>
            <label htmlFor={id}>
              {f.label} {f.optional && <span>(optional)</span>}
            </label>
            {f.key === 'message' ? (
              <textarea {...common} rows={5} placeholder="What are you building, and where are you stuck?" />
            ) : (
              <input
                {...common}
                type={f.key === 'email' ? 'email' : 'text'}
                autoComplete={f.key === 'email' ? 'email' : f.key === 'name' ? 'name' : 'organization'}
              />
            )}
            {err && (
              <span id={`${id}-err`} className="field-err">
                {err}
              </span>
            )}
          </div>
        );
      })}

      <div className="form-foot">
        <button type="submit" className="btn">
          Send message
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {draft ? (
            <>
              Your email app should open with the message ready — just hit send. Nothing opened?{' '}
              <button type="button" className="link-btn" onClick={copy}>
                {copied ? 'Copied ✓' : 'Copy the message'}
              </button>{' '}
              and email it to <a href={draft.href}>{CONTACT_EMAIL}</a>.
            </>
          ) : (
            'Opens your email app with everything filled in.'
          )}
        </p>
      </div>
    </form>
  );
}
