import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTechStack } from '@/lib/markdown'
import { LightRays } from '@/components/ui/light-rays'
import { TechIcon } from '@/components/tech-icon'

export default function TechStackPage() {
  const techStack = getTechStack()

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
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">
            {techStack?.title || 'Tech Stack'}
          </h1>
          <p className="text-gray-400 text-lg">
            {techStack?.description || 'Technologies and tools I work with'}
          </p>
        </div>

        {techStack && techStack.categories.length > 0 ? (
          <div className="space-y-12">
            {techStack.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {category.name}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/25 border-0 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 group"
                    >
                      {tech.icon && (
                        <TechIcon
                          src={`https://cdn.simpleicons.org/${tech.icon}`}
                          alt={tech.name}
                        />
                      )}
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No technologies listed yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

