"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Bell, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AttendeeData } from "./column";

import { useToast } from "@/components/ui/use-toast";

export function DataTable({ data, columns }: { data: any[]; columns: any }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [tableData, setTableData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const table = useReactTable({
    data: tableData,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  let tableHeaderGroup = React.useMemo(() => table?.getHeaderGroups(), [table]);

  // React.useEffect(() => {
  //   setTableData(data);
  //   return () => setTableData([]);
  // }, [data]);

  React.useEffect(() => {
    if (searchQuery == "" || searchQuery == undefined || searchQuery == null) {
      setTableData(data);
      return;
    } else {
      setTableData(() => {
        return data.filter(
          (element: AttendeeData) =>
            element?.user?.email
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            element?.user?.profile?.first_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            element?.user?.profile?.last_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            element?.status?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
  }, [searchQuery, data]);
  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-center justify-between gap-4 py-4'>
        <Input
          placeholder='Search emails, names, status...'
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(() => event.target.value.trim().toLowerCase())
          }
          className='max-w-xl'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {tableHeaderGroup?.map((headerGroup, idx) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(idx == 0 && "pl-3")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
