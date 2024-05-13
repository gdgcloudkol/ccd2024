import React from "react";
import CommunityData from "@/public/assets/content/CommunityPartners/content.json";
import GdscBanner from "./GdscBanner";

const CommunityPartners = () => {
  return (
    <div>
      <div className='bg-background py-10 px-4'>
        <h1 className='text-4xl lg:text-7xl text-google-yellow font-bold flex justify-center text-center '>
          {CommunityData.title}
        </h1>
        <h3 className='md:text-2xl text-lg py-6 font-medium w-full text-center max-sm:justify-center '>
          {CommunityData.description}
        </h3>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center m-8'>
          {CommunityData.community.map((item) => (
            <div
              key={`community-partner-${item.name}`}
              className={`bg-white p-4 rounded ${item.hidden ? 'grayscale' : ''}`}
            >
              {!item.logo ? (
                <a href={item.hyperlink}>
                  <GdscBanner label={item?.name} />
                </a>
              ) : (
                <>
                  {/* Else Part */}
                  <div className={`w-64 h-64 col-span-1  md:col-span-2 lg:col-span-1 align-middle rounded-lg text-black ${item.hidden ? 'grayscale' : ''}`}>
                    <div className='w-fit flex justify-center'>
                      {/* <Image src={item.logo} width='100' height='100' alt="" /> */}
                      <a href={item.hyperlink}>
                        <img src={item.logo} alt='' className='w-full' />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPartners;
