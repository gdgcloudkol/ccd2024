"use client";

import { UserData } from "@/components/models/login/datatype";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const isValidPhoneNumber = (phoneNumber: string) => {
  // Simple validation for demonstration purposes
  return /^\d{10}$/.test(phoneNumber);
};

enum UserFieldsName {
  First_Name = "first_name",
  Last_Name = "last_name",
  Pronoun = "pronoun",
  College = "college",
  Company = "company",
  Designation = "designation",
  GraduationYear = "graduation_year",
  Phone = "phone",
}

export default function ProfileForm({
  userData,
}: {
  userData: UserData | undefined;
}) {
  const profileSchema = z.object({
    [UserFieldsName.First_Name]: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name must not be more than 30 characters" }),
    [UserFieldsName.Last_Name]: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name must not be more than 30 characters" }),
    [UserFieldsName.Pronoun]: z.string(),
    [UserFieldsName.College]: z.string(),
    [UserFieldsName.Company]: z.string().min(1).max(255).optional(),
    [UserFieldsName.Designation]: z.string().min(1).max(255).optional(),
    [UserFieldsName.GraduationYear]: z
      .string()
      .min(4)
      .max(4, {
        message: "Year of graduation should be between 1980 and 2035",
      })
      .optional(),
    [UserFieldsName.Phone]: z
      .string()
      .refine((phoneNumber) => isValidPhoneNumber(phoneNumber), {
        message: "Invalid phone number. Please enter a 10-digit phone number.",
      }),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { update } = useSession();
  const profileFormFieldData = [
    {
      name: UserFieldsName.First_Name,
      label: "First Name",
      placeholder: "John ",
      type: "text",
    },
    {
      name: UserFieldsName.Last_Name,
      label: "Last Name",
      placeholder: "Doe ",
      type: "text",
    },
    {
      name: UserFieldsName.Pronoun,
      label: "Pronouns",
      placeholder: "Your pronouns",
      type: "text",
    },
    {
      name: UserFieldsName.College,
      label: "College Name",
      placeholder: "College Name",
      type: "text",
    },
    {
      name: UserFieldsName.Company,
      label: "Company",
      placeholder: "Eg. Company Name",
      type: "text",
    },
    {
      name: UserFieldsName.Designation,
      label: "Designation (Company)",
      placeholder: "Eg. Software Developer",
      type: "text",
    },
    {
      name: UserFieldsName.GraduationYear,
      label: "Graduation Year",
      placeholder: "Eg. 2019",
      type: "string",
    },
    {
      name: UserFieldsName.Phone,
      label: "Phone Number",
      placeholder: "Eg. 99999 99999",
      type: "string",
    },
  ];

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: userData?.profile?.first_name,
      last_name: userData?.profile?.last_name,
      pronoun: userData?.profile?.pronoun,
      college: userData?.profile?.college,
      company: userData?.profile?.company,
      graduation_year: userData?.profile?.graduation_year.toString(),
      phone: userData?.profile?.phone,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    const exec = async (values: z.infer<typeof profileSchema>) => {
      let response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setIsLoading(false);
      if (!response.ok) {
        const error = await response.text();
        console.error(error);
        toast({
          variant: "destructive",
          title: "Something snapped. Try again later!",
        });
      } else {
        const data = await response.json();

        await update();
        toast({
          variant: "success",
          title: "Profile Updated",
        });
      }
    };
    exec(values);
  }

  return (
    <section className='flex flex-col h-full space-y-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {profileFormFieldData.map((FieldData) => (
            <>
              {FieldData.name !== undefined ? (
                <FormField
                  control={form.control}
                  name={FieldData.name}
                  key={FieldData.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{FieldData.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={FieldData.type}
                          placeholder={FieldData.placeholder}
                          className='bg-white text-black'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <></>
              )}
            </>
          ))}
          <div></div>
          <Button
            type='submit'
            className='w-full text-center text-foreground'
            disabled={isLoading}
          >
            {isLoading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
