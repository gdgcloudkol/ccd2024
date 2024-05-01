import dynamic from "next/dynamic";

// Client Components:
const HeroBackground = dynamic(() => import("@/components/HeroBackground"));

import About from "@/components/About";

export default function Home() {
  return (
    <>
      <HeroBackground />
      <About />
    </>
  );
}
