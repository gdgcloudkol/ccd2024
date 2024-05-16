"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Session } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useErrorToasts from "@/components/error-toast";

interface DataTableProps {
  columns: any;
  data: any;
  count: number;
  next: string;
  previous: string;
  session: Session;
  localSearch?: boolean;
  searchTerm?: string;
  page_index?: number;
  page_size?: number;
}

export function DataTable({
  columns,
  data,
  count,
  next,
  previous,
  localSearch = false,
  page_index = 1,
  page_size = 10,
  searchTerm = "",
}: DataTableProps) {
  const [tableData, setTableData] = useState<any>(data);
  const [tableCount, setTableCount] = useState<number>(count);
  const [baseUrl, setBaseUrl] = useState<string>("randomAPI");
  const [nextUrl, setNextUrl] = useState<string>(next);
  const [prevUrl, setPrevUrl] = useState<string>(previous);
  const [currentPageIndex, setCurrentPageIndex] = useState(page_index - 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page_index - 1,
    pageSize: page_size,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const current = usePathname();
  const search = useSearchParams();

  const router = useRouter();
  const { triggerErrorToasts } = useErrorToasts();
  const fetchData = useCallback(
    async (url: string) => {
      setPaginate(true);
      setIsLoading(true);

      const response = await fetch(fetchUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        const data = await response.json();
        triggerErrorToasts(data);
        const message = `An error has occurred: ${response.status}`;
        setIsLoading(false);
        throw new Error(message);
      } else {
        const data = await response.json();
        setIsLoading(false);
        setTableData(data.results);
        setNextUrl(data.next);
        setTableCount(data.count);
        setPrevUrl(data.previous);
      }
    },
    [current]
  );

  let fetchUrl = "";

  useEffect(() => {
    let BaseURL = baseUrl;
    let query = search.get("search");
    if (searchQuery !== "" && query !== "" && query !== null) {
      if (!baseUrl?.includes("find")) BaseURL = `${baseUrl}find/`;
    }

    fetchUrl = `${BaseURL}?page=${page_index}&page_size=${pageSize}`;
    if (pageIndex == 0) {
      fetchUrl = `${BaseURL}?page_size=${pageSize}`;
    } else if (pageIndex == currentPageIndex + 1) {
      fetchUrl = nextUrl;
    } else if (pageIndex == currentPageIndex - 1) {
      fetchUrl = prevUrl;
    } else if (pageIndex == table.getPageCount() - 1) {
      fetchUrl = `${BaseURL}?page=${table.getPageCount()}&page_size=${pageSize}`;
    } else if (
      pageIndex !== currentPageIndex &&
      pageIndex !== currentPageIndex - 1 &&
      pageIndex !== currentPageIndex + 1 &&
      pageIndex < table.getPageCount()
    ) {
      fetchUrl = `${BaseURL}?page=${page_index}&page_size=${pageSize}`;
    }
    setCurrentPageIndex(pageIndex);
    if (
      fetchUrl !== "" &&
      searchQuery == "" &&
      (query == "" || query == undefined || query == null)
    ) {
      fetchData(fetchUrl);
    }
    table.getColumn("email")?.setFilterValue(searchQuery);
  }, [searchQuery, pageIndex, pageSize]);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(tableCount / pageSize),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    onPaginationChange: setPagination,
  });
  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Search emails...'
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className='flex items-center gap-2 ml-auto'>
            <Button variant={"destructive"}>Approve selected</Button>
            <Button variant={"default"}>Reject selected</Button>
          </div>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
      <>
        <DataTablePagination
          table={table}
          count={99}
          tableLength={100}
          loading={false}
          //   searchQuery={searchQuery ?? ""}
        />
      </>
    </div>
  );
}
