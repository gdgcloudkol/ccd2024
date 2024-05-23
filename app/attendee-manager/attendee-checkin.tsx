"use client";
import React, { useEffect, useState } from "react";
import { AttendeeData } from "../event-manager/column";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { returnVariant } from "@/components/EventsCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AttendeeCheckin = ({ data }: { data: any }) => {
  const [tableData, setTableData] = useState<AttendeeData[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAttendeeId, setCurrentAttendeeId] = useState<string | number>(
    ""
  );
  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, []);
  useEffect(() => {
    if (
      searchQuery == "" ||
      searchQuery == undefined ||
      searchQuery == null ||
      searchQuery.length < 3
    ) {
      if (searchParams?.get("all_attendees") == "true") setTableData(data);
      else setTableData([]);
      return;
    } else {
      setTableData(() => {
        return data?.filter(
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

  useEffect(() => {
    if (searchParams?.get("all_attendees") == "true") setTableData(data);
    else setTableData([]);
    return () => {
      setTableData([]);
    };
  }, [searchParams]);

  const { toast } = useToast();
  const router = useRouter();
  const updateCheckin = async (id: number) => {
    setLoading(true);
    setCurrentAttendeeId(id);
    let response = await fetch(`/api/attendee/${id}/checkin`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    setCurrentAttendeeId("");
    if (!response.ok) {
      toast({ variant: "destructive", title: "Error checking in" });
    } else {
      router.refresh();
    }
  };
  interface AttendeeDataDisplay extends AttendeeData {
    display_email?: string;
  }
  return (
    <div className='w-full mt-4'>
      {data?.status ? (
        data?.status
      ) : (
        <>
          <Input
            value={searchQuery}
            placeholder='Search name, emails'
            className='mb-4'
            onChange={(e) => setSearchQuery(e.target.value.trim())}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendee name</TableHead>
                <TableHead>Attendee email</TableHead>
                <TableHead>Ticket Status</TableHead>
                <TableHead>Checkin Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length == 0 && (
                <TableRow>
                  {" "}
                  <TableCell>No results found </TableCell>
                </TableRow>
              )}

              {data.length > 0 &&
                tableData?.length > 0 &&
                tableData?.map((attendee: AttendeeDataDisplay) => (
                  <TableRow key={attendee?.id}>
                    <TableCell>
                      {attendee?.user?.profile.first_name}{" "}
                      {attendee?.user?.profile.last_name}
                    </TableCell>
                    <TableCell>{attendee?.display_email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={returnVariant(attendee?.status)}
                        className='capitalize text-sm'
                      >
                        {attendee?.status}
                      </Badge>
                    </TableCell>{" "}
                    <TableCell>
                      <Badge
                        variant={attendee?.checked_in ? "default" : "outline"}
                      >
                        {" "}
                        {attendee?.checked_in ? "Present" : "Absent"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {/* <Checkbox
                        defaultChecked={attendee?.checked_in}
                        onCheckedChange={(e) => updateCheckin(attendee.id)}
                        key={attendee.id}
                      /> */}
                      <Button
                        disabled={loading && currentAttendeeId == attendee.id}
                        onClick={() => updateCheckin(attendee.id)}
                      >
                        {loading && currentAttendeeId == attendee.id && (
                          <Loader2 className='h-4 w-4 animate-spin mr-2' />
                        )}{" "}
                        Check {attendee?.checked_in ? "out" : "in"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AttendeeCheckin;
