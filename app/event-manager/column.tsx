"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, X } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      const loading = false;
      return (
        <div className='flex items-center gap-2'>
          <Button variant={"destructive"} size={"sm"}>
            <X className='h-4 w-4' />
          </Button>
          <Button variant={"default"} size={"sm"}>
            <Check className='h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
];
