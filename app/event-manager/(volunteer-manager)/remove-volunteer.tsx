"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash } from "lucide-react";

import { useEffect, useState } from "react";

const RemoveVolunteer = ({
  id,
  email,
}: {
  id: number | null;
  email: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const removeVolunteer = async () => {
    if (email == "") {
      toast({ variant: "destructive", title: "Enter email id to continue" });
    }
    setLoading(true);
    let response = await fetch(`/api/volunteers/remove`, {
      method: "POST",
      body: JSON.stringify({
        email: email.trim(),
      }),
    });
    setLoading(false);
    if (!response.ok) {
      const error = await response.json();
      toast({ variant: "destructive", title: JSON.stringify(error) });
    } else {
      window.location.reload();
      setOpen(false);
      toast({ variant: "success", title: "Removed volunteer successfully" });
    }
  };
  useEffect(() => {
    if (window.location.search !== "?active=volunteers") {
      window.location.search = "?active=volunteers";
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash className='h-4 w-4 mr-2' />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Volunteer</DialogTitle>
        </DialogHeader>
        Are you sure you want to remove {email} as a volunteer.
        <DialogFooter>
          <Button
            disabled={loading}
            variant={"ghost"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={removeVolunteer}
          >
            {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}{" "}
            Remove Volunteer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveVolunteer;
