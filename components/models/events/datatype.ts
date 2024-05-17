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
    manager: Manager;
    volunteers: Volunteer[];
}





interface Manager {
    id: number;
    profile: Profile;
    email: string;
}

interface Profile {
    first_name: string;
    last_name: string;
    company: string;
    college: string;
    graduation_year: number;
    pronoun: string;
}

interface Volunteer {
    id: number;
    profile: Profile;
    email: string;
}
