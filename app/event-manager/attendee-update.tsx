"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Loader2, MoreHorizontalIcon } from "lucide-react";
import { TicketChoices } from "@/lib/constants/tickets";
import { useToast } from "@/components/ui/use-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const AttendeeUpdate = ({
  attendeeId,
  informed,
  prev_status,
}: {
  attendeeId: number;
  informed: boolean;
  prev_status: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [status, setStatus] = useState(prev_status);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const router = useRouter();
  const updateAttendeeStatus = async (status: string) => {
    setLoading(true);
    const response = await fetch(`/api/attendee/${attendeeId}/update/`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    if (!response.ok) {
      const error = await response.json();

      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      throw new Error(`An error occurred while updating : ${response.status}`);
    } else {
      setDropDownOpen(false);
      // window.location.reload();
    }
    router.refresh();
  };

  const informAttendee = () => {
    const exec = async () => {
      fetch(`/api/attendee/${attendeeId}/inform/`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => router.refresh())
        .catch((error: any) => {
          toast({
            variant: "destructive",
            title: "Something went wrong sending email",
            description: error.message,
          });
        });
    };
    setDropDownOpen(false);
    exec();
  };
  if (informed) return "Informed";
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropDownOpen}>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button size={"sm"} variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='p-0'>
            <Button
              size={"sm"}
              className='w-full'
              disabled={loading}
              variant={"default"}
              onClick={(e) => {
                e.stopPropagation();
                updateAttendeeStatus(TicketChoices.reviewed);
              }}
            >
              {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Under Review
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='p-0'>
            <Button
              size={"sm"}
              className='w-full'
              disabled={loading}
              variant={"warning"}
              onClick={(e) => {
                e.stopPropagation();
                updateAttendeeStatus(TicketChoices.waitlist);
              }}
            >
              {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Waitlist
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='p-0'>
            <Button
              size={"sm"}
              className='w-full'
              disabled={loading}
              variant={"success"}
              onClick={(e) => {
                e.stopPropagation();
                updateAttendeeStatus(TicketChoices.approved);
              }}
            >
              {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Approve
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='p-0'>
            <Button
              size={"sm"}
              className='w-full py-1'
              disabled={loading}
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                updateAttendeeStatus(TicketChoices.rejected);
              }}
            >
              {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Reject
            </Button>
          </DropdownMenuItem>
          {(prev_status == TicketChoices.approved ||
            prev_status == TicketChoices.rejected) && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem className='p-0'>
                <Button
                  size={"sm"}
                  className='w-full py-1'
                  disabled={loading}
                  variant={"secondary"}
                  onClick={(e) => {
                    e.stopPropagation();
                    informAttendee();
                  }}
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  ) : (
                    <Bell className='h-4 w-4 mr-2 ' />
                  )}
                  Inform
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AttendeeUpdate;
