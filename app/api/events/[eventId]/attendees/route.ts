import { authOptions } from '@/lib/auth';
import { AuthRoles } from '@/lib/constants/auth';
import { EVENTS_DJANGO_URL, EVENT_ATTENDEE_LIST_URL_SUFFIX } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { eventId: number } }) {
    const session = await getServerSession(authOptions)
    const allowedRoles = [AuthRoles.organizer, AuthRoles.Xorganizer]
    if (!session) {
        return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
    }
    let matchRole = allowedRoles.findIndex(r => r == session?.user.profile.event_role)
    let matchEvent = session?.user?.profile?.x_event == params.eventId

    if (!session || matchRole == -1 || !matchEvent) {
        return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
    }
    const response = await bkFetch(`${EVENTS_DJANGO_URL}${params.eventId}${EVENT_ATTENDEE_LIST_URL_SUFFIX}`, {
        method: "GET",
        cache: 'no-store'
    });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
}