import { getBlogPosts, getProjects, getWorkExperience, getTechStack } from "@/lib/markdown";
import Aurora from "@/components/Aurora";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BlogSection } from "@/components/sections/blog-section";
import { getMetadata } from "@/lib/seo";
import type { Metadata } from "next";

// Revalidate every 60 seconds to ensure fresh content
export const revalidate = 60;

export const metadata: Metadata = getMetadata({
  title: undefined, // Use default
  description: "Software Developer portfolio showcasing projects, blog posts, work experience, and technical skills. Explore my work in web development, full-stack applications, and open source contributions.",
  url: "/",
});

export default function Home() {
  const posts = getBlogPosts();
  const projects = getProjects();
  const workExperience = getWorkExperience();
  const techStack = getTechStack();
  // Get the latest (first item after sorting by date descending)
  const latestPost = posts.length > 0 ? posts[0] : null;
  // Extract all icon slugs from tech stack categories
  const techStackIcons = techStack?.categories.flatMap(category => 
    category.technologies.map(tech => tech.icon).filter(Boolean)
  ) || [];
  const latestProject = projects.length > 0 ? projects[0] : null;
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] md:h-screen pointer-events-none z-0">
      <Aurora
          colorStops={["#0a1833", "#1a2647", "#4a5a8c"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.4}
        />
      </div>
      {/* Hero Section */}
      <HeroSection />

      <AboutSection 
        latestProject={latestProject}
        latestPost={latestPost}
        techStackIcons={techStackIcons}
      />

      <WorkExperienceSection workExperience={workExperience} />

      <ProjectsSection projects={projects} />

      <BlogSection posts={posts} />
    </div>
  );
}
