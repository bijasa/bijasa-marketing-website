import { CookieSettingsLink } from './CookieConsent';
import SocialLinks from './SocialLinks';
import { BSymbol } from './Logo';
export default function SiteFooter() {
 return <footer className="site-footer"><div className="container footer-top"><a className="footer-brand" href="/" aria-label="Bijasa home"><BSymbol ink="#ffffff"/><span>bijasa<span className="brand-dot">.</span></span></a><p>Software for Indian shops, garages and small businesses. Deep roots, long reach.</p><SocialLinks/></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Bijasa</span><div><a href="/services/">Services</a><a href="/work/">Products</a><a href="/tools/">Free tools</a><a href="/privacy/">Privacy</a><CookieSettingsLink/></div><a href="mailto:hello@bijasa.com">hello@bijasa.com</a></div></footer>;
}
