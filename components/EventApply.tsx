"use client";

import { Loader2, Ticket } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useErrorToasts from "./error-toast";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

const EventApply = ({
  eventName,
  eventId,
  attended,
  session,
}: {
  eventName: string;
  eventId: number;
  attended: number;
  session?: Session | null;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();

  const router = useRouter();
  async function applyToEvent() {
    if (!session) {
      toast({ variant: "destructive", title: "You are not logged in" });
      setDialogOpen(false);
      router.push("/login");
      return;
    }
    if (!eventId) {
      toast({ variant: "destructive", title: "Must have event id" });
      return;
    } else {
      setIsLoading(true);
      let response = await fetch(`/api/events/${eventId}`, {
        method: "POST",
        body: JSON.stringify({ event: "random wrong id" }),
      });
      setIsLoading(false);
      if (!response.ok) {
        const error = await response.json();
        triggerErrorToasts(error);
        throw new Error(`An error occurred : ${response.status}`);
      } else {
        toast({
          variant: "success",
          title: "Successfully applied for event!",
          description: "Your tickets will be further approved by organizers!",
        });
        router.refresh();
        setDialogOpen(false);
      }
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <Ticket className='h-4 w-4 mr-2' />
          Apply for Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for {eventName ?? "event"}</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to register for the event?
          {session ? (
            <>
              You can apply for{' '}
              <strong> {session.user.profile.attempts} more events.</strong>
            </>
          ) : (
            ''
          )}

        </p>
        <p>
          Note:{" "}
          <strong>
            Registering for an event does not guarantee ticket. Tickets will be
            approved by organizers and moderators!
          </strong>
        </p>
        <DialogFooter>
          <Button
            onClick={applyToEvent}
            variant={"default"}
            disabled={session ? session.user.profile.attempts > 0 ? isLoading : true : isLoading}
            className='text-white'
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' /> Registering
              </>
            ) : (
              "Register"
            )}
          </Button>
          <Button
            onClick={() => setDialogOpen(false)}
            variant={"ghost"}
            disabled={isLoading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventApply;
