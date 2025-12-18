"use client"

import React from "react"
import Link from "next/link"
import { HomeIcon, MailIcon, FileTextIcon, BriefcaseIcon, BookOpenIcon, Github, Linkedin } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"

const Icons = {
  github: Github,
  linkedin: Linkedin,
  email: MailIcon,
}

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: BriefcaseIcon, label: "Projects" },
    { href: "/blog", icon: BookOpenIcon, label: "Blog" },
    { href: "/resume", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourusername",
        icon: Icons.linkedin,
      },
      email: {
        name: "Send Email",
        url: "mailto:edward@email.com",
        icon: Icons.email,
      },
    },
  },
}

export function PortfolioDock() {
  return (
    <Dock direction="middle" className="bg-white/5 border-white/10">
      {DATA.navbar.map((item) => (
        <DockIcon key={item.label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                aria-label={item.label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
              >
                <item.icon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      ))}

      <Separator orientation="vertical" className="h-full bg-white/20" />

      {Object.entries(DATA.contact.social).map(([name, social]) => (
        <DockIcon key={name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={social.url}
                aria-label={social.name}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
              >
                <social.icon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      ))}
    </Dock>
  )
}

