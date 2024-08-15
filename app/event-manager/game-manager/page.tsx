import { authOptions } from "@/lib/auth";
import { AuthRoles, GameTypes } from "@/lib/constants/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FeatureRuleContent from "@/public/assets/content/feature.rule.json";
import ManageForm from "./ManagerForm";
import { Card, CardContent } from "@/components/ui/card";
const Page = async ({ searchParams }: { searchParams: any }) => {
  const session = await getServerSession(authOptions);

  const allowedRoles = [
    AuthRoles.superadmin,
    AuthRoles.organizer,
    AuthRoles.volunteer,
    AuthRoles.Xorganizer,
  ];
  if (!session) redirect("/login");
  else {
    let matchRoles = allowedRoles.findIndex(
      (r) => r == session?.user.profile.event_role
    );

    let matchRoutes = FeatureRuleContent.XVolunteerEnabledRoutes.findIndex(
      (r) => r == "/event-manager/game-manager"
    );

    if (matchRoles == -1 || matchRoutes == -1) {
      redirect("/extended-events");
    }
  }

  return (
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <h2 className='font-bold text-4xl mb-4'>Game Score Entry</h2>
      <Card className='w-full max-w-2xl'>
        <CardContent className='p-4 '>
          <ManageForm
            activeChoice={searchParams.game ? searchParams.game : "odd_one_out"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default Page;
