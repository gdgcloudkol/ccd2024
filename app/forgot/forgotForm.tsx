"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthContent from "@/public/assets/content/Auth/content.json";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useErrorToasts from "@/components/error-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSucessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const { triggerErrorToasts } = useErrorToasts();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setShowSuccessMessage(false);
    const exec = async (values: z.infer<typeof formSchema>) => {
      let response = await fetch("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
        }),
      });
      setIsLoading(false);
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        // triggerErrorToasts(error);
      } else {
        setShowSuccessMessage(true);
      }
    };
    exec(values);
  }

  return (
    <section className='flex flex-col h-full space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-bold text-center md:text-left'>
          {AuthContent.resetFormTitle}
        </h1>
        <p
          className='text-center md:text-left'
          dangerouslySetInnerHTML={{ __html: AuthContent.loginFormDescription }}
        ></p>
      </div>

      {!showSucessMessage ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john@example.com'
                      type='email'
                      className='bg-white text-black'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full text-center'
              disabled={isLoading}
            >
              {isLoading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Reset Password
            </Button>
          </form>
        </Form>
      ) : (
        <h3 className='text-3xl bold'>
          Please check your email for further steps
        </h3>
      )}
      <p className='text-center'>
        Remember Your Password?{" "}
        <Link href={"/login"} className='text-google-blue hover:underline'>
          Login
        </Link>
      </p>
    </section>
  );
}
