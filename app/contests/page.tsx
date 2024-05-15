import CardGrid from "@/components/CardGrid";
import contestData from "@/public/assets/content/Contest/content.json";

function Contest() {
  return (
    <>
      <CardGrid gridData={contestData} type="Contest"></CardGrid>
    </>
  );
}

export default Contest;
