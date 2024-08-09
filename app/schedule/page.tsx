import AlternateHeader from "@/components/blocks/AlternateHeader";
import Sessions from "@/components/Schedule/Schedule";
import Schedule from "@/public/assets/content/Schedule/content.json";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Schedule",
};
export default async function page() {
  async function getSchedule() {
    try {
      const res = await fetch(
        "https://sessionize.com/api/v2/ilkj4hf0/view/Sessions"
      );
      if (!res.ok) {
        throw new Error(`An error occured fetching schedule: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  let data = await getSchedule();
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        <AlternateHeader
          title={Schedule.title}
          color={Schedule.color}
          description={""}
        />
        <Sessions sessions={data} />
      </section>
    </section>
  );
}
