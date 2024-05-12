"use client";
import React, { ButtonHTMLAttributes } from "react";
// import { IconClipboard } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const IconButton = ({
  children,
  className,
  startIcon,
  endIcon,
  props,
}: {
  children?: React.ReactNode;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  props?: any;
}) => {
  return (
    <button
      {...props}
      className={cn(
        " bg-white rounded-full border-2 border-neutral-100 dark:bg-black hover:border-neutral-200 group/btn overflow-hidden relative flex items-center justify-center",
        className
      )}
    >
      <div className='absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]' />
      {/* <IconClipboard className="absolute top-2 right-2 text-neutral-300 group-hover/btn:block hidden h-4 w-4 transition duration-200" /> */}
      {startIcon}
      <div className='relative z-40'>{children}</div>
      {endIcon}
    </button>
  );
};
