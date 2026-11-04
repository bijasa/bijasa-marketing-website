import { CookieSettingsLink } from './CookieConsent';
import SocialLinks from './SocialLinks';
export default function SiteFooter() {
 return <footer className="site-footer"><div className="container footer-top"><a className="footer-wordmark" href="/">bijasa<span>.</span></a><p>Deep roots.<br/>Long reach.</p><SocialLinks/></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Bijasa</span><div><a href="/services/">Services</a><a href="/work/">Our work</a><a href="/tools/">Free tools</a><a href="/privacy/">Privacy</a><CookieSettingsLink/></div><span>Software, thoughtfully engineered.</span></div></footer>;
}
