/* eslint-disable @next/next/no-img-element */
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PeopleCards } from "./models/cardGrid.model";
import { useState } from "react";

function PeopleCard({ cards, isToggle = true }: { cards: PeopleCards[], isToggle?: boolean }) {
  const [toggle, setToggle] = useState(isToggle);

  return cards.map((card: PeopleCards) =>
    !isToggle ? (
      <div
        key={card.id}
        className=' relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl bg-white dark:bg-white rounded-[10px] overflow-hidden shadow-lg mb-10 h-[24rem]'
        onClick={() => setToggle(!toggle)}
      >
        <div className='px-4 pb-6 flex justify-center'>
          <div className='text-center my-4'>
            <img
              className='h-32 w-32 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-google-yellow border-b-blue-500 mx-auto my-4'
              src={card.image}
              alt='card-image'
            />
            <div className='py-2 font-google-sans m-4'>
              <h3 className='font-normal text-[28px] text-gray-800 dark:text-gray-900 mb-1 leading-[35.62px] mt-2'>
                {card.title}
              </h3>
              <p className='font-normal text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2'>
                {card.content}
              </p>
              <div className='inline-flex text-xl gap-5 text-gray-700 dark:text-gray-900 items-center mt-5'>
                {card.linkedin && (
                  <a
                    href={card.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaLinkedin />
                  </a>
                )}
                {card.twitter && (
                  <a
                    href={card.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaXTwitter />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        key={card.id}
        onClick={() => setToggle(!toggle)}
        className=' bg-white max-w-2xl dark:bg-white rounded-[10px] overflow-hidden shadow-lg mb-10 h-80'
      >
        <div className='px-4  pb-6'>
          <div className='flex'>
            <div className='text-center'>
              <img
                className='h-16 w-16 rounded-full border-4 border-white dark:border-t-red-500 border-l-green-500 border-r-google-yellow border-b-blue-500 mx-auto my-4'
                src={card.image}
                alt='card-image'
              />
            </div>

            <div className='mx-3 my-3'>
              <h3 className='font-bold text-[14px] text-gray-800 dark:text-gray-900 mb-1 leading-[17.81px] mt-2'>
                {card.title}
              </h3>
              <p className='font-normal text-[12px] text-gray-800 dark:text-gray-900 mb-1 leading-[15.26px] mt-2'>
                {card.content}
              </p>
            </div>
          </div>
          <p className='font-normal text-center text-[14px] text-gray-800 dark:text-gray-900 mt-2 leading-[17.81px]'>
            {card.content}
          </p>
        </div>
      </div>
    )
  );
}

export default PeopleCard;
