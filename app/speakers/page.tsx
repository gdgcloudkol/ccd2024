import CardGrid from "@/components/CardGrid";
import AlternateHeader from "@/components/blocks/AlternateHeader";
import { GridData } from "@/components/models/cardGrid.model";
import speakerList from "@/public/assets/content/Speakers/content.json";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Speakers",
};
function Speakers() {
  const peopleList: GridData[] = speakerList.allPeople;
  const disabledSpeakersContent = FeatureRule.disabledSpeakerContent;
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        {!disabledSpeakersContent.speakers ? (
          <AlternateHeader
            title={speakerList.title}
            color={speakerList.color}
            description={speakerList.description}
          />
        ) : (
          peopleList.map((people: GridData, index: number) => {
            return <CardGrid key={index} gridData={people} type='People' />;
          })
        )}
      </section>
    </section>
  );
}

export default Speakers;
