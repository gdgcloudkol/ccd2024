import { authOptions } from '@/lib/auth';
import { EVENTS_DJANGO_URL, EVENT_SUBMANAGER_REMOVE_URL_SUFFIX } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "You are not allowed to perform this action" }, { status: 401 });
    }
    const data = await req.json();
    const eventId = session?.user.profile.x_event
    const response = await bkFetch(EVENTS_DJANGO_URL + eventId + EVENT_SUBMANAGER_REMOVE_URL_SUFFIX, {
        method: "POST",
        cache: 'no-store',
        body: JSON.stringify({ email: data.email })
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}