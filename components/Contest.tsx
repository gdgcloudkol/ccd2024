// import React from "react";
// import contestData from "@/public/assets/content/Contest/content.json";

// function Contest() {
//   return (
//     <div className="container mx-auto px-44">
//       <h1 className="absolute w-[209px] h-[61px] left-[616px] top-[144px] font-google-sans font-bold text-4xl leading-[61px] flex items-center justify-center text-amber-500">
//         {contestData.header}
//       </h1>
//       <p className="absolute w-[865px] h-[72px] left-[288px] top-[213px] font-google-sans font-normal text-xl leading-[36px] flex items-center justify-center text-center text-white">
//         {contestData.description}
//       </p>
//       <div className="grid grid-cols-4 gap-4 mt-60">
//         {contestData.cards.map((card) => (
//           <div
//             key={card.id}
//             className="max-w-sm bg-white border border-gray-200 rounded-[10px] shadow dark:bg-white dark:border-gray-700 p-2"
//           >
//             <a href="#">
//               <img
//                 className="rounded-t-lg"
//                 src="/assets/images/contestCard.png"
//                 alt="contestCard Image"
//               />
//             </a>
//             <div className="mt-5">
//               <a href="#">
//                 <h5 className="mb-2 font-google-sans text-[14px] font-bold tracking-tight leading-[17.81px] text-gray-900 dark:text-gray-900">
//                   {card.title}
//                 </h5>
//               </a>
//               <p className="mb-2 text-[10px] font-google-sans font-normal text-gray-700 dark:text-gray-400 leading-[12.72px]">
//                 {card.content}
//               </p>
//               <div className="flex justify-between mt-5">
//                 <div className="flex -space-x-4 rtl:space-x-reverse mt-3">
//                   <img
//                     className="w-[26px] h-[26px] top-[591px] left-[169px] border-[1px] border-white rounded-full dark:border-gray-800"
//                     src="/assets/images/contestCard.png"
//                     alt=""
//                   />
//                   <img
//                     className="w-[26px] h-[26px] top-[591px] left-[169px] border-[1px] border-white rounded-full dark:border-gray-800"
//                     src="/assets/images/contestCard.png"
//                     alt=""
//                   />
//                 </div>
//                 <p className="text-black mt-4 text-[10px] leading-[12.72px] font-google-sans font-normal ">
//                   140+ people participate
//                 </p>
//                 <a
//                   href="#"
//                   style={{ backgroundColor: "#4285F4" }}
//                   className="inline-flex items-center justify-center px-3 py-2 text-[18px] font-google-sans font-normal text-center text-white rounded-[10px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 leading-[22.9px] w-[94px] h-[38px] top-[585px] left-[333px]"
//                 >
//                   Join
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Contest;
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
              <a href="#" className="text-gray-900 font-bold text-lg mb-2 block">
                {card.title}
              </a>
              <p className="text-gray-700 text-sm mb-2">
                {card.content}
              </p>
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
