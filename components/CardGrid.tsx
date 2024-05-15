"use client";

import ContestCard from "./ContestCard";
import EventCard from "./EventsCard";
import PeopleCard from "./PeopleCard";
import { GridData } from "./models/cardGrid.model";

function CardGrid({
  gridData,
  type,
}: {
  gridData: GridData;
  type: "Contest" | "People" | "Events";
}) {
  return (
    <div className='container mx-auto m-10 font-sans'>
      <h1 className='text-center font-bold text-[48px] text-google-yellow leading-[61.06px]'>
        {gridData.title}
      </h1>
      <p className='text-center text-xl text-white mb-12'>
        {gridData.description}
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center'>
        {type == "Contest" && (
          <ContestCard cards={gridData.cards || []}></ContestCard>
        )}
        {type == "People" && (
          <PeopleCard cards={gridData.people || []}></PeopleCard>
        )}
        {type == "Events" && (
          <EventCard
            events={gridData.events}
            attendees={gridData.attendees}
          ></EventCard>
        )}
      </div>
    </div>
  );
}

export default CardGrid;
