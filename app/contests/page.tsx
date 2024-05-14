// import AlternateHeader from "@/components/blocks/AlternateHeader";
// import Contests from "@/public/assets/content/Contest/content.json";
// export default function page() {
//   return (
//     <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
//       <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
//         <AlternateHeader
//           title={Contests.title}
//           color={Contests.color}
//           description={Contests.description}
//         />
//       </section>
//     </section>
//   );
// }

import React from "react";
import contestData from "@/public/assets/content/Contest/content.json";

function Contest() {
  return (
    <div className="container mx-auto m-10 font-sans">
      <h1 className="text-center font-bold text-[48px] text-amber-500 leading-[61.06px]">
        {contestData.header}
      </h1>
      <p className="text-center text-xl text-white mb-12">
        {contestData.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contestData.cards.map((card) => (
          <div
            key={card.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <a href="#">
              <img
                className="w-full h-auto"
                src="/assets/images/contestCard.png"
                alt="contestCard Image"
              />
            </a>
            <div className="p-4">
              <a
                href="#"
                className="text-gray-900 font-bold text-lg mb-2 block"
              >
                {card.title}
              </a>
              <p className="text-gray-700 text-sm mb-2">{card.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-4 rtl:space-x-reverse mt-3">
                  <img
                    className="w-6 h-6 border-2 border-white rounded-full"
                    src="/assets/images/contestCard.png"
                    alt=""
                  />
                  <img
                    className="w-6 h-6 border-2 border-white rounded-full"
                    src="/assets/images/contestCard.png"
                    alt=""
                  />
                </div>
                <p className="text-black text-sm mt-4">
                  140+ people participate
                </p>
                <a
                  href="#"
                  style={{ backgroundColor: "#4285F4" }}
                  className="inline-block px-3 mt-4 py-2 text-sm font-normal text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 leading-none"
                >
                  Join
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contest;
