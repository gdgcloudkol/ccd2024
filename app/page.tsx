import dynamic from "next/dynamic";

// Client Components:

import About from "@/components/About";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
    </>
  );
}
