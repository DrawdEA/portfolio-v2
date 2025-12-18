import { LightRays } from "@/components/ui/light-rays";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PortfolioDock } from "@/components/portfolio-dock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  BookOpen, 
  ArrowRight,
  Code,
  Coffee,
  Music,
  Heart,
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
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">About Me</h2>
            <p className="text-lg text-gray-400 max-w-3xl">
              I&apos;m a software engineer passionate about building meaningful digital experiences. 
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, 
              or enjoying a good cup of coffee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <Code className="h-8 w-8 mb-2 text-gray-400" />
                <CardTitle className="text-lg">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  React, Next.js, TypeScript, Node.js, and more
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <Coffee className="h-8 w-8 mb-2 text-gray-400" />
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Web development, UI/UX design, and continuous learning
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <Music className="h-8 w-8 mb-2 text-gray-400" />
                <CardTitle className="text-lg">Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Music, gaming, reading, and exploring new places
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <Heart className="h-8 w-8 mb-2 text-gray-400" />
                <CardTitle className="text-lg">Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Clean code, user-centric design, and collaboration
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Work Experience</h2>
            <p className="text-lg text-gray-400">
              A journey through my professional career
            </p>
          </div>

          <div className="space-y-8">
            {/* Experience Item 1 */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">Senior Software Engineer</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                      <Briefcase className="h-4 w-4" />
                      Company Name
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4" />
                      Location
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>2022 - Present</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Leading development of scalable web applications using modern technologies. 
                  Collaborating with cross-functional teams to deliver high-quality products.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-white/20">React</Badge>
                  <Badge variant="outline" className="border-white/20">TypeScript</Badge>
                  <Badge variant="outline" className="border-white/20">Next.js</Badge>
                  <Badge variant="outline" className="border-white/20">Node.js</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Experience Item 2 */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">Software Engineer</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                      <Briefcase className="h-4 w-4" />
                      Previous Company
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4" />
                      Location
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>2020 - 2022</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Developed and maintained web applications, worked on improving performance 
                  and user experience, and mentored junior developers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-white/20">JavaScript</Badge>
                  <Badge variant="outline" className="border-white/20">Vue.js</Badge>
                  <Badge variant="outline" className="border-white/20">Python</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Intro Section */}
      <section id="blog" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Blog</h2>
            <p className="text-lg text-gray-400 max-w-3xl">
              Thoughts, tutorials, and insights about software development, 
              technology trends, and my journey as a developer.
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-gray-400" />
                <CardTitle className="text-xl">Latest Posts</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Check out my latest articles and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Blog Post Preview 1 */}
                <div className="flex items-start justify-between gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">Building Modern Web Apps with Next.js</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      A comprehensive guide to building scalable applications with Next.js 14...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>March 15, 2024</span>
                    </div>
                  </div>
                  <Link href="/blog/post-slug">
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <Separator className="bg-white/10" />

                {/* Blog Post Preview 2 */}
                <div className="flex items-start justify-between gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">TypeScript Best Practices</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Tips and tricks for writing better TypeScript code...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>February 28, 2024</span>
                    </div>
                  </div>
                  <Link href="/blog/post-slug">
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/blog">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-white/20 hover:bg-white/10"
                  >
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
