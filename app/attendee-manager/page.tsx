import { authOptions } from "@/lib/auth";
import { AuthRoles } from "@/lib/constants/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

import FeatureRuleContent from "@/public/assets/content/feature.rule.json";
import { AttendeeData } from "../event-manager/column";
import { Session } from "next-auth";
import bkFetch from "@/services/backend.services";
import {
  EVENTS_DJANGO_URL,
  EVENT_ATTENDEE_LIST_URL_SUFFIX,
} from "@/lib/constants/be";
import { Loader2 } from "lucide-react";
import AttendeeCheckin from "./attendee-checkin";
import { maskEmail } from "@/lib/utils";
const AttendeeManager = async ({ session }: { session: Session }) => {
  async function fetchData(url: string, options: any) {
    const response = await bkFetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  }
  async function getData() {
    const [event, attendees] = await Promise.all([
      fetchData(
        EVENTS_DJANGO_URL + session?.user.profile.x_event + "?page_size=50",
        { method: "GET" }
      ),
      fetchData(
        EVENTS_DJANGO_URL +
          session?.user.profile.x_event +
          EVENT_ATTENDEE_LIST_URL_SUFFIX,
        { method: "GET" }
      ),
    ]);

    return {
      event,
      attendees,
    };
  }

  const { event, attendees } = await getData();

  let attendeeTemp = structuredClone(attendees);

  if (Object.keys(attendees).includes("status")) {
    attendeeTemp = [];
  } else {
    attendeeTemp = attendees.map((attendee: AttendeeData) => ({
      ...attendee,
      user: { ...attendee.user, email: maskEmail(attendee.user.email) },
    }));
  }

  return (
    <>
      {" "}
      <div className='w-full space-y-2 '>
        <h2 className='my-2 text-3xl font-bold mb-4'>{event.title}</h2>
        <h2 className='my-2 text-3xl font-bold'>Check in Attendees</h2>
        <p className='text-gray-300'>
          {" "}
          Check in attendees. Search their name/email to get results.
        </p>
      </div>
      <AttendeeCheckin data={attendeeTemp} />
    </>
  );
};
const Page = async () => {
  const session = await getServerSession(authOptions);
  const allowedRoles = [
    AuthRoles.organizer,
    AuthRoles.Xorganizer,
    AuthRoles.Xvolunteer,
  ];

  if (!session) redirect("/login");
  else {
    let matchRoles = allowedRoles.findIndex(
      (r) => r == session?.user.profile.event_role
    );

    let matchOrgRoutes = FeatureRuleContent.XOrganizerEnabledRoutes.findIndex(
      (r) => r == "/attendee-manager"
    );
    let matchVolRoutes = FeatureRuleContent.XVolunteerEnabledRoutes.findIndex(
      (r) => r == "/attendee-manager"
    );

    if (matchRoles == -1 || matchOrgRoutes == -1 || matchVolRoutes == -1) {
      redirect("/extended-events");
    }
  }

  return (
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <Suspense
        fallback={
          <div className='flex items-center gap-2'>
            <Loader2 className='animate-spin' /> Loading attendee check-in
          </div>
        }
      >
        <AttendeeManager session={session} />
      </Suspense>
    </section>
  );
};

export default Page;
