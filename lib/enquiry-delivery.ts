import type { ContactInput } from './contact';
/** Static sites need a separately hosted endpoint. No credentials belong here. */
export function enquiryConfig(hostname: string) {
 const local = ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
 if(local) return { mode: 'mock' as const, endpoint: 'http://127.0.0.1:3401/enquiries' };
 const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? '';
 // Both fields require a deliberate rebuild after approval. No production default.
 if(process.env.NEXT_PUBLIC_ENQUIRY_ENABLED === 'true' && endpoint.startsWith('https://')) return { mode: 'live' as const, endpoint };
 return { mode: 'disabled' as const, endpoint: '' };
}
export async function deliverEnquiry(input: ContactInput, config: ReturnType<typeof enquiryConfig>) {
 if(config.mode === 'disabled') throw new Error('Direct submission is not configured. Please use one of the email options below.');
 const response = await fetch(config.endpoint, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(input), credentials:'omit', referrerPolicy:'no-referrer', signal:AbortSignal.timeout(12000) });
 if(!response.ok) throw new Error(response.status === 429 ? 'Too many attempts. Please wait a minute or use email.' : 'Your enquiry could not be accepted. Please try again or use email.');
 const receipt: unknown = await response.json();
 if(!receipt || typeof receipt !== 'object' || !('accepted' in receipt) || receipt.accepted !== true || (config.mode === 'mock' && !('mock' in receipt && receipt.mock === true))) throw new Error('The service did not confirm acceptance. Please use email or try again.');
 return config.mode;
}
