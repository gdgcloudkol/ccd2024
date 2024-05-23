"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const AddCoordinator = ({
  id,
  type = "volunteers",
}: {
  id: number | null;
  type?: string;
}) => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const addCoordinator = async () => {
    if (email == "") {
      toast({ variant: "destructive", title: "Enter email id to continue" });
    }
    setLoading(true);
    let response = await fetch(`/api/${type}/add`, {
      method: "POST",
      body: JSON.stringify({
        id,
        email: email.trim(),
      }),
    });
    setLoading(false);
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please make sure you enter the correct email id",
      });
    } else {
      let data = await response.json();
      setEmail("");
      setOpen(false);
      if (data.status !== "ok") {
        toast({ variant: "destructive", title: data?.status });
      } else {
        toast({ variant: "success", title: `Added ${type} successfully` });
        window.location.reload();
      }
    }
  };
  useEffect(() => {
    return () => {
      setEmail("");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className='capitalize'>
          <PlusCircleIcon className='h-4 w-4 mr-2' />
          Add {type}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
          <DialogDescription>
            Enter {type} email id to add them.
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            className='bg-white text-google-darkGrey'
            placeholder='example@example.com'
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
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
            variant={"default"}
            onClick={addCoordinator}
          >
            {loading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />} Add{" "}
            {type}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoordinator;
