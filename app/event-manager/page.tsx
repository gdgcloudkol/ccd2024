import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { AuthRoles } from "@/lib/constants/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  else {
    if (session.user.profile.role != AuthRoles.moderator) {
      redirect("/contests");
    }
  }
  const data: any[] = [
    {
      id: "m5gr84i9",
      username: "316",
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      username: "242",
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      username: "837",
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      username: "874",
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      username: "721",
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      username: "316",
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      username: "242",
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      username: "837",
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      username: "874",
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      username: "721",
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      username: "316",
      status: "success",
      email: "ken99@yahoo.com",
    },
  ];
  return (
    <section className='w-full max-w-6xl mx-auto py-10'>
      <DataTable
        data={data}
        columns={columns}
        session={session}
        count={100}
        next={""}
        previous={""}
        key={"something"}
      />
    </section>
  );
};

export default Page;
