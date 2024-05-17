import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import contestData from "@/public/assets/content/Contest/content.json";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import CardGrid from "@/components/CardGrid";
import bkFetch from "@/services/backend.services";
import { EVENTS_DJANGO_URL } from "@/lib/constants/be";
const Page = async ({ params }: { params: { eventId: number } }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/extended-events");
  const disabledContestsContent = FeatureRule.disabledContestContent;

  let data = [];
  let response = await bkFetch(
    EVENTS_DJANGO_URL + params.eventId + "/contests",
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  } else {
    data = await response.json();
  }
  return (
    <div>
      {disabledContestsContent.contests && (
        <CardGrid
          gridData={{
            title: contestData.title,
            description: contestData.description,
            contests: data,
          }}
          type='Contest'
        ></CardGrid>
      )}
    </div>
  );
};

export default Page;
