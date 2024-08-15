"use client";

import { GameTypes } from "@/lib/constants/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  choices: z.string().refine((val) => Object.keys(GameTypes).includes(val)),
  score: z.number().min(0),
});

export default function ManageForm({
  activeChoice = GameTypes.odd_one_out,
}: {
  activeChoice?: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      choices: activeChoice,
      score: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);

      const res = await fetch("/api/games", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          game: values.choices,
          score: values.score,
        }),
      });
      setSubmitting(false);
      if (!res.ok) {
        let err = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: err.message,
        });
        throw new Error(`An error occured : ${await res.json()}`);
      } else {
        toast({
          variant: "default",
          title: "Score submitted!",
        });
        form.reset({
          name: "",
          email: "",
          choices: activeChoice,
          score: 0,
        });
      }
    } catch (error) {
      setSubmitting(false);
      // toast({
      //   variant: "destructive",
      //   title: "Something went wrong",
      //   description: JSON.stringify(error),
      // });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormDescription>Enter player name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@example.com' {...field} />
              </FormControl>
              <FormDescription>Enter player email </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='choices'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder={`${
                        GameTypes[activeChoice as keyof typeof GameTypes] ??
                        GameTypes.odd_one_out
                      }`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(GameTypes).map((game) => (
                      <SelectItem value={game[0]} key={game[0]}>
                        {game[1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select the game played </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='score'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Score</FormLabel>
              <FormControl>
                <Input
                  placeholder='0'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type='number'
                  min={0}
                />
              </FormControl>
              <FormDescription>Score observed in the game</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={submitting}>
          {submitting && <Loader2 className='size-4 animate-spin mr-2' />}Submit
        </Button>
      </form>
    </Form>
  );
}
