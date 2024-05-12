"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    //   need to update ui logos, based on to-be-decided-on icon library
    <button
      className='rounded-full p-2'
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        localStorage.setItem("ccd-theme", theme === "light" ? "dark" : "light");
      }}
    >
      Toggle
      {/* <Icons.sun className=' h-6 w-6 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0' />
      <Icons.moon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' /> */}
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}
