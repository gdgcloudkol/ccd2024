import React from "react";
import ContentData from "@/public/assets/content/Sponsors/content.json";
import logo from "@/public/assets/images/gdev.svg";
import dyno from "@/public/assets/images/dyno.svg";

const Sponsors = () => {
  return (
    <div>
      <div className='bg-white text-black px-4'>
        <div className='max-w-screen-lg mx-auto py-10 max-sm:contents '>
          <h1 className='text-4xl font-bold flex justify-center '>
            {ContentData.sponsorheading}
          </h1>
          <h3 className='  md:text-2xl text-lg px-20 py-2 font-medium text-center max-sm:contents justify-center'>
            <p>{ContentData.sponsorparagraph}</p>
            <a
              className='text-google-blue underline max-sm:block'
              href='mailto:partners@gdgcloud.org'
            >
              {ContentData.sponsoremail}
            </a>
          </h3>
        </div>
        <div className=' py-4 title-sponsor '>
          <div>
            <h1 className='text-4xl font-bold flex justify-center '>
              {ContentData.sponsortitle}
            </h1>
            <img className='py-4 block mx-auto' src={logo.src} alt='' />
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
      </div>
    </div>
  );
};

export default Sponsors;
