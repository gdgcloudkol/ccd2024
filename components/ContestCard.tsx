/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ContestCards, GridData } from "./models/cardGrid.model";
import { ContestResponse } from "./models/contests/datatype";
import { Button } from "./ui/button";
import ContestStart from "@/components/ContestStart";

function ContestCard({ contests }: { contests: GridData }) {
  return (
    <>
      {contests?.contests?.map((card: ContestResponse) => (
        <div
          key={card.id}
          className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-10'
        >
            <div className='flex flex-col items-center justify-center relative'>
              <img
                className='w-full h-auto '
                src={"/assets/images/contestCard.png"}
                alt={`Contest ${card.contest.title}`}
              />
              <div className='content absolute'>
                <p className='text-center text-white font-bold text-base'>
                  GCCD Extended Events
                </p>

                <p className='text-center text-lg font-bold text-google-yellow'>
                  {card.contest.title}
                </p>
              </div>
            </div>

            <div className='p-4 flex flex-col items-center pb-10'>
              <p className='text-gray-900 font-bold text-lg mb-2 block'>
                {card.contest.title}
              </p>
              <p className='text-gray-700 text-sm mb-2 min-h-14'>
                {card.contest.description}
              </p>
              <div className='flex items-center justify-center'>
                {/* <div className="flex -space-x-4 rtl:space-x-reverse mt-3">
                <img
                  className="w-6 h-6 border-[1px] border-black rounded-full"
                  src="/assets/images/mascot.webp"
                  alt=""
                />
                <img
                  className="w-6 h-6 border-[1px] border-black rounded-full"
                  src="/assets/images/mascot.webp"
                  alt=""
                />
              </div>
              <p className="text-black text-sm mt-4">
                140+ people participate
              </p> */}
                <ContestStart contestId={card.contest.id} contestUri={card.contest.contest_uri} />
              </div>
            </div>
        </div>
      ))}
    </>
  );
}

export default ContestCard;
