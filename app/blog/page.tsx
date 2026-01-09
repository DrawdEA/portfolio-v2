import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'
import { LightRays } from '@/components/ui/light-rays'
import { ImageWithFallback } from '@/components/image-with-fallback'
import { AnimatedPageContent } from '@/components/animated-page-content'
import { AnimatedPageHeader } from '@/components/animated-page-header'
import { AnimatedContentItem } from '@/components/animated-content-item'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog | Edward Diesta",
  description: "Blog posts and articles by Edward Diesta",
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <LightRays color="#07152E" length="50vh" speed={4} count={5} />
      </div>
      <AnimatedPageContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-16 py-24 relative z-10">
          <AnimatedPageHeader
            title="Blog"
            description="Thoughts, tutorials, and insights"
          />

          {posts.length === 0 ? (
            <AnimatedContentItem>
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            </AnimatedContentItem>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <AnimatedContentItem key={post.slug} index={index}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
                  >
                <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {post.readTime && (
                        <p className="text-sm text-gray-500">
                          {post.readTime} min read
                        </p>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#1e3a8a] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 order-1 sm:order-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/25 border-0 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 text-gray-300 hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="inline-flex items-center gap-1 text-sm text-[#1e3a8a] group-hover:text-[#1e3a8a] transition-colors order-2 sm:order-1">
                      Read more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                </Link>
                </AnimatedContentItem>
              ))}
            </div>
          )}
        </div>
      </AnimatedPageContent>
    </div>
  )
}

