import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getBlogPosts } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'
import { LightRays } from '@/components/ui/light-rays'
import { ImageWithFallback } from '@/components/image-with-fallback'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <LightRays color="#07152E" length="50vh" speed={4} count={5} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-16 py-24 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#4A7BC8] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">Blog</h1>
          <p className="text-gray-400 text-lg">Thoughts, tutorials, and insights</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
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
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#4A7BC8] transition-colors">
                        {post.title}
                      </h3>
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
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                      Read more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/25 border-0 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 text-gray-300 hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

