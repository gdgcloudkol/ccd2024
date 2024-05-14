"use client";

import Image from "next/image";
import NavbarData from "@/public/assets/content/Navbar/content.json";
import { useEffect, useState } from "react";
import { cn, debounce } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { TopLoading } from "../blocks/TopLoading";
import LoadLink from "../blocks/LoadLink";
import { useLoadingContext } from "@/app/loading-provider";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import PrivateNav from "./PrivateNav";

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
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
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  useEffect(() => {
    setOpen(() => false);
  }, [active]);
  const { loading } = useLoadingContext();
  return (
    <nav
      className={cn(
        " justify-center w-full  md:items-center flex flex-col sticky top-0 z-40",
        scrolled
          ? "backdrop-blur-sm bg-background/50 bg-blend-normal"
          : "bg-black"
      )}
    >
      <div className='w-full max-w-6xl'>
        {/* desktop navbar */}
        <div className='flex px-4 lg:px-0 items-center justify-between'>
          <LoadLink href='/'>
            <Image
              className='dark:brightness-0 dark:invert'
              src={NavbarData["logo-desktop"]}
              priority
              alt='navlogo'
              width='250'
              height='40'
            />
          </LoadLink>
          <div className='hidden md:flex h-20 md:gap-10 px-2 lg:gap-x-24 max-w-screen-2xl items-center justify-between'>
            <div className='flex'>
              {NavbarData.navbarPermanent
                .filter((item) => item.desktopVisible)
                .map((title, key) => {
                  return (
                    <LoadLink
                      href={title.link}
                      className={cn(
                        "p-5 border-b-2 border-transparent md:text-xs lg:text-base ",
                        pathname !== "/" &&
                          title.link.startsWith(active) &&
                          "border-google-blue",
                        pathname == "/" &&
                          active.startsWith(title.link) &&
                          "border-google-blue"
                      )}
                      key={`${title.title}-${key}`}
                      onClick={() => {
                        setActive(() => title.link);
                      }}
                    >
                      {title.title}
                    </LoadLink>
                  );
                })}
            </div>
            <div>
              {!session ? (
                NavbarData.navbarSpatialNotLoggedIn.map((title, key) => {
                  return (
                    <LoadLink href={title.link} key={key}>
                      <Button className='px-5'>{title.title}</Button>
                    </LoadLink>
                  );
                })
              ) : (
                <PrivateNav user={session?.user} />
              )}
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
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
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
              scrolled
                ? ""
                : "backdrop-blur-md bg-background/20 bg-blend-normal"
            )}
          >
            {NavbarData.navbarPermanent.map((title, key) => {
              return (
                <LoadLink
                  href={title.link}
                  className={cn(
                    "p-2 hover:bg-blue-200 hover:border-l-2 dark:hover:text-google-darkGrey hover:border-l-google-blue",
                    pathname !== "/" &&
                      title.link.startsWith(active) &&
                      "bg-blue-200 dark:text-google-darkGrey",
                    pathname == "/" &&
                      active.startsWith(title.link) &&
                      "bg-blue-200 dark:text-google-darkGrey"
                  )}
                  onClick={() => setActive(title.link)}
                  key={key}
                >
                  {title.title}
                </LoadLink>
              );
            })}
            {!session
              ? NavbarData.navbarSpatialNotLoggedIn.map((title, key) => {
                  return (
                    <LoadLink
                      href={title.link}
                      className={cn(
                        "p-2 hover:bg-blue-200 hover:border-l-2 dark:hover:text-google-darkGrey hover:border-l-google-blue",
                        pathname !== "/" &&
                          title.link.startsWith(active) &&
                          "bg-blue-200 dark:text-google-darkGrey",
                        pathname == "/" &&
                          active.startsWith(title.link) &&
                          "bg-blue-200 dark:text-google-darkGrey"
                      )}
                      key={key}
                      onClick={() => setActive(title.link)}
                    >
                      {title.title}
                    </LoadLink>
                  );
                })
              : NavbarData.navbarSpatialLoggedIn
                  .slice(0, 1)
                  .map((title, key) => {
                    return (
                      <LoadLink
                        href={title.link}
                        className={cn(
                          "p-2 hover:bg-blue-200 hover:border-l-2 dark:hover:text-google-darkGrey hover:border-l-google-blue",
                          pathname !== "/" &&
                            title.link.startsWith(active) &&
                            "bg-blue-200 dark:text-google-darkGrey",
                          pathname == "/" &&
                            active.startsWith(title.link) &&
                            "bg-blue-200 dark:text-google-darkGrey"
                        )}
                        key={key}
                        onClick={() => setActive(title.link)}
                      >
                        {title.title}
                      </LoadLink>
                    );
                  })}
          </div>
        )}
      </div>
      <TopLoading />
    </nav>
  );
}
