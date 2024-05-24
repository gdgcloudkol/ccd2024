"use client";

import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import useErrorToasts from "./error-toast";
import { useRouter } from "next/navigation";
import { isLessThan24HoursLeft } from "@/lib/utils";

const WithdrawEvent = ({
  eventName,
  eventId,
  startTime,
  eventApplicationStatus
}: {
  eventName: string;
  eventId: number;
  startTime: string;
  eventApplicationStatus: Map<number, string>;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let show = true;

  const eventStatus = JSON.parse(eventApplicationStatus?.get(eventId) || "");

  if (isLessThan24HoursLeft(startTime) || eventStatus.status === "rejected" || eventStatus.status === "withdraw") {
    show = false;
  }

  async function withdrawEvent() {
    setIsLoading(true);

    try {
      const id = eventStatus.id;

      // Withdrawing from the event
      let response = await fetch(`/api/attendees/${id}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });

      // checking if response is not ok
      if (!response.ok) {
        const error = await response.json();
        triggerErrorToasts(error);
        throw new Error(`An error occurred: ${response.status}`);
      }

      // Success toast
      toast({
        variant: "success",
        title: "Withdrawn Successfully",
        description: "It may take a few moments for changes to reflect",
      });

      window.location.reload()
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  }

  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();

  const router = useRouter();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>

      <DialogTrigger asChild>
        {show &&
          <Button className="w-full" variant={"secondary"} >
            Withdraw
          </Button>}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw for {eventName ?? "event"}</DialogTitle>
        </DialogHeader>
        <p>
          {" "}
          Are you sure you want to withdraw for the event?
        </p>
        <p>
          Note:{" "}
          <strong>
            You wont be able to participate in it.
          </strong>
        </p>
        <DialogFooter>
          <Button
            onClick={withdrawEvent}
            variant={"default"}
            disabled={isLoading}
            className='text-white'
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' /> Withdrawing
              </>
            ) : (
              "Withdraw"
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

export default WithdrawEvent;
