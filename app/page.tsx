"use client"
import dynamic from 'next/dynamic'
 
// Client Components:
const HeroBackground = dynamic(() => import("@/components/HeroBackground"));

import About from "@/components/About";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBackground />
      <About />
    </>
  );
}
