"use client";

import ContestCard from "./ContestCard";
import PeopleCard from "./PeopleCard";
import { GridData } from "./models/cardGrid.model";

function CardGrid({ gridData, type }: { gridData: GridData, type: 'Contest' | 'Person' }) {
  return (
    <div className="container mx-auto m-10 font-sans">
      <h1 className="text-center font-bold text-[48px] text-amber-500 leading-[61.06px]">
        {gridData.header}
      </h1>
      <p className="text-center text-xl text-white mb-12">
        {gridData.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center">
        {type === 'Contest' ? (
          <ContestCard cards={gridData.cards || []} ></ContestCard>
        ) : (
          <PeopleCard cards={gridData.people || []} ></PeopleCard>
        )
        }
      </div>
    </div>
  );
}

export default CardGrid;
