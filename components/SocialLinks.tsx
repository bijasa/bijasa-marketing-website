import { socialProfiles } from '@/lib/social';
export default function SocialLinks() {
  return <div className="social-links" aria-label="Official social profiles">{socialProfiles.filter(p => p.url).map(p => <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.label}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d={p.path}/></svg><span>{p.label.replace(/^Bijasa on /, '')} ↗</span></a>)}</div>;
}
