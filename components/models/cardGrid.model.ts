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
  header: string;
  description: string;
  cards?: ContestCards[];
  people?: PeopleCards[];
}