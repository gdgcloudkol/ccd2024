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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const formSchema = z.object({
    fullname: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name must not be more than 30 characters" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(24, { message: "Username must not be more than 24 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((password) => validatePassword(password), {
        message:
          "Password must have uppercase, lowercase, numbers and special characters",
      }),
    temp_password: z.string().min(8, { message: "Password must be at least 8 characters" })
  }).refine((data) => data.temp_password === data.password, {
    message: 'Passwords do not match',
    path: ['temp_password']
  });
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      temp_password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
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
            name='password'
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
            name='temp_password'
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
            Log in
          </Button>
        </form>
      </Form>
      <p className='text-center'>
        Already have an account?{" "}
        <Link href={"/login"} className='text-google-blue hover:underline'>
          Login
        </Link>
      </p>
    </section>
  );
}
