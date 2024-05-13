"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <div></div>;
};

export default Page;
