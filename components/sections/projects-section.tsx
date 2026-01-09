import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Project } from "@/lib/markdown";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-start">
            <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
              Projects
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-4 flex-1">
              <h2 className="text-3xl md:text-4xl font-medium text-left">
                Latest Projects
              </h2>
              <p className="text-gray-400 text-left max-w-2xl">
                A collection of projects I&apos;ve built so far.
              </p>
            </div>
            <Link href="/projects" className="inline-block">
              <InteractiveHoverButton
                className="bg-transparent border-white/20 text-white [&>div>div:first-child]:bg-white [&>div>div:last-child]:text-black"
              >
                View all projects
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.slice(0, 3).map((project) => (
              <Link 
                key={project.slug}
                href={`/projects/${project.slug}`} 
                className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
              >
                <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#1e3a8a] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 order-1 sm:order-2">
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
                    <div className="inline-flex items-center gap-1 text-sm text-[#1e3a8a] group-hover:text-[#1e3a8a] transition-colors order-2 sm:order-1">
                      View project
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

