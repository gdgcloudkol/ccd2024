export interface ContestResponse {
    id: number;
    contest: Contest;
    start_time: string;
    end_time: string;
    event: number;
}

interface Contest {
    id: number;
    title: string;
    description: string;
    duration: number;
    contest_type: string;
    contest_uri: string;
}