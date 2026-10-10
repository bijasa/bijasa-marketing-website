'use client';

import { useRef, useState, type FormEvent } from 'react';
import { LIMITS, normalize, validate, type ContactErrors, type ContactInput } from '@/lib/contact';
import { track } from '@/lib/analytics';
import { CONTACT_EMAIL } from '@/lib/content';

const FIELDS: { key: keyof ContactInput; label: string; optional?: boolean; full?: boolean }[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company', optional: true, full: true },
  { key: 'message', label: 'Project', full: true },
];

type Draft = {
  subject: string;
  body: string;
  links: { label: string; method: string; href: string; external: boolean }[];
};

function compose(c: ContactInput): Draft {
  const subject = `Project enquiry from ${c.name}${c.company ? ` (${c.company})` : ''}`;
  const body = [c.message, '', '—', `Name: ${c.name}`, `Email: ${c.email}`, c.company ? `Company: ${c.company}` : null]
    .filter((l) => l !== null)
    .join('\n');
  const to = encodeURIComponent(CONTACT_EMAIL);
  const su = encodeURIComponent(subject);
  const bo = encodeURIComponent(body);
  return {
    subject,
    body,
    links: [
      { label: 'Gmail', method: 'gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bo}`, external: true },
      {
        label: 'Outlook',
        method: 'outlook',
        href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bo}`,
        external: true,
      },
      { label: 'Default email app', method: 'mail_app', href: `mailto:${CONTACT_EMAIL}?subject=${su}&body=${bo}`, external: false },
    ],
  };
}

/**
 * No backend: validates the enquiry, then lets the visitor send it from the email
 * service they use (Gmail, Outlook, or their default app), pre-filled to CONTACT_EMAIL.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);

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
    setDraft(compose(input));
    track('contact_form_ready');
    setCopied(false);
    requestAnimationFrame(() => choicesRef.current?.querySelector<HTMLElement>('a')?.focus());
  }

  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
      track('generate_lead', { method: 'copy' });
    } catch {
      setCopied(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={onSubmit}
      onChange={() => draft && setDraft(null)}
      noValidate
      aria-label="Contact Bijasa"
    >
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
        {draft ? (
          <div ref={choicesRef} className="send-with" role="group" aria-label="Send your message with">
            <div className="send-with-l">Your message is ready. Send it with:</div>
            <div className="send-with-opts">
              {draft.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="btn"
                  data-track="generate_lead"
                  data-track-method={l.method}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.label}
                </a>
              ))}
              <button type="button" className="btn btn-ghost" onClick={copy}>
                {copied ? 'Copied ✓' : 'Copy message'}
              </button>
            </div>
            <p className="form-status">
              It opens a draft addressed to {CONTACT_EMAIL} with everything filled in. Just press send.
            </p>
          </div>
        ) : (
          <>
            <button type="submit" className="btn">
              Send message
            </button>
            <p className="form-status">You&rsquo;ll pick Gmail, Outlook or your email app next.</p>
          </>
        )}
      </div>
    </form>
  );
}
