'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { LIMITS, PROJECT_TYPES, BUDGET_RANGES, normalize, validate, type ContactErrors, type ContactInput } from '@/lib/contact';
import { enquiryConfig, deliverEnquiry } from '@/lib/enquiry-delivery';
import { track } from '@/lib/analytics';
import { CONTACT_EMAIL } from '@/lib/content';
type Draft = { subject: string; body: string; links: {label:string; method:string; href:string; external:boolean}[] };
function compose(c:ContactInput):Draft {
 const subject=`Project enquiry from ${c.name}${c.company?` (${c.company})`:''}`;
 const body=[c.message,'',`Name: ${c.name}`,`Email: ${c.email}`,`Company: ${c.company || 'Not specified'}`,`Project type: ${c.projectType}`,`Budget: ${c.budget || 'Not specified'}`].join('\n');
 const to=encodeURIComponent(CONTACT_EMAIL), su=encodeURIComponent(subject), bo=encodeURIComponent(body);
 return { subject,body,links:[{label:'Gmail',method:'gmail',href:`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bo}`,external:true},{label:'Outlook',method:'outlook',href:`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bo}`,external:true},{label:'Email app',method:'mail_app',href:`mailto:${CONTACT_EMAIL}?subject=${su}&body=${bo}`,external:false}] };
}
export default function ContactForm() {
 const [errors,setErrors]=useState<ContactErrors>({}),[draft,setDraft]=useState<Draft|null>(null),[copied,setCopied]=useState(false);
 const [status,setStatus]=useState(''),[busy,setBusy]=useState(false),[sent,setSent]=useState(false);
 const [config,setConfig]=useState<ReturnType<typeof enquiryConfig>>({mode:'disabled',endpoint:''});
 const form=useRef<HTMLFormElement>(null),started=useRef(false),lock=useRef(false),feedback=useRef<HTMLDivElement>(null);
 useEffect(()=>setConfig(enquiryConfig(window.location.hostname)),[]);
 function read():ContactInput|null {
  const input=normalize(Object.fromEntries(new FormData(form.current!).entries())),errs=validate(input);
  setErrors(errs);
  if(Object.keys(errs).length){const key=Object.keys(errs)[0]; form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();return null;}
  return input;
 }
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(lock.current || sent)return;
  const input=read();if(!input)return;
  lock.current=true;setBusy(true);setStatus('');
  try {const mode=await deliverEnquiry(input,config);setSent(true);setStatus(mode==='mock'?'Local test accepted. Nothing was sent to Bijasa or saved.':'Your enquiry was accepted. Thank you — we’ll review it and get back to you.');if(mode==='live')track('generate_lead',{method:'endpoint'});}
  catch(error){setStatus(error instanceof Error && !['TypeError','TimeoutError','AbortError'].includes(error.name) ? error.message : 'Unable to connect or the request timed out. Your enquiry has not been confirmed. Please use email below.');}
  finally{lock.current=false;setBusy(false);requestAnimationFrame(()=>feedback.current?.focus());}
 }
 function prepare(){if(busy)return;const input=read();if(input){setDraft(compose(input));setCopied(false);track('contact_form_ready');}}
 async function copy(){if(!draft)return;try{await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`);setCopied(true);track('contact_handoff',{method:'copy'});}catch{setStatus('Copy is unavailable. Please use an email option or select and copy the message text.');}}
 function error(key:keyof ContactInput){return errors[key]?<span className="field-err" id={`cf-${key}-error`}>{errors[key]}</span>:null;}
 function common(key:keyof ContactInput,required=false){return {id:`cf-${key}`,name:key,required,disabled:busy,'aria-invalid':errors[key]?true:undefined,'aria-describedby':errors[key]?`cf-${key}-error`:undefined};}
 return <form ref={form} className="form" onSubmit={submit} noValidate aria-label="Project enquiry" aria-busy={busy} onChange={()=>{setDraft(null);setSent(false);setStatus('');}} onFocus={()=>{if(!started.current){started.current=true;track('contact_start');}}}>
  <p className="form-mode">{config.mode==='mock'?'Local review mode — submissions go to a local mock only. No email is delivered.':config.mode==='disabled'?'Direct submission is awaiting setup. You can still prepare and send your enquiry with the email options below.':'Send your enquiry securely. Please avoid confidential details in your initial message.'}</p>
  <div className="hp-field" aria-hidden="true"><label htmlFor="cf-website">Leave this empty</label><input id="cf-website" name="website" tabIndex={-1} autoComplete="off"/></div>
  {(['name','email','company'] as const).map(key=><div className={key==='company'?'field full':'field'} key={key}><label htmlFor={`cf-${key}`}>{key==='name'?'Name':key==='email'?'Email':'Company'} {key==='company'&&<span>(optional)</span>}</label><input {...common(key,key!=='company')} type={key==='email'?'email':'text'} autoComplete={key==='name'?'name':key==='email'?'email':'organization'} maxLength={LIMITS[key]}/>{error(key)}</div>)}
  <div className="field"><label htmlFor="cf-projectType">Project type</label><select {...common('projectType',true)} defaultValue=""><option value="" disabled>Select a project type</option>{PROJECT_TYPES.map(t=><option key={t}>{t}</option>)}</select>{error('projectType')}</div>
  <div className="field"><label htmlFor="cf-budget">Budget range <span>(optional)</span></label><select {...common('budget')} defaultValue=""><option value="">Select a range</option>{BUDGET_RANGES.map(t=><option key={t}>{t}</option>)}</select>{error('budget')}</div>
  <div className="field full"><label htmlFor="cf-message">Project description</label><textarea {...common('message',true)} rows={5} maxLength={LIMITS.message} placeholder="What are you building? What would a useful outcome look like?"/>{error('message')}</div>
  <div className="consent-field"><label htmlFor="cf-consent"><input {...common('consent',true)} type="checkbox"/><span>I acknowledge that Bijasa will use these details to respond to my enquiry, as described in the <a href="/privacy/">privacy policy</a>.</span></label>{error('consent')}</div>
  <div className="form-foot"><div ref={feedback} tabIndex={-1} className="form-feedback" role="status" aria-live="polite">{status}</div>{error('website')}
   <button type="submit" className="btn" disabled={busy || sent || config.mode==='disabled'}>{busy?'Submitting…':sent?(config.mode==='mock'?'Local Test Complete ✓':'Enquiry Accepted ✓'):config.mode==='mock'?'Test Local Submission ↗':'Send Enquiry ↗'}</button>
   <p className="form-status">{config.mode==='mock'?'Start the mock with npm run dev:mock to test the full submission flow.':'Your details are used for this conversation, never added to analytics.'}</p>
   <details className="form-alternative" open={config.mode==='disabled'}><summary>Prefer Gmail, Outlook, your email app, or copying a draft?</summary><p className="form-status">Prepare a draft here, then send it using your preferred email service. Preparing a draft does not send it.</p><button className="btn btn-ghost" type="button" onClick={prepare} disabled={busy}>Prepare Email Draft</button>{draft&&<div className="send-with"><div className="send-with-l">Draft ready — choose how to send</div><div className="send-with-opts">{draft.links.map(l=><a className="btn btn-ghost" key={l.method} href={l.href} data-track="contact_handoff" data-track-method={l.method} {...(l.external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{l.label}</a>)}<button className="btn btn-ghost" type="button" onClick={copy}>{copied?'Copied ✓':'Copy message'}</button></div><textarea aria-label="Prepared email message" readOnly value={`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`} rows={7} style={{width:'100%',background:'transparent',color:'inherit',border:'1px solid var(--line)',padding:12}}/><p className="form-status">No enquiry has been submitted by preparing or copying this draft.</p></div>}</details>
  </div>
 </form>;
}
