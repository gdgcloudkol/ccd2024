export interface SessionRespsonse {
    groupId: null;
    groupName: string;
    sessions: Session[];
    isDefault: boolean;
}

export interface Session {
    questionAnswers: (QuestionAnswer | QuestionAnswers2)[];
    id: string;
    title: string;
    description: null | string;
    startsAt: string;
    endsAt: string;
    isServiceSession: boolean;
    isPlenumSession: boolean;
    speakers: Speaker[];
    categories: (Category | Categories2)[];
    roomId: number;
    room: string;
    liveUrl: null;
    recordingUrl: null;
    status: null | string;
    isInformed: boolean;
    isConfirmed: boolean;
}

interface Categories2 {
    id: number;
    name: string;
    categoryItems: any[];
    sort: number;
}

interface Category {
    id: number;
    name: string;
    categoryItems: CategoryItem[];
    sort: number;
}

interface CategoryItem {
    id: number;
    name: string;
}

interface Speaker {
    id: string;
    name: string;
}

interface QuestionAnswers2 {
    id: number;
    question: string;
    questionType: string;
    answer: null;
    sort: number;
    answerExtra: null;
}

interface QuestionAnswer {
    id: number;
    question: string;
    questionType: string;
    answer: string;
    sort: number;
    answerExtra: null;
}