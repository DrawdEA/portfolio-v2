import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PortfolioDock } from "@/components/portfolio-dock";
import { Timeline } from "@/components/ui/timeline";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SpotifyBentoCard } from "@/components/spotify-bento-card";
import { StravaBentoCard } from "@/components/strava-bento-card";
import { GitHubStatsBentoCard } from "@/components/github-stats-bento-card";
import { TechStackIconCloudBentoCard } from "@/components/tech-stack-icon-cloud-bento-card";
import { InteractiveReactionCounter } from "@/components/interactive-reaction-counter";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  FileText,
  Code,
  ArrowDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans">
      {/* Hero Section */}
      <main className="flex min-h-screen w-full max-w-6xl mx-auto flex-col items-center justify-center py-32 px-4 sm:px-16 bg-black sm:items-start relative">
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
      <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
        <div className="space-y-4">
          <div className="flex justify-center md:justify-start">
            <Badge variant="outline" className="border-[#4A7BC8]/30 bg-[#4A7BC8]/10 text-[#4A7BC8]/80 text-xs px-3 py-1">
              About Me
            </Badge>
          </div>

          <BentoGrid className="md:grid-cols-3 auto-rows-[11rem]">
            <GitHubStatsBentoCard className="col-span-3 md:col-span-1 row-span-2" />
            <TechStackIconCloudBentoCard className="col-span-3 md:col-span-1 row-span-2" />
            <div className="col-span-3 md:col-span-1 row-span-2 flex flex-col gap-4">
              <SpotifyBentoCard className="flex-1" />
              <StravaBentoCard className="flex-1" />
            </div>
            <BentoCard
              name="Work Experience"
              className="col-span-3 md:col-span-1"
              description="My professional journey and career progression"
              href="#experience"
              cta=""
              buttonIcon={ArrowDown}
              centerButton={true}
              largeButton={true}
              background={<div />}
            />
            <InteractiveReactionCounter className="col-span-3 md:col-span-2" />
            <BentoCard
              name="Org Work"
              className="col-span-3 md:col-span-1"
              description="Contributions to open source projects"
              href="/opensource"
              cta="Explore"
              Icon={Code}
              background={<div />}
            />
            <BentoCard
              name="Hackathons"
              className="col-span-3 md:col-span-1"
              description="Competitions and hackathon projects"
              href="/hackathons"
              cta="View projects"
              Icon={Code}
              background={<div />}
            />
            <BentoCard
              name="Speaking"
              className="col-span-3 md:col-span-1"
              description="Talks, presentations, and conferences"
              href="/speaking"
              cta="Watch talks"
              Icon={Code}
              background={<div />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
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
      <section id="projects" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="border-[#4A7BC8]/50 bg-[#4A7BC8]/20 text-[#4A7BC8] text-xs px-3 py-1">
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
              <Link href="/projects">
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                >
                  View all projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
      <section id="blog" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="border-[#4A7BC8]/50 bg-[#4A7BC8]/20 text-[#4A7BC8] text-xs px-3 py-1">
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
              <Link href="/blog">
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                >
                  View all posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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

      <Separator className="bg-white/10" />

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Edward. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:edward@email.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
      
      {/* Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <PortfolioDock />
      </div>
    </div>
  );
}
