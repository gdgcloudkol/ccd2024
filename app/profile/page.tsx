import ProfileCard from "@/components/ProfileCard";
import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
