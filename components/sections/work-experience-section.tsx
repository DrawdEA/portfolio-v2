import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/ui/timeline";
import { WorkExperience } from "@/lib/markdown";

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[];
}

export function WorkExperienceSection({ workExperience }: WorkExperienceSectionProps) {
  return (
    <section id="experience" className="w-full max-w-6xl mx-auto px-4 sm:px-16 py-24 bg-transparent">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-start">
            <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
              Work Experience
            </Badge>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-medium text-left">
              My Professional Journey
            </h2>
            <p className="text-gray-400 text-left max-w-2xl">
              A timeline of my career progression, showcasing the companies I&apos;ve worked with, 
              the projects I&apos;ve contributed to, and the technologies I&apos;ve mastered along the way.
            </p>
          </div>
        </div>

        {workExperience.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No work experience entries yet.</p>
          </div>
        ) : (
          <Timeline items={workExperience} />
        )}
      </div>
    </section>
  );
}

