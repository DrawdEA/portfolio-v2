import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PortfolioDock } from "@/components/portfolio-dock";
import { CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { Timeline } from "@/components/ui/timeline";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SpotifyCard } from "@/components/spotify-card";
import { 
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  FileText
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
            <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
              About Me
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpotifyCard />
            <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-full min-h-[100px] px-4 py-4">
                  <p className="text-sm text-gray-500">Github Stats</p>
                </div>
              </CardContent>
            </MagicCard>
          </div>

          {/* Second row - 2 placeholder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-full min-h-[100px] px-4 py-4">
                  <p className="text-sm text-gray-500">Tech Stack</p>
                </div>
              </CardContent>
            </MagicCard>
            <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-full min-h-[100px] px-4 py-4">
                  <p className="text-sm text-gray-500">Tech Stack Icon Cloud</p>
                </div>
              </CardContent>
            </MagicCard>
          </div>

          {/* Third row - 1.5x height card */}
          <div className="grid grid-cols-1 gap-4">
            <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-full min-h-[150px] px-4 py-4">
                  <p className="text-sm text-gray-500">Interactive</p>
                </div>
              </CardContent>
            </MagicCard>
          </div>
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
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
                  <div className="inline-flex items-center gap-1 text-sm text-green-400 group-hover:text-green-300 transition-colors">
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
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
                  <div className="inline-flex items-center gap-1 text-sm text-green-400 group-hover:text-green-300 transition-colors">
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
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
                  <div className="inline-flex items-center gap-1 text-sm text-green-400 group-hover:text-green-300 transition-colors">
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
                <p className="text-sm text-gray-400">2024</p>
                <h3 className="text-xl font-medium text-white group-hover:text-green-400 transition-colors">
                  Building Modern Web Apps with Next.js
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A comprehensive guide to building scalable applications with Next.js 14, 
                  covering server components, routing, and performance optimization.
                </p>
                <div className="inline-flex items-center gap-1 text-sm text-green-400 group-hover:text-green-300 transition-colors">
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
                <p className="text-sm text-gray-400">2024</p>
                <h3 className="text-xl font-medium text-white group-hover:text-green-400 transition-colors">
                  TypeScript Best Practices
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Tips and tricks for writing better TypeScript code, including type safety, 
                  generics, and advanced patterns for modern development.
                </p>
                <div className="inline-flex items-center gap-1 text-sm text-green-400 group-hover:text-green-300 transition-colors">
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
