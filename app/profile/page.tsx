import ProfileCard from "@/components/ProfileCard";
import { authOptions } from "@/lib/auth";
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
  return (
    <div>
      <ProfileCard user={session?.user} />
    </div>
  );
};

export default page;
