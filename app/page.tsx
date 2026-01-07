import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { SpotifyBentoCard } from "@/components/spotify-bento-card";
import { StravaBentoCard } from "@/components/strava-bento-card";
import { GitHubStatsBentoCard } from "@/components/github-stats-bento-card";
import { TechStackIconCloudBentoCard } from "@/components/tech-stack-icon-cloud-bento-card";
import { InteractiveReactionCounter } from "@/components/interactive-reaction-counter";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getBlogPosts, getProjects } from "@/lib/markdown";
import { 
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  FileText,
  ArrowDown,
  Briefcase,
  Users,
  Trophy,
  Mic,
  BookOpen
} from "lucide-react";
import { LightRays } from "@/components/ui/light-rays";

// Revalidate every 60 seconds to ensure fresh content
export const revalidate = 60;

export default function Home() {
  const posts = getBlogPosts();
  const projects = getProjects();
  // Get the latest (first item after sorting by date descending)
  const latestPost = posts.length > 0 ? posts[0] : null;
  const latestProject = projects.length > 0 ? projects[0] : null;
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <LightRays color="#07152E" length="90vh" speed={4} count={5} />
      </div>
      {/* Hero Section */}
      <main className="flex min-h-screen w-full max-w-6xl mx-auto flex-col items-center justify-center py-32 px-4 sm:px-16 bg-transparent sm:items-start relative z-10">
        <section className="text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Hello, I&apos;m Edward.<br />A software engineer.</h1>
          <p className="text-md md:text-lg text-gray-400 mb-8">Currently working on lots of things.</p>
          <div className="flex gap-4 mt-6">
            {/* GitHub */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <Github className="h-6 w-6" />
              </Button>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <Linkedin className="h-6 w-6" />
              </Button>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <Instagram className="h-6 w-6" />
              </Button>
            </a>
            {/* CV */}
            <a
              href="/edward_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CV"
            >
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <FileText className="h-6 w-6" />
              </Button>
            </a>
            {/* Contact Me */}
            <Link href="/contact" aria-label="Contact Me">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <Mail className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* General Information / About Section */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
        <div className="space-y-4">
          <div className="flex justify-center md:justify-start">
            <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
              About Me
            </Badge>
          </div>

          <BentoGrid className="md:grid-cols-3 auto-rows-[11rem]">
            {latestProject ? (
              <BentoCard
                name={latestProject.title}
                className="col-span-3 relative"
                description={latestProject.description}
                href={`/projects/${latestProject.slug}`}
                cta="View project"
                Icon={Briefcase}
                background={
                  <>
                    {latestProject.image ? (
                      <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                        <ImageWithFallback
                          src={latestProject.image}
                          alt={latestProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-40 transition-opacity" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                    <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                      <Link
                        href="/projects"
                        className="text-xs text-neutral-400 hover:text-black transition-colors inline-flex items-center"
                      >
                        View all projects
                        <ArrowRight className="ms-1.5 h-3 w-3" />
                      </Link>
                    </div>
                  </>
                }
              />
            ) : (
              <BentoCard
                name="Featured Project"
                className="col-span-3 relative"
                description="A showcase of my latest and greatest work"
                href="/projects"
                cta="View projects"
                Icon={Briefcase}
                background={
                  <>
                    <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                      <Image
                        src="https://picsum.photos/1200/400?random=1"
                        alt="Featured project background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                    <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                      <Link
                        href="/projects"
                        className="text-xs text-neutral-400 hover:text-black transition-colors inline-flex items-center"
                      >
                        View all projects
                        <ArrowRight className="ms-1.5 h-3 w-3" />
                      </Link>
                    </div>
                  </>
                }
              />
            )}
            <GitHubStatsBentoCard className="col-span-3 md:col-span-1 row-span-2" />
            <TechStackIconCloudBentoCard className="col-span-3 md:col-span-1 row-span-2" />
            <div className="col-span-3 md:col-span-1 row-span-2 flex flex-col gap-4">
              <SpotifyBentoCard className="flex-1" />
              <StravaBentoCard className="flex-1" />
            </div>
            <BentoCard
              name="Work Experience"
              className="col-span-3 md:col-span-1"
              description="My professional journey"
              href="#experience"
              cta=""
              buttonIcon={ArrowDown}
              centerButton={true}
              largeButton={true}
              Icon={Briefcase}
              background={
                <>
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                    <Image
                      src="/work.jpg"
                      alt="Work Experience background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                </>
              }
            />
            {latestPost ? (
              <BentoCard
                name={latestPost.title}
                className="col-span-3 md:col-span-2 relative"
                description={latestPost.description}
                href={`/blog/${latestPost.slug}`}
                cta="Read article"
                Icon={BookOpen}
                background={
                  <>
                    {latestPost.image ? (
                      <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                        <ImageWithFallback
                          src={latestPost.image}
                          alt={latestPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-40 transition-opacity" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                    <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                      <Link
                        href="/blog"
                        className="text-xs text-neutral-400 hover:text-black transition-colors inline-flex items-center"
                      >
                        View all blogs
                        <ArrowRight className="ms-1.5 h-3 w-3" />
                      </Link>
                    </div>
                  </>
                }
              />
            ) : (
              <BentoCard
                name="Featured Blog"
                className="col-span-3 md:col-span-2 relative"
                description="Latest thoughts and insights on web development"
                href="/blog"
                cta="Read articles"
                Icon={BookOpen}
                background={
                  <>
                    <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                      <Image
                        src="https://picsum.photos/800/400?random=1"
                        alt="Featured blog background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                    <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                      <Link
                        href="/blog"
                        className="text-xs text-neutral-400 hover:text-black transition-colors inline-flex items-center"
                      >
                        View all blogs
                        <ArrowRight className="ms-1.5 h-3 w-3" />
                      </Link>
                    </div>
                  </>
                }
              />
            )}
            <BentoCard
              name="Org Work"
              className="col-span-3 md:col-span-1"
              description="Contributions to open source projects"
              href="/opensource"
              cta="Explore"
              Icon={Users}
              background={
                <>
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                    <Image
                      src="/org.png"
                      alt="Org Work background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                </>
              }
            />
            <BentoCard
              name="Hackathons"
              className="col-span-3 md:col-span-1"
              description="Competitions and hackathon projects"
              href="/hackathons"
              cta="View projects"
              Icon={Trophy}
              background={
                <>
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                    <Image
                      src="/hackathon.jpg"
                      alt="Hackathons background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                </>
              }
            />
            <BentoCard
              name="Speaking"
              className="col-span-3 md:col-span-1"
              description="Talks, presentations, and conferences"
              href="/speaking"
              cta="Watch talks"
              Icon={Mic}
              background={
                <>
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                    <Image
                      src="/speaking.jpg"
                      alt="Speaking background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                </>
              }
            />
          </BentoGrid>
          
          {/* Small reaction counter at bottom right */}
          <div className="relative">
            <div className="flex justify-end">
              <InteractiveReactionCounter className="w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
                Work Experience
              </Badge>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-center md:text-left">
                My Professional Journey
              </h2>
              <p className="text-gray-400 text-center md:text-left max-w-2xl">
                A timeline of my career progression, showcasing the companies I&apos;ve worked with, 
                the projects I&apos;ve contributed to, and the technologies I&apos;ve mastered along the way.
              </p>
            </div>
          </div>

          <Timeline
            items={[
              {
                title: "Senior Software Engineer",
                company: "Company Name",
                location: "Location",
                period: "2022 - Present",
                description:
                  "Leading development of scalable web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality products.",
                technologies: ["React", "TypeScript", "Next.js", "Node.js"],
              },
              {
                title: "Software Engineer",
                company: "Previous Company",
                location: "Location",
                period: "2020 - 2022",
                description:
                  "Developed and maintained web applications, worked on improving performance and user experience, and mentored junior developers.",
                technologies: ["JavaScript", "Vue.js", "Python"],
              },
            ]}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
                Projects
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-4 flex-1">
                <h2 className="text-3xl md:text-4xl font-medium text-center md:text-left">
                  Featured Projects
                </h2>
                <p className="text-gray-400 text-center md:text-left max-w-2xl">
                  A collection of projects I&apos;ve built, showcasing my skills in web development, 
                  design, and problem-solving.
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

          <div className="space-y-8">
            {/* Project 1 */}
            <Link 
              href="/projects/project-slug" 
              className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
            >
              <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="https://picsum.photos/400/400?random=3"
                  alt="Project Name"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#4A7BC8] transition-colors">
                      Project Title
                    </h3>
                    <p className="text-sm text-gray-400">December 15, 2024 • 5 min read</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    A brief description of the project, highlighting key features and technologies used 
                    in the development process.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                    Read more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">react</span>
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">css</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Project 2 */}
            <Link 
              href="/projects/project-slug" 
              className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
            >
              <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="https://picsum.photos/400/400?random=4"
                  alt="Project Name"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#4A7BC8] transition-colors">
                      Project Title
                    </h3>
                    <p className="text-sm text-gray-400">December 10, 2024 • 3 min read</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    A brief description of the project, highlighting key features and technologies used 
                    in the development process.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                    Read more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">nextjs</span>
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">typescript</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Project 3 */}
            <Link 
              href="/projects/project-slug" 
              className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
            >
              <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="https://picsum.photos/400/400?random=5"
                  alt="Project Name"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#4A7BC8] transition-colors">
                      Project Title
                    </h3>
                    <p className="text-sm text-gray-400">December 5, 2024 • 4 min read</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    A brief description of the project, highlighting key features and technologies used 
                    in the development process.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                    Read more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">vue</span>
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300">tailwind</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Intro Section */}
      <section id="blog" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
                Blog
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-4 flex-1">
                <h2 className="text-3xl md:text-4xl font-medium text-center md:text-left">
                  Latest Articles
                </h2>
                <p className="text-gray-400 text-center md:text-left max-w-2xl">
                  Explore my thoughts on web development, best practices, and the latest technologies 
                  I&apos;ve been working with.
                </p>
              </div>
              <Link href="/blog" className="inline-block">
                <InteractiveHoverButton
                  className="bg-transparent border-white/20 text-white [&>div>div:first-child]:bg-white [&>div>div:last-child]:text-black"
                >
                  View all posts
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog Post 1 */}
            <Link 
              href="/blog/post-slug" 
              className="block space-y-4 group cursor-pointer"
            >
              <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/800/400?random=1"
                  alt="Building Modern Web Apps with Next.js"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-400">December 20, 2024 • 8 min read</p>
                <h3 className="text-xl font-medium text-white group-hover:text-[#4A7BC8] transition-colors">
                  Building Modern Web Apps with Next.js
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A comprehensive guide to building scalable applications with Next.js 14, 
                  covering server components, routing, and performance optimization.
                </p>
                <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                  Read more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Blog Post 2 */}
            <Link 
              href="/blog/post-slug" 
              className="block space-y-4 group cursor-pointer"
            >
              <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/800/400?random=2"
                  alt="TypeScript Best Practices"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-400">December 12, 2024 • 6 min read</p>
                <h3 className="text-xl font-medium text-white group-hover:text-[#4A7BC8] transition-colors">
                  TypeScript Best Practices
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Tips and tricks for writing better TypeScript code, including type safety, 
                  generics, and advanced patterns for modern development.
                </p>
                <div className="inline-flex items-center gap-1 text-sm text-[#4A7BC8] group-hover:text-[#27508F] transition-colors">
                  Read more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
