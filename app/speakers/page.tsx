// import AlternateHeader from "@/components/blocks/AlternateHeader";
// import Speakers from "@/public/assets/content/Speakers/content.json";
// export default function page() {
//   return (
//     <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
//       <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
//         <AlternateHeader
//           title={Speakers.title}
//           color={Speakers.color}
//           description={Speakers.description}
//         />
//       </section>
//     </section>
//   );
// }

import React from "react";
import speakerContent1 from "@/public/assets/content/Speakers/content1.json";
import speakerContent2 from "@/public/assets/content/Speakers/content2.json";
import speakerContent3 from "@/public/assets/content/Speakers/content3.json";
import speakerContent4 from "@/public/assets/content/Speakers/content4.json";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Speakers() {
  return (
    <>
      <div className="container mx-auto m-10 font-sans">
        <h1 className="text-center font-google-sans font-bold text-[48px] text-green-500 leading-[61.06px]">
          {speakerContent1.header}
        </h1>
        <p className="text-center font-google-sans font-normal text-[28px] text-white mb-12 leading-[35.62px]">
          {speakerContent1.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 via-red-500 to-yellow-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            {speakerContent1.card1.map((card1) => (
              <div className="relative max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
                <div className="px-4 pb-6">
                  <div className="text-center my-4">
                    <img
                      className="h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-4"
                      src="/assets/images/Ellipse 34.png"
                      alt=""
                    />
                    <div className="py-2 font-google-sans m-4">
                      <h3 className="font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2">
                        {card1.title}
                      </h3>
                      <p className="font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                        {card1.content}
                      </p>
                      <div className="inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5">
                        {card1.linkedinIcon && (
                          <a
                            href={card1.linkedinIcon}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin />
                          </a>
                        )}
                        {card1.twitterIcon && (
                          <a
                            href={card1.twitterIcon}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaXTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {speakerContent1.cards2.map((card2) => (
            <div className="max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
                <div className="px-4  pb-6">
                  <div className="flex">
                    <div className="text-center">
                      <img
                        className="h-16 w-16 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-4"
                        src="/assets/images/Ellipse 34.png"
                        alt=""
                      />
                    </div>

                    <div className="mx-3 my-3">
                      <h3 className="font-bold text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                        {card2.title}
                      </h3>
                      <p className="font-normal text-[12px] text-gray-800 dark:text-gray-900 mb-1 leading-[15.26px] mt-2">
                        {card2.content}
                      </p>
                    </div>
                  </div>
                  <p className="font-normal text-center text-[14px] text-gray-800 dark:text-gray-900 mt-2 leading-[17.81px]">
                    {card2.description}
                  </p>
                </div>
              </div>
          ))}

          {speakerContent1.cards3.map((card3) => (
            <div className="max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-4"
                    src="/assets/images/Ellipse 34.png"
                    alt=""
                  />
                  <div className="py-2 font-google-sans m-4">
                    <h3 className="font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2">
                      {card3.title}
                    </h3>
                    <p className="font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                      {card3.content}
                    </p>
                    <div className="inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5">
                      {card3.linkedinIcon && (
                        <a
                          href={card3.linkedinIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {card3.twitterIcon && (
                        <a
                          href={card3.twitterIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto m-10 font-sans">
        <h1 className="text-center font-google-sans font-bold text-[48px] text-amber-500 leading-[61.06px]">
          {speakerContent2.header}
        </h1>
        <p className="text-center font-google-sans font-normal text-[28px] text-white mb-12 leading-[35.62px]">
          {speakerContent2.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {speakerContent2.cards.map((card) => (
            <div className="max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-4"
                    src="/assets/images/Ellipse 34.png"
                    alt=""
                  />
                  <div className="py-2 font-google-sans m-4">
                    <h3 className="font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2">
                      {card.title}
                    </h3>
                    <p className="font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                      {card.content}
                    </p>
                    <div className="inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5">
                      {card.linkedinIcon && (
                        <a
                          href={card.linkedinIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {card.twitterIcon && (
                        <a
                          href={card.twitterIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto m-10 font-sans">
        <h1 className="text-center font-google-sans font-bold text-[48px] text-blue-500 leading-[61.06px]">
          {speakerContent3.header}
        </h1>
        <p className="text-center font-google-sans font-normal text-[28px] text-white mb-12 leading-[35.62px]">
          {speakerContent3.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {speakerContent3.cards.map((card) => (
            <div className="max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-4"
                    src="/assets/images/Ellipse 34.png"
                    alt=""
                  />
                  <div className="py-2 font-google-sans m-4">
                    <h3 className="font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2">
                      {card.title}
                    </h3>
                    <p className="font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                      {card.content}
                    </p>
                    <div className="inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5">
                      {card.linkedinIcon && (
                        <a
                          href={card.linkedinIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {card.twitterIcon && (
                        <a
                          href={card.twitterIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto m-10 font-sans">
        <h1 className="text-center font-google-sans font-bold text-[48px] text-red-500 leading-[61.06px]">
          {speakerContent4.header}
        </h1>
        <p className="text-center font-google-sans font-normal text-[28px] text-white mb-12 leading-[35.62px]">
          {speakerContent4.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {speakerContent4.cards.map((card) => (
            <div className="max-w-sm bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-amber-500 border-b-blue-500 mx-auto my-8"
                    src="/assets/images/Ellipse 34.png"
                    alt=""
                  />
                  <div className="py-2 font-google-sans">
                    <h3 className="font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2">
                      {card.title}
                    </h3>
                    <p className="font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2">
                      {card.content}
                    </p>
                    <div className="inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5">
                      {card.linkedinIcon && (
                        <a
                          href={card.linkedinIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {card.twitterIcon && (
                        <a
                          href={card.twitterIcon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Speakers;
