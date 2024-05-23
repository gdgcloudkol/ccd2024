"use client";
import { ColumnDef } from "@tanstack/react-table";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import RemoveCoordinator from "../(coordinator-manager)/remove-coordinator";
import { getPronounLabel } from "@/lib/utils";
export interface SubManagerData {
  id: number;
  profile: Profile;
  email: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  company: string;
  college: string;
  graduation_year: number;
  pronoun: string;
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

export const SubManagerColumns: ColumnDef<SubManagerData>[] = [
  {
    accessorKey: "name",
    header: "SubManager name",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger className='underline underline-offset-1 text-google-blue text-left'>
          {row.original.profile.first_name} {row.original.profile.last_name}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-3xl font-bold'>
              {" "}
              {row.original.profile.first_name} {row.original.profile.last_name}
            </DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-start'>
            <DetailsBlock
              key='Pronouns'
              query='Pronouns'
              value={row.original.profile.pronoun}
              fallback={"Me/Mine"}
            />
            <DetailsBlock
              key='Organization'
              query='Organization'
              value={row.original.profile.college}
              fallback={row.original.profile.company}
            />
            <DetailsBlock
              key='Graduation year'
              query='Graduation year'
              value={row.original.profile.graduation_year}
              fallback={null}
            />
          </div>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "email",
    header: "SubManager Email",
    cell: ({ row }) => <p>{row.original.email}</p>,
  },
  {
    accessorKey: "pronoun",
    header: "Pronouns",
    cell: ({ row }) => <p>{getPronounLabel(row.original.profile.pronoun)}</p>,
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <RemoveCoordinator
            id={row.original.id}
            email={row.original.email}
            type='sub-managers'
          />
        </>
      );
    },
  },
];
