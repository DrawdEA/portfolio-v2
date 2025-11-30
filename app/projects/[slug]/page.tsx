import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/content';
import Link from 'next/link';
import { MDXContent } from '@/app/components/blog/mdx-content-simple';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.excerpt || project.title,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <article>
        {project.image && (
          <div className="aspect-video bg-secondary rounded-lg mb-8 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
          {project.date && (
            <span>{new Date(project.date).toLocaleDateString()}</span>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent content={project.content} />
        </div>
      </article>
    </div>
  );
}

