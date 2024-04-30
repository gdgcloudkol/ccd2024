import dynamic from "next/dynamic";

// Client Components:
const HeroBackground = dynamic(() => import("@/components/HeroBackground"));

import About from "@/components/About";

import { ThemeToggle } from "@/components/theme-toggler";

export default function Home() {
  return (
    <>
      <HeroBackground />
      <About />
    </>
  );
}
