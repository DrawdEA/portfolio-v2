"use client"

import React from "react"
import Link from "next/link"
import { HomeIcon, BriefcaseIcon, BookOpenIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: BriefcaseIcon, label: "Projects" },
    { href: "/blog", icon: BookOpenIcon, label: "Blog" },
  ],
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
    </Dock>
  )
}

