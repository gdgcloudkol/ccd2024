export interface Attendee {
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    user: User;
    event: number;
}

interface User {
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