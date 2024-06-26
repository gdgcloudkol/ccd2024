import About from "@/components/About";
import CFS from "@/components/CFS";
import CommunityPartners from "@/components/CommunityPartners";
import HeroSection from "@/components/HeroSection";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <main className='w-full'>
      <HeroSection />
      <About />
      <CFS />
      <Sponsors />
      <CommunityPartners />
    </main>
  );
}
