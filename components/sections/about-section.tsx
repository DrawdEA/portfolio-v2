"use client"

import Link from "next/link";
import Image from "next/image";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { SpotifyBentoCard } from "@/components/spotify-bento-card";
import { StravaBentoCard } from "@/components/strava-bento-card";
import { GitHubStatsBentoCard } from "@/components/github-stats-bento-card";
import { TechStackIconCloudBentoCard } from "@/components/tech-stack-icon-cloud-bento-card";
import { InteractiveReactionCounter } from "@/components/interactive-reaction-counter";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  ArrowRight,
  ArrowDown,
  Briefcase,
  Users,
  Trophy,
  Award,
  BookOpen
} from "lucide-react";

interface AboutSectionProps {
  latestProject: {
    slug: string;
    title: string;
    description: string;
    image?: string;
  } | null;
  latestPost: {
    slug: string;
    title: string;
    description: string;
    image?: string;
  } | null;
  techStackIcons: string[];
}

export function AboutSection({ latestProject, latestPost, techStackIcons }: AboutSectionProps) {
  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
      <div className="space-y-4">
        <div className="flex justify-start">
          <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
            About Me
          </Badge>
        </div>

        <BentoGrid className="md:grid-cols-3 auto-rows-[11rem]">
          {latestProject ? (
            <BentoCard
              name={`Featured • ${latestProject.title}`}
              className="col-span-3 row-span-2 relative"
              description={latestProject.description}
              href={`/projects/${latestProject.slug}?from=home`}
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
                        className="object-cover blur-[2px] group-hover:blur-none transition-all"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(12,20,38)] to-[rgb(8,15,30)] opacity-50 group-hover:opacity-40 transition-opacity" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                  <div className="absolute top-4 right-4 lg:bottom-4 lg:top-auto z-20 pointer-events-auto">
                    <Link
                      href="/projects?from=home"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
                    >
                      View all projects
                      <ArrowRight className="ms-1.5 h-3 w-3 text-current" />
                    </Link>
                  </div>
                </>
              }
            />
          ) : (
            <BentoCard
              name="Featured Project"
              className="col-span-3 row-span-2 relative"
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
                      className="object-cover blur-[2px] group-hover:blur-none transition-all"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                  <div className="absolute top-4 right-4 lg:bottom-4 lg:top-auto z-20 pointer-events-auto">
                    <Link
                      href="/projects?from=home"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
                    >
                      View all projects
                      <ArrowRight className="ms-1.5 h-3 w-3 text-current" />
                    </Link>
                  </div>
                </>
              }
            />
          )}
          <GitHubStatsBentoCard className="col-span-3 md:col-span-1 row-span-2" />
          <TechStackIconCloudBentoCard 
            className="col-span-3 md:col-span-1 row-span-2"
            iconSlugs={techStackIcons}
          />
          <div className="col-span-3 md:col-span-1 row-span-2 flex flex-col gap-4">
            <SpotifyBentoCard className="flex-1" />
            <StravaBentoCard className="flex-1" />
          </div>
          <BentoCard
            name="Work Experience"
            className="col-span-3 md:col-span-1"
            description="My professional journey"
            href="#experience"
            cta="Go down"
            buttonIcon={ArrowDown}
            largeButton={true}
            Icon={Briefcase}
            background={
              <>
                <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                  <Image
                    src="/home/work.jpg"
                    alt="Work Experience background"
                    fill
                    className="object-cover blur-[2px] group-hover:blur-none transition-all"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </>
            }
          />
          {latestPost ? (
            <BentoCard
              name={`Featured • ${latestPost.title}`}
              className="col-span-3 md:col-span-2 relative"
              description={latestPost.description}
              href={`/blog/${latestPost.slug}?from=home`}
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
                        className="object-cover blur-[2px] group-hover:blur-none transition-all"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(12,20,38)] to-[rgb(8,15,30)] opacity-50 group-hover:opacity-40 transition-opacity" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                  <div className="absolute top-4 right-4 lg:bottom-4 lg:top-auto z-20 pointer-events-auto">
                    <Link
                      href="/blog?from=home"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
                    >
                      View all blogs
                      <ArrowRight className="ms-1.5 h-3 w-3 text-current" />
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
                      className="object-cover blur-[2px] group-hover:blur-none transition-all"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                  <div className="absolute top-4 right-4 lg:bottom-4 lg:top-auto z-20 pointer-events-auto">
                    <Link
                      href="/blog?from=home"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
                    >
                      View all blogs
                      <ArrowRight className="ms-1.5 h-3 w-3 text-current" />
                    </Link>
                  </div>
                </>
              }
            />
          )}
          <BentoCard
            name="Organizational Work"
            className="col-span-3 md:col-span-1"
            description="Activities inside Ateneo"
            href="/orgwork"
            cta="Explore"
            Icon={Users}
            background={
              <>
                <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                  <Image
                    src="/home/org.png"
                    alt="Organizational Work background"
                    fill
                    className="object-cover blur-[2px] group-hover:blur-none transition-all"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </>
            }
          />
          <BentoCard
            name="Hackathons, Events"
            className="col-span-3 md:col-span-1"
            description="Hackathons, Case Competitions, Speaking, Presentations"
            href="/hackathons"
            cta="View projects"
            Icon={Trophy}
            background={
              <>
                <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                  <Image
                    src="/home/hackathon.jpg"
                    alt="Hackathons background"
                    fill
                    className="object-cover blur-[2px] group-hover:blur-none transition-all"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </>
            }
          />
          <BentoCard
            name="Certifications"
            className="col-span-3 md:col-span-1"
            description="Professional certifications and credentials"
            href="/certifications"
            cta="View certifications"
            Icon={Award}
            background={
              <>
                <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
                  <Image
                    src="/home/certifications.png"
                    alt="Certifications background"
                    fill
                    className="object-cover blur-[2px] group-hover:blur-none transition-all"
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
  );
}

