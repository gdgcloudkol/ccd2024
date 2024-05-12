import AlternateHeader from "@/components/blocks/AlternateHeader";
import Speakers from "@/public/assets/content/Speakers/content.json";
export default function page() {
  return (
    <section className='flex flex-col w-full max-w-7xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        <AlternateHeader
          title={Speakers.title}
          color={Speakers.color}
          description={Speakers.description}
        />
      </section>
    </section>
  );
}
