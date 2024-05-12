import AlternateHeader from "@/components/blocks/AlternateHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQ from "@/public/assets/content/FAQ/content.json";

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

export default function page() {
  return (
    <section className='flex flex-col w-full max-w-7xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        <AlternateHeader
          title={FAQ.title}
          color={FAQ.color}
          description={FAQ.description}
        />

        <Accordion type='single' collapsible className='w-full'>
          {FAQ.faq.map((ques, idx) => (
            <AccordionItem
              value={`faq-content-${idx}`}
              key={`faq-content-${idx}`}
            >
              <AccordionTrigger>{ques?.question}</AccordionTrigger>
              <AccordionContent asChild>
                <p
                  dangerouslySetInnerHTML={{ __html: ques?.answer }}
                  className='text-muted-foreground w-10/12'
                ></p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </section>
  );
}
