"use client";

import Image from "next/image";
import NavbarData from "@/public/assets/content/Navbar/content.json";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className='w-full justify-center md:items-center flex flex-col'>
      {/* desktop navbar */}
      <div className='hidden md:flex h-20 md:gap-10 px-2 lg:gap-x-24 max-w-screen-2xl items-center justify-between'>
        <Link href='/'>
          <Image
            className='dark:brightness-0 dark:invert'
            src={NavbarData["logo-desktop"]}
            alt='navlogo'
            width='250'
            height='40'
          />
        </Link>
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
      <div className='flex md:hidden h-16 px-2 sm:px-6 items-center w-full justify-between'>
        <Link href='/'>
          <Image
            className=''
            src={NavbarData["logo-desktop"]}
            alt='navlogo'
            width='200'
            height='40'
          />
        </Link>
        <button onClick={() => setOpen(!open)}>
          <svg
            viewBox='0 0 32 32'
            width={36}
            height={36}
            enableBackground='new 0 0 32 32'
            id='Editable-line'
            version='1.1'
            xmlSpace='preserve'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#000000'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              <line
                fill='none'
                id='XMLID_103_'
                stroke='#000000'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                strokeWidth='2'
                x1='7'
                x2='25'
                y1='16'
                y2='16'
              ></line>
              <line
                fill='none'
                id='XMLID_102_'
                stroke='#000000'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                strokeWidth='2'
                x1='7'
                x2='25'
                y1='25'
                y2='25'
              ></line>
              <line
                fill='none'
                id='XMLID_101_'
                stroke='#000000'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                strokeWidth='2'
                x1='7'
                x2='25'
                y1='7'
                y2='7'
              ></line>
            </g>
          </svg>
        </button>
      </div>
      {open && (
        <div className='flex md:hidden flex-col p-2 '>
          {NavbarData.navbarPermanent.map((title, key) => {
            return (
              <Link
                href={title.link}
                className='p-2 hover:bg-blue-200 hover:border-l-2 hover:border-l-google-blue'
                key={key}
              >
                {title.title}
              </Link>
            );
          })}
          {NavbarData.navbarSpatialNotLoggedIn.map((title, key) => {
            return (
              <div
                className='p-2 hover:bg-blue-200 hover:border-l-2 hover:border-l-google-blue'
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
