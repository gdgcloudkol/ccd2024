import React from "react";
import ContentData from "@/public/assets/content/Sponsors/content.json";
import logo from "@/public/assets/images/cp/gdev.svg";
import dyno from "@/public/assets/images/cp/dynopii.png";
import apyhub from "@/public/assets/images/cp/apyhub.png";
import wnb from "@/public/assets/images/cp/wnb.png";
import tg from "@/public/assets/images/cp/tg.png";

const Sponsors = () => {
  return (
    <div className='bg-white text-black px-4 mt-[-1px] '>
      <div className='max-w-screen-lg mx-auto py-10 max-sm:contents '>
        <h1 className='text-4xl lg:text-7xl font-bold flex justify-center'>
          {ContentData.sponsorheading}
        </h1>
        <h3 className='  md:text-2xl text-lg px-20 py-2 font-medium text-center max-sm:contents justify-center'>
          <p>{ContentData.sponsorparagraph}</p>
          <a
            className='text-google-blue underline max-sm:block'
            href={`mailto:${ContentData.sponsoremail}`}
          >
            {ContentData.sponsoremail}
          </a>
        </h3>
      </div>
      <div className='py-4 title-sponsor '>
        <div>
          <h1 className='text-4xl pt-10 font-bold flex justify-center '>
            {ContentData.sponsortitle}
          </h1>
          <img className='py-4 block mx-auto' src={logo.src} alt='sponsor logo' />
        </div>
      </div>
      {/* <div className=' py-4 gold-sponsor '>
          <div>
            <h1 className='text-4xl font-bold flex justify-center '>
              {ContentData.goldsponsor}
            </h1>
            <img className='py-4 block mx-auto' src={dyno.src} alt='' />
          </div>
        </div>
        <div className=' py-4 silver-sponsor '>
          <div>
            <h1 className='text-4xl font-bold flex justify-center '>
              {ContentData.silversponsor}
            </h1>
            <img className='py-4 block mx-auto' src={dyno.src} alt='' />
          </div>
        </div>
        <div className=' py-4 dg-media-sponsor '>
          <div>
            <h1 className='text-4xl font-bold flex justify-center '>
              {ContentData.digitalsponsor}
            </h1>
            <img className='py-4 block mx-auto' src={dyno.src} alt='' />
          </div>
        </div> */}

      <h1 className='text-4xl lg:text-7xl font-bold flex justify-center mt-36'>
        {ContentData.pastsponsor}
      </h1>
      <div className='py-4 lg:flex flex-wrap w-full max-w-6xl mx-auto'>
        <img className='py-4 block mx-auto h-44' src={apyhub.src} alt='Apyhub logo' />
        <img className='py-4 block mx-auto h-44' src={dyno.src} alt='Dynopii Logo' />
        <img className='py-4 block mx-auto h-44' src={tg.src} alt='The Telegraph Logo' />
        <img className='py-4 block mx-auto h-44' src={wnb.src} alt='Weights and Bias Logo' />
      </div>
    </div>
  );
};

export default Sponsors;
