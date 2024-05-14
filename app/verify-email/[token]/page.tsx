import { VERITY_EMAIL_DJANGO_URL } from "@/lib/constants/be";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Verify = async ({ token }: { token: string }) => {
  const response = await fetch(VERITY_EMAIL_DJANGO_URL + token + "/", {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.ok) {
    redirect("/login");
  } else if (!response.ok) {
    throw new Error(`An error occured :${response.status}`);
  }
  return <></>;
};
const Page = async ({ params }: { params: { token: string } }) => {
  return (
    <Suspense
      fallback={
        <div className='flex grow flex-col items-center justify-center'>
          <div className={"w-[200px]"}>
            <div className='progress-bar'>
              <div className='progress-bar-value'></div>
            </div>
          </div>
          <section>
            <div className='mx-auto max-w-screen-xl p-4'>
              <div className='mx-auto max-w-screen-sm text-center'>
                <p className='mb-4 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-300'>
                  Activating account
                </p>
              </div>
            </div>{" "}
          </section>
        </div>
      }
    >
      <Verify token={params.token} />
    </Suspense>
  );
};

export default Page;
