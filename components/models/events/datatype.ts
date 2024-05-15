export interface EventsResponse {
    count: number;
    next: null;
    previous: null;
    results: Event[];
}

export interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    stop_date: string;
    mode: string;
    slug: string;
    technologies: number[];
    volunteers: number[];
}
