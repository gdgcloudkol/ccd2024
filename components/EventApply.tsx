"use client";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Ticket } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import useErrorToasts from "./error-toast";
import { useRouter } from "next/navigation";

const EventApply = ({
  eventName,
  eventId,
  attended,
}: {
  eventName: string;
  eventId: number;
  attended: number;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();

  const router = useRouter();
  async function applyToEvent() {
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
        <Button>
          <Ticket className='h-4 w-4 mr-2' />
          Get Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for {eventName ?? "event"}</DialogTitle>
        </DialogHeader>
        <p>
          {" "}
          Are you sure you want to register for the event? You can apply for{" "}
          <strong> {3 - Number(attended)} more events</strong> .
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
            disabled={isLoading}
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
