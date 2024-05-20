import ProfileCard from "@/app/profile/ProfileCard";
import { UserProfileData } from "@/components/models/login/datatype";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Profile",
};
const page = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const checkCompleteUser = (profile: UserProfileData) => {
    if (
      profile.first_name == DEFAULT_FIRST_NAME ||
      profile.last_name == DEFAULT_LAST_NAME ||
      profile?.pronoun == null ||
      (profile?.college == null && profile?.company == null)
    )
      return false;
    return true;
  };

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto'>
      {!checkCompleteUser(session?.user?.profile) && (
        <section className='banner bg-google-yellow text-black w-full text-center p-4 mt-2 gap-2'>
          <AlertCircle className='h-5 w-5 inline-flex' /> Please complete your
          profile to have a better chance at getting accepted to events!{" "}
        </section>
      )}
      <ProfileCard user={session?.user} />
    </div>
  );
};

export default page;
