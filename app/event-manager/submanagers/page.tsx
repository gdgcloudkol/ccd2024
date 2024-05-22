import React, { Suspense } from "react";
import AddCoordinator from "../(coordinator-manager)/add-coordinator";
import { DataTable } from "../data-table";
import bkFetch from "@/services/backend.services";
import { Session, getServerSession } from "next-auth";
import { EVENTS_DJANGO_URL } from "@/lib/constants/be";
import { SubManagerColumns } from "./column";
import { Loader2 } from "lucide-react";
import { Event, EventsResponse } from "@/components/models/events/datatype";
import { authOptions } from "@/lib/auth";
import { AuthRoles } from "@/lib/constants/auth";
import { redirect } from "next/navigation";
import FeatureRuleContent from "@/public/assets/content/feature.rule.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadLink from "@/components/blocks/LoadLink";
const VolunteerManager = async ({
  session,
  subManagerData,
}: {
  session: Session;
  subManagerData: Event;
}) => {
  return (
    <>
      <div className='flex flex-wrap w-full gap-2 items-center justify-between'>
        <h2 className='my-2 text-3xl font-bold'>Manage Sub managers</h2>
        <AddCoordinator
          id={session?.user?.profile?.x_event}
          type='sub-managers'
        />
      </div>
      <DataTable
        data={subManagerData.sub_managers}
        columns={SubManagerColumns}
        key={`event-volunteer-data-${session?.user.profile.x_event}`}
      />
    </>
  );
};
const Page = async ({ searchParams }: { searchParams: { active: string } }) => {
  const session = await getServerSession(authOptions);
  const allowedRoles = [
    AuthRoles.organizer,
    AuthRoles.Xorganizer,
    AuthRoles.xsubOrganizer,
  ];
  const allowedOrgRoles = [AuthRoles.organizer, AuthRoles.Xorganizer];

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
  async function getEvent() {
    let response = await bkFetch(
      EVENTS_DJANGO_URL + session?.user.profile.x_event,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`An error occurred :${response.status}`);
    }
    return await response.json();
  }
  const subManagerData: Event = await getEvent();
  return (
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <h2 className='font-bold text-4xl mb-4'>{subManagerData.title}</h2>

      <Tabs value={"sub-managers"} className='space-y-4'>
        <TabsList>
          <TabsTrigger value='attendees' asChild>
            <LoadLink href={"/event-manager"}> Attendees</LoadLink>
          </TabsTrigger>
          <TabsTrigger value='volunteers' asChild>
            <LoadLink href={"/event-manager/volunteers"}>Volunteers</LoadLink>
          </TabsTrigger>
          {allowedOrgRoles.findIndex(
            (r) => r == session?.user.profile.event_role
          ) !== -1 && (
            <TabsTrigger value='sub-managers'>Sub managers</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value='attendees'>
          <div className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' /> Loading attendees.
          </div>
        </TabsContent>
        <TabsContent value='volunteers'>
          {" "}
          <div className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 mr-2 animate-spin' /> Loading
            volunteers...
          </div>
        </TabsContent>
        {allowedOrgRoles.findIndex(
          (r) => r == session?.user.profile.event_role
        ) !== -1 && (
          <TabsContent value='sub-managers'>
            <Suspense
              fallback={
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' /> Loading sub
                  managers.
                </div>
              }
            >
              <VolunteerManager
                session={session}
                subManagerData={subManagerData}
              />
            </Suspense>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
};
export default Page;
