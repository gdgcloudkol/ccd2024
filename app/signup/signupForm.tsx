"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthContent from "@/public/assets/content/Auth/content.json";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import useErrorToasts from "@/components/error-toast";

export default function LoginForm() {
  const formSchema = z
    .object({
      first_name: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(30, { message: "First name must not be more than 30 characters" }),
      last_name: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(30, { message: "Last name must not be more than 30 characters" }),
      username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(24, { message: "Username must not be more than 24 characters" }),
      email: z.string().email(),
      password1: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine((password) => validatePassword(password), {
          message:
            "Password must have uppercase, lowercase, numbers and special characters",
        }),
      password2: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password2 === data.password1, {
      message: "Passwords do not match",
      path: ["password2"],
    });
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });
  useEffect(() => {
    timeLeft > 0 &&
      signupSuccess &&
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    if (timeLeft == 0 && signupSuccess) {
      redirect("/login");
    }
  }, [timeLeft, signupSuccess]);
  useEffect(() => {
    return () => {
      setSignupSuccess(false);
    };
  }, []);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const exec = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          setIsLoading(false);
          const message = `An error has occurred: ${response.status}`;
          const data = await response.json();
          triggerErrorToasts(data);
          throw new Error(message);
        } else {
          setSignupSuccess(true);
          toast({
            variant: "success",
            title: "User registered successfully!",
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
          {AuthContent.signupFormTitle}
        </h1>
        <p
          className='text-center md:text-left'
          dangerouslySetInnerHTML={{
            __html: AuthContent.signupFormDescription,
          }}
        ></p>
      </div>

      {signupSuccess ? (
        <>
          <h2 className='text-4xl'>{AuthContent.singupSuccessMessage}</h2>
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
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='John Doe'
                          className='bg-white text-black'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='John Doe'
                          className='bg-white text-black'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Anonymous john'
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
              <FormField
                control={form.control}
                name='password1'
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
                name='password2'
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
                Sign up
              </Button>
            </form>
          </Form>
          <p className='text-center'>
            Already have an account?{" "}
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
