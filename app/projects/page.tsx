import Link from 'next/link';
import { getAllProjects } from '@/lib/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Edward',
  description: 'Check out my projects and work',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Projects</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        A collection of projects I've worked on. Each project represents a
        unique challenge and learning experience.
      </p>

      {projects.length === 0 ? (
        <p className="text-lg">No projects yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="border rounded-lg p-6 hover:border-primary transition-colors group"
            >
              {project.image && (
                <div className="aspect-video bg-secondary rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h2>
              {project.excerpt && (
                <p className="text-muted-foreground text-sm mb-4">
                  {project.excerpt}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-4 text-sm">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

