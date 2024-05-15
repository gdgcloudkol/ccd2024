/* eslint-disable @next/next/no-img-element */
import { convertTimeFormat } from "@/lib/utils";
import { Event, EventsResponse } from "./models/events/datatype";
import { Button } from "./ui/button";
import { Attendee } from "./models/attendees/datatype";
import { Ban, TicketCheck } from "lucide-react";
import EventApply from "./EventApply";

function EventCard({
  events,
  attendees,
}: {
  events: EventsResponse | undefined;
  attendees: Attendee[] | undefined;
}) {
  // Create a map to store the applied status for each event
  const eventApplicationStatus = new Map<number, string>();

  if (attendees?.length)
    attendees?.forEach((attendee) => {
      eventApplicationStatus.set(attendee.event, attendee.status);
    });

  return events?.results?.map((card: Event) => (
    <div
      key={card.id}
      className='bg-white w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-10'
    >
      <div className='flex flex-col items-center justify-center relative'>
        <img
          className='w-full h-auto '
          src={"/assets/images/contestCard.png"}
          alt={`Event ${card.title}`}
        />
        <div className='content absolute'>
          <p className='text-center text-white font-bold text-base'>
            GCCD Extended Events
          </p>
          <p className='text-center text-google-blue font-bold'>X</p>
          <p className='text-center font-bold text-google-yellow'>
            {card.title.split(" x ")[1]}
          </p>
        </div>
      </div>

      <div className='p-4 flex flex-col items-start pb-10 space-y-4'>
        <p className='text-gray-900 font-semibold text-lg  block'>
          {card.title}
        </p>
        <p className='text-gray-700 font-bold  text-sm '>{card.description}</p>
        <p className='text-gray-700 font-bold text-sm '>
          Date: {card.start_date.split("T")[0]}
        </p>
        <p className='text-gray-700 font-bold text-sm '>
          Time: {convertTimeFormat(card.start_date)}-{" "}
          {convertTimeFormat(card.stop_date)}
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

          {/* Fetch event id from the MAP and set ticket status accordingly. */}

          {eventApplicationStatus.get(card.id) ? (
            <Button
              variant={
                eventApplicationStatus.get(card.id) == "applied"
                  ? "warning"
                  : "success"
              }
              className='capitalize disabled cursor-not-allowed w-full'
            >
              <TicketCheck className='h-4 w-4 mr-2' />
              {eventApplicationStatus.get(card.id)}
            </Button>
          ) : attendees && attendees?.length > 4 ? (
            <Button>
              <Ban className='h-4 w-4 mr-2' />
              Applied to 3 events already
            </Button>
          ) : (
            <EventApply
              eventName={card.title}
              eventId={card.id}
              attended={attendees?.length || 0}
              key={card.id}
            />
          )}
        </div>
      </div>
    </div>
  ));
}

export default EventCard;
