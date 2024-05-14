"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex grow items-center justify-center mx-auto w-full max-w-6xl px-4'>
      <section>
        <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 text-center'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight min-lg:text-7xl max-sm:text-4xl max-md:text-5xl '>
              <span className='text-google-yellow'> Foou</span>
              <span className='text-google-red'>ro</span>
              <span className='text-google-green'>oofo</span>
              <span className='text-google-blue'>urrrr</span>
            </h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
              Error 404
            </p>
            <p
              className={cn(
                "mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 "
              )}
            >
              Sorry, we couldn&apos;t find the page you requested
              <br />
            </p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
            <Button
              variant={"outline"}
              className={"ml-4"}
              onClick={() => router.back()}
            >
              Go back
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
