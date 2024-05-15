import AlternateHeader from "@/components/blocks/AlternateHeader";
import COC from "@/public/assets/content/CodeOfConduct/content.json";
import { Metadata } from "next";

function ContentBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='flex flex-col'>
      <h3 className='text-3xl'>{title}</h3>
      <p className='text-md'> {description} </p>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Code Of Conduct",
};
export default function page() {
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        <AlternateHeader
          title={COC.title}
          color={COC.color}
          description={COC.description}
        />
        <p className='text-md'>{COC.content}</p>
        {COC.sections.map((content, index) => {
          return (
            <ContentBlock
              key={index}
              title={content.title}
              description={content.description}
            />
          );
        })}
      </section>
    </section>
  );
}
