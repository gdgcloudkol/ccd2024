"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import NotFound from "@/app/not-found";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  //   if (error?.message?.includes("404")) return <NotFound />;

  return (
    <div className='flex grow items-center justify-center'>
      <section>
        <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-7xl '>
              <span className='text-google-yellow'> O</span>
              <span className='text-google-red'>o</span>
              <span className='text-google-green'>p</span>
              <span className='text-google-blue'>s.</span>
            </h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white '>
              Something&apos;s wrong.
            </p>
            <p
              className={cn(
                "mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 "
              )}
            >
              Sorry, we can&apos;t serve your request.
              <br />
              You can try refreshing or perform a Logout and then log back in.{" "}
            </p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
            <Button
              variant={"outline"}
              className={"ml-4"}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
