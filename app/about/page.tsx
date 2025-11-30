export const metadata = {
  title: 'About | Edward',
  description: 'Learn more about Edward - skills, experience, and background',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">About Me</h1>

      {/* Personal Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Your personal story and bio will go here. Share your journey, passions,
          and what drives you in your work.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                Next.js
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                Tailwind CSS
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                PostgreSQL
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                Drizzle ORM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Work Experience</h2>
        <div className="space-y-6">
          <div className="border-l-2 pl-6 pb-6">
            <h3 className="text-xl font-semibold mb-1">Job Title</h3>
            <p className="text-muted-foreground mb-2">Company Name • Date Range</p>
            <p className="text-muted-foreground">
              Description of your role and key achievements.
            </p>
          </div>
          <div className="border-l-2 pl-6 pb-6">
            <h3 className="text-xl font-semibold mb-1">Job Title</h3>
            <p className="text-muted-foreground mb-2">Company Name • Date Range</p>
            <p className="text-muted-foreground">
              Description of your role and key achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Degree Name</h3>
            <p className="text-muted-foreground">University Name • Year</p>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interests & Hobbies</h2>
        <p className="text-muted-foreground">
          Share your interests, hobbies, and what you enjoy outside of work.
        </p>
      </section>

      {/* Social Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Twitter
          </a>
        </div>
      </section>
    </div>
  );
}
