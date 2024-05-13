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

const isValidPhoneNumber = (phoneNumber: string) => {
    // Simple validation for demonstration purposes
    return /^\d{10}$/.test(phoneNumber);
  };

  enum UserFieldsName {
    Name = "name",
    Gender = "gender",
    Profession = "profession",
    Company = "company",
    Designation = "designation",
    YearsOfExperience = "yearsOfExperience",
    PhoneNumber = "phoneNumber"
  }

export default function ProfileForm() {
  

  const profileSchema = z.object({
    [UserFieldsName.Name]: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, { message: "Name must not be more than 30 characters" }),
    [UserFieldsName.Gender]: z.string(),
    [UserFieldsName.Profession]: z.string(),
    [UserFieldsName.Company]: z.string().min(1).max(255).optional(),
    [UserFieldsName.Designation]: z.string().min(1).max(255).optional(),
    [UserFieldsName.YearsOfExperience]: z.string().min(0).max(2, {message:"Year of experience should be between 0 and 99"}).optional(),
    [UserFieldsName.PhoneNumber]: z.string().refine((phoneNumber) => isValidPhoneNumber(phoneNumber), {
        message: 'Invalid phone number. Please enter a 10-digit phone number.',
      }),
  });
  const [isLoading, setIsLoading] = useState(false);

  const profileFormFieldData = [
    {name:UserFieldsName.Name, label:"Full Name", placeholder: 'John Doe', type:'text', default:"John Doe"},
    {name:UserFieldsName.Gender, label:"Gender", placeholder: 'Your Gender', type:'text', default:"Male"},
    {name:UserFieldsName.Profession, label:"Profession", placeholder: 'Student/Professional', type:'text', default:"Student"},
    {name:UserFieldsName.Company, label:"Company", placeholder: 'Eg. Company Name', type:'text', default:""},
    {name:UserFieldsName.Designation, label:"Designation (company)", placeholder: 'Eg. Software Developer', type:'text', default:""},
    {name:UserFieldsName.YearsOfExperience, label:"Years Of Experience", placeholder: 'Eg. 2', type:'number', default:""},
    {name:UserFieldsName.PhoneNumber, label:"Phone Number", placeholder: 'Eg. 99999 99999', type:'string', default:"99999 99999"},
  ]

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      profession: undefined,
      company: "",
      designation: "",
      yearsOfExperience: "",
      phoneNumber:""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileSchema   >) {
    setIsLoading(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className='flex flex-col h-full space-y-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {profileFormFieldData.map((FieldData)=>(
                <FormField
                control={form.control}
                name={FieldData.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{FieldData.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={FieldData.type}
                        placeholder={FieldData.placeholder}
                        className='bg-white text-black'
                        defaultValue={FieldData.default}
                        {...field}
                      />
                    </FormControl>
    
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          <div></div>
          <Button
            type='submit'
            className='w-full text-center'
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
