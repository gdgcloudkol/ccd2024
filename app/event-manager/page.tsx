import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DataTable } from "./data-table";
import { AttendeeData, columns } from "./column";
import { VolunteerColumns } from "./volunteer-column";
import { AuthRoles } from "@/lib/constants/auth";
import FeatureRuleContent from "@/public/assets/content/feature.rule.json";
import bkFetch from "@/services/backend.services";
import {
  EVENTS_DJANGO_URL,
  EVENT_ATTENDEE_LIST_URL_SUFFIX,
} from "@/lib/constants/be";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InformAll from "./inform-all";
import { Loader2 } from "lucide-react";
import { Event } from "@/components/models/events/datatype";
import AddVolunteer from "./(volunteer-manager)/add-volunteer";
import LoadLink from "@/components/blocks/LoadLink";

const AttendeeManager = async ({ session }: { session: Session }) => {
  let data: AttendeeData[] = [];
  const response = await bkFetch(
    EVENTS_DJANGO_URL +
      session?.user.profile.x_event +
      EVENT_ATTENDEE_LIST_URL_SUFFIX,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  } else {
    data = await response.json();
  }
  return (
    <>
      {" "}
      <div className='flex flex-wrap w-full gap-2 items-center justify-between'>
        <h2 className='my-2 text-3xl font-bold'>Manage Attendees</h2>
        <InformAll />
      </div>
      <DataTable
        data={data}
        columns={columns}
        key={`event-attendee-data-${session?.user.profile.x_event}`}
      />
    </>
  );
};
const Page = async ({ searchParams }: { searchParams: { active: string } }) => {
  const session = await getServerSession(authOptions);
  const allowedRoles = [AuthRoles.organizer, AuthRoles.Xorganizer];

  if (!session) redirect("/login");
  else {
    let matchRoles = allowedRoles.findIndex(
      (r) => r == session?.user.profile.event_role
    );

    let matchRoutes = FeatureRuleContent.XOrganizerEnabledRoutes.findIndex(
      (r) => r == "/event-manager"
    );

    if (matchRoles == -1 || matchRoutes == -1) {
      redirect("/extended-events");
    }
  }

  return (
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <Tabs defaultValue={"attendees"} className='space-y-4'>
        <TabsList>
          <TabsTrigger value='attendees'>Attendees</TabsTrigger>
          <TabsTrigger value='volunteers'>
            <LoadLink href={"/event-manager/volunteers"}>Volunteers</LoadLink>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='attendees'>
          <Suspense
            fallback={
              <div className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' /> Loading attendees.
              </div>
            }
          >
            <AttendeeManager session={session} />
          </Suspense>
        </TabsContent>
        <TabsContent value='volunteers'>
          <div className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 mr-2 animate-spin' /> Loading
            volunteers...
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
