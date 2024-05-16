import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { cache } from "react";
import { DataTable } from "./data-table";
import { AttendeeData, columns } from "./column";
import { AuthRoles } from "@/lib/constants/auth";
import FeatureRuleContent from "@/public/assets/content/feature.rule.json";
import bkFetch from "@/services/backend.services";
import {
  EVENTS_DJANGO_URL,
  EVENT_ATTENDEE_LIST_URL_SUFFIX,
} from "@/lib/constants/be";

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
      redirect("/contests");
    }
  }

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
    <section className='w-full max-w-6xl mx-auto py-10 px-4'>
      <DataTable
        data={data}
        columns={columns}
        key={`event-data-${session?.user.profile.x_event}`}
      />
    </section>
  );
};

export default Page;
