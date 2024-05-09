"use client";

import Image from "next/image";
import NavbarData from "@/public/assets/content/Navbar/content.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn, debounce } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(
      () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      },
      scrolled ? 100 : 0
    );

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        " justify-center md:items-center flex flex-col sticky top-0 z-10",
        scrolled ? "backdrop-blur-md bg-background/20 bg-blend-normal" : ""
      )}
    >
      {/* desktop navbar */}
      <div className='flex px-4 sm:px-0 items-center justify-between'>
        <Link href='/'>
          <Image
            className='dark:brightness-0 dark:invert'
            src={NavbarData["logo-desktop"]}
            alt='navlogo'
            width='250'
            height='40'
          />
        </Link>
        <div className='hidden md:flex h-20 md:gap-10 px-2 lg:gap-x-24 max-w-screen-2xl items-center justify-between'>
          <div className='flex'>
            {NavbarData.navbarPermanent.map((title, key) => {
              return (
                <Link
                  href={title.link}
                  className='p-5 md:text-xs lg:text-base '
                  key={key}
                >
                  {title.title}
                </Link>
              );
            })}
          </div>
          <div>
            {NavbarData.navbarSpatialNotLoggedIn.map((title, key) => {
              return (
                <Link
                  href={title.link}
                  className='py-1.5 px-5 rounded-lg bg-google-blue text-white'
                  key={key}
                >
                  {title.title}
                </Link>
              );
            })}
          </div>
        </div>
        {/* mobile and tablet navbar */}
        <div className='flex md:hidden h-16 px-2 sm:px-6 items-center '>
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            ) : (
              <svg
                className='w-6 h-10'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open && (
        <div
          className={cn(
            "flex md:hidden flex-col p-2",
            scrolled ? "" : "backdrop-blur-md bg-background/20 bg-blend-normal"
          )}
        >
          {NavbarData.navbarPermanent.map((title, key) => {
            return (
              <Link
                href={title.link}
                className='p-2 hover:bg-blue-200 hover:border-l-2 dark:hover:text-google-darkGrey hover:border-l-google-blue'
                key={key}
              >
                {title.title}
              </Link>
            );
          })}
          {NavbarData.navbarSpatialNotLoggedIn.map((title, key) => {
            return (
              <div
                className='p-2 hover:bg-blue-200 hover:border-l-2 dark:hover:text-google-darkGrey hover:border-l-google-blue'
                key={key}
              >
                {title.title}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
