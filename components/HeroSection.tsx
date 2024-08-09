"use client";
import dynamic from "next/dynamic";
import HeroData from "@/public/assets/content/HeroSection/content.json";
import EventData from "@/public/assets/content/EventGeneric/content.json";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import Image from "next/image";
import { IconButton } from "./ui/icon-button";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

const HeroBackground = dynamic(() => import("@/components/HeroBackground"));

function HeroSection({ session }: { session: Session | null }) {
  const [ticketState, setTicketState] = useState("");

  return (
    <div className='relative min-h-[90vh] flex flex-col items-center justify-center py-10'>
      <HeroBackground className='absolute h-full w-full z-0' />
      <div className=' w-full flex flex-col lg:gap-6 md:gap-6 gap-4 justify-start items-center text-center z-10'>
        <h1 className='flex gap-2'>
          <span className='relative lg:w-[4.2rem] lg:h-[3.3rem] md:w-[3.6rem] md:h-[2.9rem] w-10 h-8 mt-2'>
            <Image
              src={HeroData.eventHeadingLogo}
              priority
              fill
              alt='gcp logo'
            />
          </span>
          <span className='lg:text-4xl md:text-3xl text-xl mt-4 md:mx-2 mx-0'>
            {HeroData.eventHeading}
          </span>
        </h1>
        <div className='font-bold lg:text-5xl md:text-[2.5rem] text-2xl md:mt-6'>
          {HeroData.event}
        </div>
        <div className='lg:w-3/5 md:w-4/5 lg:text-2xl md:text-xl text-lg px-4'>
          {HeroData.description}
        </div>
        <div className='lg:text-2xl text-lg mt-4'>
          {HeroData.dateTitle}: {EventData.date}
        </div>
        <div className='lg:text-2xl text-lg'>
          {HeroData.locationTitle}:{" "}
          <Link
            href={EventData.venue.mapsLink}
            target='_blank'
            className='hover:underline'
          >
            {" "}
            {EventData.venue.label}{" "}
            <ExternalLink className='size-4 ml-0.5 inline-block' />
          </Link>
        </div>
        {FeatureRule.home.ticketButtonStateLogin == "tc" ||
        FeatureRule.home.ticketButtonStateNotLogin == "tc" ? (
          <Link href={HeroData.ticketButton["tc"].link} target='_blank'>
            <IconButton
              className='py-2 lg:px-8 px-4 lg:text-xl text-lg md:mt-4 group bg-google-red dark:bg-google-red'
              endIcon={<></>}
            >
              {HeroData.ticketButton["tc"].title}
            </IconButton>
          </Link>
        ) : (
          <>
            {session == null && (
              <>
                {FeatureRule.home.ticketButtonStateNotLogin == "gs" && (
                  <Link href={HeroData.ticketButton["gs"].link}>
                    <IconButton
                      className='py-2 lg:px-8 px-4 lg:text-xl text-lg md:mt-4 group'
                      endIcon={
                        <ArrowUpRight
                          size='1em'
                          className='ml-2 rotate-45 group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-150'
                        />
                      }
                    >
                      {HeroData.ticketButton["gs"].title}
                    </IconButton>
                  </Link>
                )}
              </>
            )}
            {session && session?.user && (
              <>
                {!session?.user.profile.student && (
                  <>
                    {FeatureRule.home.ticketButtonStateLogin == "bt" && (
                      <Link
                        href={HeroData.ticketButton["btg"].link}
                        target='_blank'
                      >
                        <IconButton
                          className='py-2 lg:px-8 px-4 lg:text-xl text-lg md:mt-4 group bg-google-green dark:bg-google-green'
                          endIcon={
                            <ArrowUpRight
                              size='1em'
                              className='ml-2 rotate-45 group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-150'
                            />
                          }
                        >
                          {HeroData.ticketButton["btg"].title}
                        </IconButton>
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
