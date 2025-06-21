import Loader from "@/components/Loader";
import { Hero, Features, CTA } from "@/imports";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
