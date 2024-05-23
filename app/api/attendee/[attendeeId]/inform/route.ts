import { authOptions } from '@/lib/auth';
import { AuthRoles } from '@/lib/constants/auth';
import { ATTENDEES_DJANGO_URL, EVENT_ATTENDEE_INFORM_URL_SUFFIX } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { attendeeId: number } }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
    }
    const allowedRoles = [AuthRoles.organizer, AuthRoles.Xorganizer, AuthRoles.xsubOrganizer]

    let matchRole = allowedRoles.findIndex(r => r == session?.user.profile.event_role)


    if (matchRole == -1) {
        return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
    }


    const response = await bkFetch(`${ATTENDEES_DJANGO_URL}${params.attendeeId}${EVENT_ATTENDEE_INFORM_URL_SUFFIX}`, {
        method: "POST",
        cache: 'no-store',
        body: JSON.stringify({ status: "sent" })
    });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
}