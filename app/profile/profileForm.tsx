"use client";

import useErrorToasts from "@/components/error-toast";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  GITHUB_URL_REGEX,
  LINKEDIN_URL_REGEX,
  Pronouns,
} from "@/lib/constants/generic";
import { getPronoun } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Student = "student",
  Organization = "organization",
  Designation = "designation",
  GraduationYear = "graduation_year",
  Phone = "phone",
  Github = "github_profile_url",
  Linkedin = "linkedin_profile_url",
  Twitter = "twitter_profile_url",
  Website = "website",
}

export default function ProfileForm({
  userData,
  updateHandler,
}: {
  userData: UserData | undefined;
  updateHandler: Function;
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
    [UserFieldsName.Student]: z.string(),
    [UserFieldsName.Organization]: z.string().min(1).max(255).optional(),
    // [UserFieldsName.Designation]: z.string().min(1).max(255).optional(),
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
    [UserFieldsName.Github]: z
      .string()
      .regex(GITHUB_URL_REGEX, { message: "Github profile url is required" }),
    [UserFieldsName.Linkedin]: z.string().regex(LINKEDIN_URL_REGEX, {
      message: "Linkedin profile url is required",
    }),
    [UserFieldsName.Twitter]: z.string(),
    [UserFieldsName.Website]: z.string(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { toast } = useToast();
  const { triggerErrorToasts } = useErrorToasts();
  const router = useRouter();
  const { update } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: userData?.profile?.first_name,
      last_name: userData?.profile?.last_name,
      pronoun: getPronoun(`${userData?.profile?.pronoun}`),
      student: userData?.profile?.student?.toString() ?? "true",
      organization: userData?.profile?.student
        ? userData?.profile?.college
        : userData?.profile?.company,
      graduation_year: userData?.profile?.graduation_year.toString(),
      phone: userData?.profile?.phone,
      github_profile_url: userData?.profile?.socials?.github ?? undefined,
      twitter_profile_url: userData?.profile?.socials?.twitter ?? undefined,
      website: userData?.profile?.socials?.website ?? undefined,
      linkedin_profile_url: userData?.profile?.socials?.linkedin ?? undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    const exec = async (values: z.infer<typeof profileSchema>) => {
      let response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          first_name: values[UserFieldsName.First_Name],
          last_name: values[UserFieldsName.Last_Name],
          pronoun: values[UserFieldsName.Pronoun],
          student: values[UserFieldsName.Student] == "true" ? true : false,
          company:
            values[UserFieldsName.Student] == "false"
              ? values[UserFieldsName.Organization]
              : "",
          college:
            values[UserFieldsName.Student] == "true"
              ? values[UserFieldsName.Organization]
              : "",
          graduation_year: values[UserFieldsName.GraduationYear],
          phone: values[UserFieldsName.Phone],
          socials: {
            github: values[UserFieldsName.Github],
            linkedin: values[UserFieldsName.Linkedin],
            twitter: values[UserFieldsName.Twitter],
            website: values[UserFieldsName.Website],
          },
        }),
      });
      setIsLoading(false);
      if (!response.ok) {
        const error = await response.json();
        triggerErrorToasts(error);
      } else {
        await update();
        toast({
          variant: "success",
          title: "Profile Updated",
          description: "It may take a few moments for changes to reflect",
        });
        router.refresh();
        updateHandler();
      }
    };
    exec(values);
  }

  return (
    <section className='flex flex-col h-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name={UserFieldsName.First_Name}
              key={UserFieldsName.First_Name}
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.First_Name.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your name"}
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
              name={UserFieldsName.Last_Name}
              key={UserFieldsName.Last_Name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.Last_Name.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your last name"}
                      className='bg-white text-black'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>{" "}
          {/* {JSON.stringify(userData?.profile?.pronoun)} */}
          <FormField
            control={form.control}
            name={UserFieldsName.Pronoun}
            key={UserFieldsName.Pronoun}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>
                  {UserFieldsName.Pronoun.toString().replaceAll("_", " ")}
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                    {...field}
                  >
                    <SelectTrigger className='bg-white text-black'>
                      <SelectValue placeholder='Select a pronoun' />
                    </SelectTrigger>
                    <SelectContent className='bg-white text-black'>
                      <SelectGroup>
                        {Object.keys(Pronouns)?.map((pronoun: string) => (
                          <SelectItem
                            value={pronoun}
                            key={pronoun}
                            className='capitalize'
                          >
                            {Pronouns[pronoun as keyof typeof Pronouns]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={UserFieldsName.Student}
            key={UserFieldsName.Student}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Select profession </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid grid-cols-2 gap-4'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                      <FormControl>
                        <RadioGroupItem value='true' />
                      </FormControl>
                      <FormLabel className='font-normal w-full'>
                        Student
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                      <FormControl>
                        <RadioGroupItem value='false' />
                      </FormControl>
                      <FormLabel className='font-normal w-full'>
                        Professional
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={UserFieldsName.Organization}
            key={UserFieldsName.Organization}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>
                  {UserFieldsName.Organization.toString().replaceAll("_", " ")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Enter your organization name"}
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
            name={UserFieldsName.GraduationYear}
            key={UserFieldsName.GraduationYear}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>
                  {UserFieldsName.GraduationYear.toString().replaceAll(
                    "_",
                    " "
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Enter your graduation year"}
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
            name={UserFieldsName.Phone}
            key={UserFieldsName.Phone}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>
                  {UserFieldsName.Phone.toString().replaceAll("_", " ")}
                </FormLabel>
                <FormControl>
                  <div className='flex items-center gap-x-2 border rounded-md px-4'>
                    <img
                      src='/assets/images/IN.svg'
                      alt='flag of India'
                      loading='lazy'
                    />
                    <Input
                      placeholder={"Enter your phone number"}
                      className='bg-white text-black border-none px-0 ring-0 focus:ring-0 focus-visible:ring-0 focus:border-0 focus-visible:border-0'
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name={UserFieldsName.Github}
              key={UserFieldsName.Github}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.Github.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"https://github.com/"}
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
              name={UserFieldsName.Linkedin}
              key={UserFieldsName.Linkedin}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.Linkedin.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your Linkedin profile url"}
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
              name={UserFieldsName.Twitter}
              key={UserFieldsName.Twitter}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.Twitter.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your Twitter profile url"}
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
              name={UserFieldsName.Website}
              key={UserFieldsName.Website}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {UserFieldsName.Website.toString().replaceAll("_", " ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"https://"}
                      className='bg-white text-black'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-6'>
            <Button
              type='submit'
              className='w-full text-center text-foreground'
              disabled={isLoading}
            >
              {isLoading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Update Profile
            </Button>
            <Button
              type='button'
              variant={"ghost"}
              className='w-full text-center'
              disabled={isLoading}
              onClick={() => updateHandler()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
