/** Blog posts, newest first. Each post has its own page under app/blog/<slug>/. */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, used for datePublished and display
  author: { name: string; role: string };
  readMinutes: number;
  image: string;
};

export const HETAL = { name: 'Hetal Pawar', role: 'Founder, Bijasa' };

export const posts: Post[] = [
  {
    slug: 'how-we-build',
    title: 'Most software fails before the first line of code. Here is how we build instead.',
    description: 'Why software projects go wrong early, the six rules Bijasa follows on every project, and seven questions to ask any software team before you hire them.',
    date: '2026-11-22',
    author: HETAL,
    readMinutes: 7,
    image: '/og-how-we-build.png',
  },
];

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00+05:30').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}
