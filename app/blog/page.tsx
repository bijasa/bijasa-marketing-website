import { ContentPage } from '@/components/ContentPage';
import { searchMetadata } from '@/lib/search-metadata';
import { posts, formatDate } from '@/lib/blog';

export const metadata = searchMetadata('Blog: How We Build Software',
  'Notes from Bijasa on building software that lasts: how we approach problems, decide the hard things early and work with the people who use what we build.', '/blog/');

export default function Blog() {
  return <ContentPage title="Notes from the roots." eyebrow="Blog"
    intro="How we think about building software: the decisions underneath the screens, and what we learn from the products we run ourselves.">
    {posts.map(p => <section key={p.slug}>
      <p className="article-meta"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readMinutes} min read · {p.author.name}</p>
      <h2><a href={`/blog/${p.slug}/`}>{p.title}</a></h2>
      <p>{p.description}</p>
      <p><a href={`/blog/${p.slug}/`}>Read the article →</a></p>
    </section>)}
  </ContentPage>;
}
