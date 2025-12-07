import { LightRays } from "@/components/ui/light-rays";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
        <section>
          <h1>Hello, I'm Edward</h1>
          <p>I code stuff</p>
        </section>
      </main>
      <LightRays color="rgba(100, 200, 255, 0.2)" length="100vh" speed={3} count={7} />
    </div>
  );
}
