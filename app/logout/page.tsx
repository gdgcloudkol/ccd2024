"use client";

import * as React from "react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await signOut({ redirect: false });
      window.location.href = "/";
    };
    performLogout();
  }, []);

  return (
    <>
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
                Logging out
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
