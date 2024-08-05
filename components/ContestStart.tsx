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
import { Code, Loader2, Ticket } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import useErrorToasts from "./error-toast";
import { useParams, usePathname, useRouter } from "next/navigation";

const ContestStart = ({
  contestId,
  contestUri,
}: {
  contestId: number;
  contestUri: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();

  const router = useRouter();
  async function getContestStartToken() {
    if (!contestId) {
      toast({ variant: "destructive", title: "Must have contest id" });
      return;
    } else {
      setIsLoading(true);
      let response = await fetch(`/api/contest/get_auth`, {
        method: "POST",
        body: JSON.stringify({
          contestId: contestId,
          eventId: Number(params.eventId),
        }),
      });
      setIsLoading(false);
      if (!response.ok) {
        const error = await response.json();
        triggerErrorToasts(error);
        throw new Error(`An error occurred : ${response.status}`);
      } else {
        const res = await response.json();
        toast({
          variant: "success",
          title: "Started contest, redirecting!",
          description:
            "Contest has been started, redirecting you to the contest portal.",
        });
        router.push(`${contestUri}?token=${res.start_token}`);
        setDialogOpen(false);
      }
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Code className='h-4 w-4 mr-2' />
          Start Contest
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Contest?</DialogTitle>
        </DialogHeader>
        <p>
          {" "}
          Are you sure you want to start the contest? You can attempt this
          contest for <strong> 1 attempt</strong>.
        </p>
        <p>
          Note:{" "}
          <strong>
            You have 2 hours to make your submission. Submissions after that
            will fail.
          </strong>
        </p>
        <DialogFooter>
          <Button
            onClick={getContestStartToken}
            variant={"default"}
            disabled={isLoading}
            className='text-white'
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' /> Starting
              </>
            ) : (
              "Start Now"
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

export default ContestStart;
