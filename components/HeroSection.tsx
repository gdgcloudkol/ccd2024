import React from 'react'
import dynamic from "next/dynamic";
import HeroData from "@/public/assets/content/HeroSection/content.json";
import Image from 'next/image';
import { IconButton } from './ui/button';

const HeroBackground = dynamic(() => import("@/components/HeroBackground"));

function HeroSection() {
    return (
        <div className='relative overflow-hidden'>
            <HeroBackground className=' h-[80vh]'/>
            <div className='absolute lg:top-20 md:top-28 top-20 w-full flex flex-col lg:gap-6 md:gap-6 gap-4 justify-center items-center text-center'>
                <h1 className='flex gap-2'>
                    <span className='relative lg:w-[4.2rem] lg:h-[3.3rem] md:w-[3.6rem] md:h-[2.9rem] w-10 h-8 mt-2'>
                        <Image
                            src={HeroData.eventHeadingLogo}
                            fill
                            alt='gcp logo'
                        />
                    </span>
                    <span className='lg:text-4xl md:text-3xl text-xl mt-4 md:mx-2 mx-0'>{HeroData.eventHeading}</span>
                </h1>
                <div className='font-bold lg:text-5xl md:text-[2.5rem] text-2xl md:mt-6'>
                    {HeroData.event}
                </div>
                <div className='lg:w-3/5 md:w-4/5 lg:text-2xl md:text-xl text-sm px-4'>
                    {HeroData.description}
                </div>
                <div className='lg:text-xl text-sm mt-4'>
                    {HeroData.dateTitle}: {HeroData.date}
                </div>
                <div className='lg:text-xl text-sm'>
                    {HeroData.locationTitle}: {HeroData.locationName}
                </div>
                <IconButton className='py-2 px-4 lg:text-[1.75rem] md:text-2xl md:mt-4'>
                    {HeroData.ticketButton[1].title}
                </IconButton>
            </div>
        </div>
    )
}

export default HeroSection