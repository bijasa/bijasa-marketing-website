import { ContentPage } from '@/components/ContentPage';
export default function NotFound() {
  return <ContentPage title="Page not found" eyebrow="Error 404" intro="This address does not point to a page on Bijasa. Explore our work or tell us what you are looking for."><section><h2>Find your next step</h2><p><a href="/">Go to the home page</a> or <a href="/#contact">contact Bijasa</a>.</p></section></ContentPage>;
}
