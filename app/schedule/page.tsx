import AlternateHeader from "@/components/blocks/AlternateHeader";
import Sessions from "@/components/Schedule/Schedule";
import Schedule from "@/public/assets/content/Schedule/content.json";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Schedule",
};
export default function page() {
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        <AlternateHeader
          title={Schedule.title}
          color={Schedule.color}
          description={""}
        />
      <Sessions />
      </section>
    </section>
  );
}
