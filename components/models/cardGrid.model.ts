import { Attendee } from "./attendees/datatype";
import { EventsResponse } from "./events/datatype";

export interface ContestCards {
  id: number;
  title: string;
  content: string;
  link?: string;
  image: string;
}

export interface PeopleCards extends ContestCards {
  linkedin: string;
  twitter: string;
}

export interface GridData {
  title?: string;
  header?: string;
  description: string;
  cards?: ContestCards[];
  people?: PeopleCards[];
  events?: EventsResponse;
  attendees?: Attendee[]
}

