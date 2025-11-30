import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/content';
import Link from 'next/link';
import { CommentList } from '@/app/components/comments/comment-list';
import { CommentForm } from '@/app/components/comments/comment-form';
import { MDXContent } from '@/app/components/blog/mdx-content-simple';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Edward's Blog`,
    description: post.excerpt || post.title,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.type === 'talk' && (
          <div className="mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Talk
            </span>
          </div>
        )}
        <div className="space-y-2 mb-8 text-muted-foreground">
          {post.event && (
            <p className="text-lg">
              <span className="font-semibold">Event:</span> {post.event}
            </p>
          )}
          {post.date && (
            <p className="text-sm">
              <span className="font-semibold">Date:</span>{' '}
              {new Date(post.date).toLocaleDateString()}
              {post.location && ` • ${post.location}`}
            </p>
          )}
        </div>
        {(post.slides || post.video) && (
          <div className="flex gap-4 mb-8">
            {post.slides && (
              <a
                href={post.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
              >
                View Slides
              </a>
            )}
            {post.video && (
              <a
                href={post.video}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Watch Video
              </a>
            )}
          </div>
        )}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent content={post.content} />
        </div>
      </article>

      {/* Comments Section */}
      <div className="mt-16 pt-8 border-t">
        <CommentList postId={params.slug} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
          <CommentForm postId={params.slug} />
        </div>
      </div>
    </div>
  );
}

