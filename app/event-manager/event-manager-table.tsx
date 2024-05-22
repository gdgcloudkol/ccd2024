"use client";
import { useState } from "react";
import { AttendeeData, columns } from "./column";
import { useRouter } from "next/navigation";
import { TicketChoices } from "@/lib/constants/tickets";
import { DataTable } from "./data-table";

const EventManagerTable = ({ data }: { data: AttendeeData[] }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const updateAttendeeStatus = async (status: string) => {
    setLoading(true);
    const response = await fetch(`/api/attendee/1165/update/`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    if (!response.ok) {
      const error = await response.json();

      throw new Error(`An error occurred while updating : ${response.status}`);
    } else {
      // window.location.reload();
    }
    router.refresh();
  };

  return (
    <>
      <button onClick={() => updateAttendeeStatus(TicketChoices.waitlist)}>
        {loading && "loading..."}Update
      </button>{" "}
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default EventManagerTable;
