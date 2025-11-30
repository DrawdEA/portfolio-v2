export const metadata = {
  title: 'Resume | Edward',
  description: 'Edward\'s resume and professional experience',
};

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">Resume</h1>
        <a
          href="/resume.pdf"
          download
          className="px-6 py-2 border rounded-lg hover:bg-accent transition-colors"
        >
          Download PDF
        </a>
      </div>

      {/* Resume Content */}
      <div className="bg-white dark:bg-black border rounded-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Edward</h2>
          <p className="text-muted-foreground">Your Title / Role</p>
          <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>your.email@example.com</span>
            <span>•</span>
            <span>+1 (555) 123-4567</span>
            <span>•</span>
            <span>yourwebsite.com</span>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Experience
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-semibold">Job Title</h4>
                  <p className="text-muted-foreground">Company Name</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Date Range
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Key achievement or responsibility</li>
                <li>Key achievement or responsibility</li>
                <li>Key achievement or responsibility</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-semibold">Job Title</h4>
                  <p className="text-muted-foreground">Company Name</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Date Range
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Key achievement or responsibility</li>
                <li>Key achievement or responsibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Education
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <h4 className="text-xl font-semibold">Degree Name</h4>
                <p className="text-muted-foreground">University Name</p>
              </div>
              <span className="text-sm text-muted-foreground">Year</span>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Skills</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <p className="text-muted-foreground">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Backend</h4>
              <p className="text-muted-foreground">
                Node.js, PostgreSQL, Drizzle ORM
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tools</h4>
              <p className="text-muted-foreground">
                Git, Docker, CI/CD
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Other</h4>
              <p className="text-muted-foreground">
                Add your other skills here
              </p>
            </div>
          </div>
        </section>

        {/* Projects / Talks (Optional) */}
        <section>
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Notable Projects / Talks
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Project/Talk Name</h4>
              <p className="text-muted-foreground">
                Brief description or link
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
