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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { redirect, usePathname } from "next/navigation";

import LoadLink from "@/components/blocks/LoadLink";
import useErrorToasts from "@/components/error-toast";

export default function ResetForm() {
  const formSchema = z
    .object({
      new_password1: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine((password) => validatePassword(password), {
          message:
            "Password must have uppercase, lowercase, numbers and special characters",
        }),
        new_password2: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.new_password2 === data.new_password1, {
      message: "Passwords do not match",
      path: ["password2"],
    });

  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();
  const pathName = usePathname();
  const paths = pathName.split('/');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password1: "",
      new_password2: "",
    },
  });

  useEffect(() => {
    timeLeft > 0 &&
      resetPasswordSuccess &&
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    if (timeLeft == 0 && resetPasswordSuccess) {
      redirect("/login");
    }
  }, [timeLeft, resetPasswordSuccess]);

  useEffect(() => {
    return () => {
      setResetPasswordSuccess(false);
    };
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const exec = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/auth/password/reset/confirm/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...values,uid:paths[2],token:paths[3]}),
        });
        if (!response.ok) {
          setIsLoading(false);
          const message = `An error has occurred: ${response.status}`;
          const data = await response.json();
          triggerErrorToasts(data);
          throw new Error(message);
        } else {
          setResetPasswordSuccess(true);
          toast({
            variant: "success",
            title: "Password changed successfully!",
          });
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    setIsLoading(true);

    exec(values);
  }

  function validatePassword(password: string): boolean {
    {
      const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
      const containsLowercase = (ch: string) => /[a-z]/.test(ch);
      const containsSpecialChar = (ch: string) =>
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
      let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0,
        countOfSpecialChar = 0;
      for (let i = 0; i < password.length; i++) {
        let ch = password.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        else if (containsSpecialChar(ch)) countOfSpecialChar++;
      }
      if (
        countOfLowerCase < 1 ||
        countOfUpperCase < 1 ||
        countOfSpecialChar < 1 ||
        countOfNumbers < 1
      ) {
        return false;
      }
      return true;
    }
  }

  return (
    <section className='flex flex-col h-full space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-bold text-center md:text-left'>
          {AuthContent.resetFormTitle}
        </h1>
        <p
          className='text-center md:text-left'
          dangerouslySetInnerHTML={{
            __html: AuthContent.signupFormDescription,
          }}
        ></p>
      </div>

      {resetPasswordSuccess ? (
        <>
          <h2 className='text-4xl'>{AuthContent.resetSuccessMessage}</h2>
          <p>
            Automatically redirecting in {timeLeft} seconds.{" "}
            <LoadLink
              href={"/login"}
              className='text-google-blue hover:underline'
            >
              Go to login
            </LoadLink>
          </p>
        </>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='new_password1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='***********'
                        className='bg-white text-black'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='new_password2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='***********'
                        className='bg-white text-black'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
              <Button
                type='submit'
                className='w-full text-center'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
                Change Password
              </Button>
            </form>
          </Form>
          <p className='text-center'>
            Remember your password?{" "}
            <LoadLink
              href={"/login"}
              className='text-google-blue hover:underline'
            >
              Login
            </LoadLink>
          </p>
        </>
      )}
    </section>
  );
}
