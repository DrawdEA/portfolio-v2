import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Edward',
  description: 'Read my latest blog posts and talks about development, technology, and more',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const blogPosts = posts.filter((post) => !post.type || post.type === 'blog');
  const talks = posts.filter((post) => post.type === 'talk');

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog & Talks</h1>
      <p className="text-lg text-muted-foreground mb-8">
        A collection of my blog posts and speaking engagements.
      </p>

      {posts.length === 0 ? (
        <p className="text-lg">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.type === 'talk' && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        Talk
                      </span>
                    )}
                  </div>
                  {post.event && (
                    <p className="text-muted-foreground mb-2">{post.event}</p>
                  )}
                  {post.date && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString()}
                      {post.location && ` • ${post.location}`}
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  )}
                  <div className="flex gap-4">
                    {post.slides && (
                      <a
                        href={post.slides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Slides
                      </a>
                    )}
                    {post.video && (
                      <a
                        href={post.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

