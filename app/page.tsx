import { LightRays } from "@/components/ui/light-rays";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
        <section>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Hello, I&apos;m Edward.</h1>
          <p className="text-md md:text-lg text-gray-400">I am a software engineer.</p>
        </section>
      </main>
      <LightRays color="rgba(100, 200, 255, 0.2)" length="100vh" speed={10} count={7} />
    </div>
  );
}
