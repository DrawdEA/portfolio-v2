import Link from 'next/link';
import { getAllPosts, getAllProjects } from '@/lib/content';

export default function Home() {
  const allPosts = getAllPosts();
  // Show latest posts (both blog and talks) - max 6 total
  const latestPosts = allPosts.slice(0, 6);
  const projects = getAllProjects().slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I'm Edward
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Welcome to my portfolio. Here you'll find my work, thoughts, and
          experiences.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                {project.excerpt && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.excerpt}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/projects"
              className="text-primary hover:underline"
            >
              View all projects →
            </Link>
          </div>
        </section>
      )}

      {/* Latest Blog Posts & Talks */}
      {latestPosts.length > 0 && (
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">Latest Blog Posts & Talks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  {post.type === 'talk' && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      Talk
                    </span>
                  )}
                </div>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm mb-2">
                    {post.excerpt}
                  </p>
                )}
                {post.date && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-primary hover:underline"
            >
              View all posts →
            </Link>
          </div>
        </section>
      )}

      {/* Skills/Technologies */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-secondary rounded-full text-sm">
            React
          </span>
          <span className="px-4 py-2 bg-secondary rounded-full text-sm">
            Next.js
          </span>
          <span className="px-4 py-2 bg-secondary rounded-full text-sm">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-secondary rounded-full text-sm">
            Tailwind CSS
          </span>
        </div>
      </section>
    </div>
  );
}
