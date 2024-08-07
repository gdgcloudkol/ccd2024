import About from "@/components/About";
import CFS from "@/components/CFS";
import CommunityPartners from "@/components/CommunityPartners";
import HeroSection from "@/components/HeroSection";
import Sessions from "@/components/Schedule/Schedule";
import Sponsors from "@/components/Sponsors";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className='w-full'>
      <HeroSection session={session} />
      <About />
      <CFS />
      <Sponsors />
      <CommunityPartners />
    </main>
  );
}
