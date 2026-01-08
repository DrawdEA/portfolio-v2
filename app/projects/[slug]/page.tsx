import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { getProject, getProjects } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/image-with-fallback'
import { AnimatedPageContent } from '@/components/animated-page-content'
import { AnimatedContentItem } from '@/components/animated-content-item'
import type { Metadata } from 'next'

export const dynamicParams = true

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: "Projects | Edward Diesta",
    }
  }

  return {
    title: `${project.title} | Projects | Edward Diesta`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatedPageContent>
        <article className="max-w-4xl mx-auto px-4 sm:px-16 py-24">
          <AnimatedContentItem index={0}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1e3a8a] transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </AnimatedContentItem>

          <AnimatedContentItem index={1}>
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </AnimatedContentItem>

          <AnimatedContentItem index={2}>
            <header className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-medium text-white">
                  {project.title}
                </h1>
                <div className="flex items-center gap-3 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1e3a8a] transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1e3a8a] transition-colors"
                      aria-label="View live site"
                    >
                      <ExternalLink className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <p className="text-gray-400">
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {project.readTime && (
                  <p className="text-gray-400">
                    {project.readTime} min read
                  </p>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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
              {project.description && (
                <p className="text-xl text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              )}
            </header>
          </AnimatedContentItem>

          <AnimatedContentItem index={3}>
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: project.contentHtml || '' }}
            />
          </AnimatedContentItem>
        </article>
      </AnimatedPageContent>
    </div>
  )
}

