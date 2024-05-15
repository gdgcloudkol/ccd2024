import CardGrid from "@/components/CardGrid";
import AlternateHeader from "@/components/blocks/AlternateHeader";
import { GridData } from "@/components/models/cardGrid.model";
import TeamList from "@/public/assets/content/Team/content.json";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Team",
};
function Team() {
  const peopleList: GridData[] = TeamList.allPeople;
  const disabledTeamsContent = FeatureRule.disabledTeamsContent;
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        {!disabledTeamsContent.team ? (
          <AlternateHeader
            title={TeamList.title}
            color={TeamList.color}
            description={TeamList.description}
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

export default Team;
