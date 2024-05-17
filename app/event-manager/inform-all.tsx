"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
const InformAll = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  useEffect(() => {
    if (window.location.search !== "?active=attendees") {
      window.location.search = "?active=attendees";
    }
  }, []);
  const informAll = () => {
    fetch("/api/attendee/informAll", { method: "POST" });
    setDialogOpen(false);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Bell className='h-4 w-4 mr-2' /> Inform All
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inform all attendees?</DialogTitle>
          <DialogDescription></DialogDescription>
          <p>
            {" "}
            Confirming this action would inform all attendees about their ticket
            status. This action is irreversible!
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={"default"}
            className='text-white'
            onClick={informAll}
          >
            <Bell className='h-4 w-4 mr-2' />
            Inform
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InformAll;
