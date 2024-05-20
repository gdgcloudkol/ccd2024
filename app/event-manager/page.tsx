import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DataTable } from "./data-table";
import { AttendeeData, columns } from "./column";
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
import LoadLink from "@/components/blocks/LoadLink";
import { TicketChoices } from "@/lib/constants/tickets";

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
      <div className='flex flex-wrap w-full gap-4 items-center justify-between bg-google-darkGrey p-2 rounded my-4 '>
        <div className='flex items-center  gap-2'>
          <span>
            {data?.length > 0 &&
              data?.filter(
                (attendee) => attendee.status == TicketChoices.approved
              ).length}{" "}
            approved
          </span>
          <span>
            {data?.length > 0 &&
              data?.filter(
                (attendee) => attendee.status == TicketChoices.rejected
              ).length}{" "}
            rejected
          </span>
          <span> of {data.length} registrations</span>
        </div>
        <span>
          {data?.length > 0 &&
            data?.filter((attendee) => attendee.checked_in)?.length}{" "}
          checked in
        </span>
      </div>
      <DataTable
        data={data}
        columns={columns}
        key={`event-attendee-data-${session?.user.profile.x_event}`}
      />
    </>
  );
};
const Page = async () => {
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
  async function fetchData(url: string, options: any) {
    const response = await bkFetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  }
  async function getData() {
    const [event] = await Promise.all([
      fetchData(
        EVENTS_DJANGO_URL + session?.user.profile.x_event + "?page_size=50",
        { method: "GET" }
      ),
    ]);

    return {
      event,
    };
  }

  const { event } = await getData();

  return (
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <h2 className='font-bold text-4xl mb-4'>{event.title}</h2>
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
