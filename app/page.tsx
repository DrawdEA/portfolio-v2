import { LightRays } from "@/components/ui/light-rays";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PortfolioDock } from "@/components/portfolio-dock";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-center py-32 px-16 bg-black sm:items-start">
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
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.58 2 12.26c0 4.47 2.87 8.27 6.84 9.62.5.09.68-.22.68-.48 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.1-1.51-1.1-1.51-.9-.63.07-.62.07-.62 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.84.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.15-4.56-5.13 0-1.14.38-2.08 1.02-2.81-.1-.26-.44-1.31.09-2.72 0 0 .84-.28 2.75 1.07A9.39 9.39 0 0 1 12 7.36a9.34 9.34 0 0 1 2.51.34c1.91-1.35 2.75-1.07 2.75-1.07.54 1.41.2 2.46.1 2.72.63.73 1.01 1.67 1.01 2.81 0 4-2.34 4.87-4.57 5.13.36.32.68.96.68 1.94 0 1.4-.01 2.53-.01 2.87 0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
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
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-9.38 16v-7H6.08v7h3.54ZM7.81 10.44c1.11 0 1.8-.74 1.8-1.66-.02-.94-.69-1.65-1.78-1.65-1.1 0-1.8.7-1.8 1.65 0 .92.69 1.66 1.77 1.66h.01ZM17.94 19v-3.97c0-2.13-1.13-3.12-2.63-3.12-1.21 0-1.75.67-2.04 1.15V12.1h-3.54V19h3.54v-3.74c0-.2.01-.41.08-.55.17-.41.57-.83 1.24-.83.88 0 1.23.63 1.23 1.56V19h3.53Z"
                  />
                </svg>
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
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                </svg>
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
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <rect
                    x="6"
                    y="3"
                    width="12"
                    height="18"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 7h6M9 11h6M9 15h3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </a>
            {/* Contact Me */}
            <Link href="/contact" aria-label="Contact Me">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent border-white/20 hover:bg-white/10"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M3 7l9 6 9-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <LightRays color="rgba(100, 200, 255, 0.2)" length="100vh" speed={10} count={7} />
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <PortfolioDock />
      </div>
    </div>
  );
}
