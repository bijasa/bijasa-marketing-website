import { CookieSettingsLink } from './CookieConsent';
import SocialLinks from './SocialLinks';
import { BSymbol } from './Logo';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/lib/content';
export default function SiteFooter() {
 return <footer className="site-footer">
  <div className="container footer-top">
   <a className="footer-brand" href="/" aria-label="Bijasa home"><BSymbol ink="#f3eee5"/><span>bijasa<span className="brand-dot">.</span></span></a>
   <p className="footer-line">Deep roots. Long reach.<br/><span>Custom software, built from the roots up.</span></p>
  </div>
  <div className="container footer-mid">
   <div><h2>Company</h2><a href="/#philosophy">Philosophy</a><a href="/#sectors">Sectors</a><a href="/#process">How we work</a></div>
   <div><h2>Work</h2><a href="/services/">Services</a><a href="/products/">Products</a><a href="/work/">Case studies</a><a href="/tools/">Free tools</a></div>
   <div><h2>Contact</h2><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a><SocialLinks/></div>
  </div>
  <div className="container footer-bottom"><span>© {new Date().getFullYear()} Bijasa</span><div><a href="/privacy/">Privacy</a><CookieSettingsLink/></div></div>
 </footer>;
}
