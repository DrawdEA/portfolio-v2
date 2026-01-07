import Link from "next/link";
import { Github, Linkedin, Instagram, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FooterEmailCopy } from "@/components/footer-email-copy";

export function Footer() {
  return (
    <>
      <Separator className="bg-white/10" />
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-12 bg-transparent">
      {/* Layer 1: Name/Description on left, Navigation links on right */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-8">
        {/* Left - Personal Information */}
        <div className="flex-1">
          <h2 className="text-2xl font-medium text-gray-300 mb-2">Edward</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            A software engineer who thrives<br />
            on learning and building.
          </p>
        </div>
        
        {/* Right - Navigation Links and Social Icons */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              Blog
            </Link>
            <Link href="/resume" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              Resume
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DrawdEA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/edwarddiesta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/edward.diesta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="/resume"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Resume"
            >
              <FileText className="h-5 w-5" />
            </a>
            <FooterEmailCopy email="edwardjoshua.diesta@gmail.com" />
          </div>
        </div>
      </div>
      
      {/* Layer 2: Copyright and last updated on same line */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Edward. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Last updated by Edward on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} UTC
        </p>
      </div>
    </footer>
    </>
  );
}

