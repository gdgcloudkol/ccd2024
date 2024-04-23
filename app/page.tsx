"use client"
import dynamic from 'next/dynamic'
 
// Client Components:
const HeroBackground = dynamic(() => import("@/components/HeroBackground"))

export default function Home() {
  return (
    <div className="text-white">
      Coming soon
      <HeroBackground />
    </div>
  );
}
