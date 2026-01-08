import Link from 'next/link'
import { ArrowRight, Github, ExternalLink, ArrowLeft } from 'lucide-react'
import { getProjects } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'
import { LightRays } from '@/components/ui/light-rays'
import { ImageWithFallback } from '@/components/image-with-fallback'

export default function ProjectsPage() {
  const projects = getProjects()

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
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">Projects</h1>
          <p className="text-gray-400 text-lg">A collection of my work</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="flex flex-col sm:flex-row gap-6 group"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex flex-col sm:flex-row gap-6 flex-1 cursor-pointer"
                >
                  <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#4A7BC8] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {new Date(project.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {project.readTime && (
                          <p className="text-sm text-gray-500">
                            {project.readTime} min read
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                        View project
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/25 border-0 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 text-gray-300 hover:text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-4 shrink-0 sm:flex-col sm:justify-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#4A7BC8] transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#4A7BC8] transition-colors"
                      aria-label="View live site"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

