"use client";
import { ColumnDef } from "@tanstack/react-table";

import { returnVariant } from "@/components/EventsCard";
import { Badge } from "@/components/ui/badge";
import AttendeeUpdate from "./attendee-update";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface AttendeeData {
  id: number;
  user: User;
  status: string;
  created_at: string;
  updated_at: string;
  checked_in: boolean;
  checker: null;
  viewer: null;
  event: number;
}

interface User {
  id: number;
  profile: Profile;
  email: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  company: null;
  college: null;
  graduation_year: number;
  pronoun: null;
}

const DetailsBlock = ({
  query,
  value,
  fallback,
}: {
  query: string;
  value: string | number | null;
  fallback: string | number | null;
}) => {
  return (
    <div className='flex items-center gap-2'>
      <span className=' min-w-[120px] lg:min-w-[150px] '>{query}:</span>{" "}
      <span className=' font-bold'>{value || fallback || "N/A"}</span>
    </div>
  );
};
export const columns: ColumnDef<AttendeeData>[] = [
  {
    accessorKey: "name",
    header: "Attendee name",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger className='underline underline-offset-1 text-google-blue text-left'>
          {row.original.user.profile.first_name}{" "}
          {row.original.user.profile.last_name}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-3xl font-bold'>
              {" "}
              {row.original.user.profile.first_name}{" "}
              {row.original.user.profile.last_name}
            </DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-start'>
            <DetailsBlock
              key='Pronouns'
              query='Pronouns'
              value={row.original.user.profile.pronoun}
              fallback={"Me/Mine"}
            />
            <DetailsBlock
              key='Organization'
              query='Organization'
              value={row.original.user.profile.college}
              fallback={row.original.user.profile.company}
            />
            <DetailsBlock
              key='Graduation year'
              query='Graduation year'
              value={row.original.user.profile.graduation_year}
              fallback={null}
            />
            <DetailsBlock
              key='Ticket Status'
              query='Ticket Status'
              value={row.original.status}
              fallback={null}
            />
          </div>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "email",
    header: "Attendee Email",
    cell: ({ row }) => <p>{row.original.user.email}</p>,
  },
  {
    accessorKey: "user,email",
    header: "Ticket Status",
    cell: ({ row }) => (
      <Badge
        variant={returnVariant(row.original.status)}
        className='capitalize text-sm'
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Registered at",
    cell: ({ row }) => {
      let date = row.original.created_at?.split("T")[0];
      let time = row.original.created_at?.split("T")[1]?.split(".")[0];
      return (
        <p>
          {date} {time}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <AttendeeUpdate
          key={row.original.id}
          attendeeId={row.original.id}
          prev_status={row.original.status}
        />
      );
    },
  },
];
