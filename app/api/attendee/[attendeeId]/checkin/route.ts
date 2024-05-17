import { ATTENDEES_DJANGO_URL, EVENT_ATTENDEE_CHECKIN_SUFFIX } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { attendeeId: number } }) {
    const body = await req.json()
    const response = await bkFetch(ATTENDEES_DJANGO_URL + body.id + EVENT_ATTENDEE_CHECKIN_SUFFIX, {
        method: "POST",
        cache: 'no-store',
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}