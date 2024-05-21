/* eslint-disable @next/next/no-img-element */
import { cn, convertTimeFormat } from "@/lib/utils";
import { Event, EventsResponse } from "./models/events/datatype";
import { Button } from "./ui/button";
import { Attendee } from "./models/attendees/datatype";
import { Ban, Ticket, TicketCheck, TicketX } from "lucide-react";
import EventApply from "./EventApply";
import { TicketChoices } from "@/lib/constants/tickets";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import LoadLink from "./blocks/LoadLink";
import { Session } from "next-auth";
export function returnVariant(ticketChoice: string | undefined) {
  if (!ticketChoice || ticketChoice == undefined) return "default";
  switch (ticketChoice) {
    case TicketChoices.applied:
      return "default";

    case TicketChoices.approved:
      return "success";
    case TicketChoices.rejected:
      return "destructive";

    default:
      return "warning";
  }
}
function returnIcon(ticketChoice: string | undefined) {
  if (!ticketChoice || ticketChoice == undefined) return "default";
  switch (ticketChoice) {
    case TicketChoices.applied:
      return <TicketCheck className='h-4 w-4 mr-2' />;

    case TicketChoices.approved:
      return <TicketCheck className='h-4 w-4 mr-2' />;
    case TicketChoices.rejected:
      return <TicketX className='h-4 w-4 mr-2' />;

    default:
      return <Ticket className='h-4 w-4 mr-2' />;
  }
}
function EventCard({
  events,
  attendees,
  session,
}: {
  events: EventsResponse | undefined;
  attendees: Attendee[] | undefined;
  session?: Session | null;
}) {
  // Create a map to store the applied status for each event
  const eventApplicationStatus = new Map<number, string>();

  if (attendees && attendees?.length > 0)
    attendees?.forEach((attendee) => {
      eventApplicationStatus.set(
        attendee.event,
        JSON.stringify({
          status: attendee.status,
          id: attendee.id,
          checked_in: attendee.checked_in,
        })
      );
    });
  return events?.results?.map((card: Event) => (
    <div
      key={card.id}
      className={cn(
        "bg-white w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-10",
        card.slug == FeatureRule.testEventSlug &&
          "border-red-500 border-4 bg-slate-300"
      )}
    >
      <div className='flex flex-col items-center justify-center relative p-2 '>
        <img
          className='w-full h-auto'
          src={"/assets/images/contestCard.png"}
          alt={`Event ${card.title}`}
        />
        <div className='content absolute'>
          {card.slug == FeatureRule.testEventSlug ? (
            <p className='text-center text-google-red uppercase font-bold text-xl'>
              Test Event
            </p>
          ) : (
            <>
              <p className='text-center text-white font-bold text-base'>
                GCCD Extended Events
              </p>
              <p className='text-center text-google-blue font-bold'>X</p>
              <p className='text-center font-bold text-google-yellow'>
                {card.title.split(" x ")[1]}
              </p>
            </>
          )}
        </div>
      </div>
      <div className='p-4 w-full flex flex-col items-start pb-10 space-y-4'>
        <p className='text-gray-900 font-semibold text-lg  block'>
          {card.title}
        </p>
        <p className='text-gray-700 font-bold  text-sm '>
          {card.description.split("::")[0]}
        </p>

        {card.description.split("::")[1] && (
          <p className=' text-gray-700 font-bold  text-sm '>
            Connect with host at:{" "}
            <a
              href={`mailto:${card.description.split("::")[1]}`}
              className='text-google-blue underline inline'
            >
              {card.description.split("::")[1]}
            </a>
          </p>
        )}

        <p className='text-gray-700 font-bold text-sm '>
          Date: {card.start_date.split("T")[0]}
        </p>
        <p className='text-gray-700 font-bold text-sm '>
          Time: {convertTimeFormat(card.start_date)}-{" "}
          {convertTimeFormat(card.stop_date)}
        </p>
        <div className='flex items-center justify-center w-full'>
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

          {eventApplicationStatus?.get(card.id) ? (
            <div className='flex flex-wrap gap-2 w-full'>
              <Button
                variant={returnVariant(
                  JSON.parse(`${eventApplicationStatus.get(card.id)}`)?.status
                )}
                className='capitalize disabled cursor-not-allowed w-full'
                disabled
              >
                {returnIcon(
                  JSON.parse(`${eventApplicationStatus.get(card.id)}`)?.status
                )}
                {JSON.parse(`${eventApplicationStatus.get(card.id)}`)?.status}
              </Button>
              {JSON.parse(`${eventApplicationStatus.get(card.id)}`)
                ?.checked_in && (
                <LoadLink
                  href={`/extended-events/${card.id}/contest`}
                  className='w-full'
                >
                  <Button className='capitalize w-full'>View Contests</Button>
                </LoadLink>
              )}
            </div>
          ) : attendees &&
            attendees.length &&
            attendees?.filter(
              (attendee) => attendee?.status == TicketChoices?.approved
            )?.length >= FeatureRule.disabledContestContent.maxApproved ? (
            <Button disabled>
              <Ban className='h-4 w-4 mr-2' />
              Approved to {FeatureRule.disabledContestContent.maxApproved}{" "}
              events already
            </Button>
          ) : (
            <EventApply
              eventName={card.title}
              eventId={card.id}
              attended={attendees?.length || 0}
              key={card.id}
              session={session}
            />
          )}
        </div>
      </div>
    </div>
  ));
}

export default EventCard;
