import CardGrid from "@/components/CardGrid";
import { GridData } from "@/components/models/cardGrid.model";
import TeamList from "@/public/assets/content/Team/content.json";

function Team() {
  const peopleList: GridData[] = TeamList.allPeople;
  return (
    peopleList.map((people: GridData, index: number) => {
      return (
        <CardGrid key={index} gridData={people} type='Person' />
      )
    })
  );
}

export default Team;

