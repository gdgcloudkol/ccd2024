"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  count: number;
  tableLength: number;
  loading: boolean;
  searchQuery?: string;
}

export function DataTablePagination<TData>({
  table,
  count,
  tableLength,
  loading = false,
  searchQuery = "",
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // when nothing is default
    if (searchQuery !== "") return;
    let searchParams = `?page=${
      table.getState().pagination.pageIndex + 1
    }&page_size=${table.getState().pagination.pageSize}`;

    // for default values
    if (
      table.getState().pagination.pageIndex == 0 &&
      table.getState().pagination.pageSize <= 10
    )
      searchParams = "";
    // When only pageSize is default
    else if (
      table.getState().pagination.pageIndex > 0 &&
      table.getState().pagination.pageSize <= 10
    )
      searchParams = `?page=${table.getState().pagination.pageIndex + 1}`;
    // When only page index is default
    else if (
      table.getState().pagination.pageIndex == 0 &&
      table.getState().pagination.pageSize > 10
    )
      searchParams = `?page_size=${table.getState().pagination.pageSize}`;
    router.replace(pathname + searchParams);
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
  ]);

  return (
    <div className='flex flex-wrap items-center justify-between p-3'>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
          1}{" "}
        to{" "}
        {table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
          tableLength}{" "}
        of {count}
      </div>
      <div className='flex flex-wrap items-center justify-start gap-y-2 sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center'>
          <div className='flex w-[100px] items-center justify-start text-sm font-medium'>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <span className='sr-only'>Go to first page</span>
              <ChevronsLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || loading}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
              }}
              disabled={!table.getCanNextPage() || loading}
            >
              <span className='sr-only'>Go to last page</span>
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
