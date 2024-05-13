"use client";

import { memo } from "react";

import { useLoadingContext } from "@/app/loading-provider";

const TopLoadingComponent = () => {
  const { loading } = useLoadingContext();

  return (
    <div
      className='absolute w-full max-w-7xl overflow-hidden rounded bg-transparent top-[100%]'
      style={{ height: "1px" }}
    >
      {loading ? (
        <div className=' absolute h-1 w-1/3 rounded bg-gradient-to-r animate-progress from-transparent via-google-yellow to-transparent'></div>
      ) : (
        <></>
      )}
    </div>
  );
};
export const TopLoading = memo(TopLoadingComponent);
