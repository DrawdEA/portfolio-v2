import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getBlogPost, getBlogPosts } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/image-with-fallback'
import { AnimatedPageContent } from '@/components/animated-page-content'
import { AnimatedContentItem } from '@/components/animated-content-item'
import { LightRays } from '@/components/ui/light-rays'
import type { Metadata } from 'next'

export const dynamicParams = true

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Blog | Edward Diesta",
    }
  }

  return {
    title: `${post.title} | Blog | Edward Diesta`,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}) {
  const { slug } = await params
  const { from } = await searchParams
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Determine back link based on where user came from
  let backHref = '/blog'
  let backText = 'Back to blog'
  
  if (from === 'home') {
    backHref = '/#about'
    backText = 'Back to home'
  } else if (from === 'home-blog') {
    backHref = '/#blog'
    backText = 'Back to home'
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <LightRays color="#07152E" length="50vh" speed={4} count={5} />
      </div>
      <AnimatedPageContent>
        <article className="max-w-4xl mx-auto px-4 sm:px-16 py-24 relative z-10">
          <AnimatedContentItem index={0}>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1e3a8a] transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </Link>
          </AnimatedContentItem>

          <AnimatedContentItem index={1}>
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </AnimatedContentItem>

          <AnimatedContentItem index={2}>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <p className="text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {post.readTime && (
                  <p className="text-gray-400">
                    {post.readTime} min read
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {post.description && (
                <p className="text-xl text-gray-300 leading-relaxed">
                  {post.description}
                </p>
              )}
            </header>
          </AnimatedContentItem>

          <AnimatedContentItem index={3}>
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </AnimatedContentItem>
        </article>
      </AnimatedPageContent>
    </div>
  )
}

