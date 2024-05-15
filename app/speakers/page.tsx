import CardGrid from "@/components/CardGrid";
import { GridData } from "@/components/models/cardGrid.model";
import speakerList from "@/public/assets/content/Speakers/content.json";

function Speakers() {
  const peopleList: GridData[] = speakerList.allPeople;
  return (
    peopleList.map((people: GridData, index: number) => {
      return (
        <CardGrid key={index} gridData={people} type='Person' />
      )
    })
  );
}

export default Speakers;
