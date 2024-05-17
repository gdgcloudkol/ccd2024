import { authOptions } from '@/lib/auth';
import { AuthRoles } from '@/lib/constants/auth';
import { EVENTS_DJANGO_URL, EVENT_ATTENDEE_CONTEST_AUTH_TOKEN_URL } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions)
	const data = await req.json();
	
	const allowedRoles = [AuthRoles.organizer, AuthRoles.Xorganizer, AuthRoles.Xvolunteer, AuthRoles.attendee]
	if (!session) {
		return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
	}
	let matchRole = allowedRoles.findIndex(r => r == session?.user.profile.event_role)
	// let matchEvent = session?.user?.profile?.x_event == params.eventId
	
	if (!session || matchRole == -1) {
		return NextResponse.json({ message: "You do not have permission for this action" }, { status: 401 });
	}
	
	const response = await bkFetch(`${EVENT_ATTENDEE_CONTEST_AUTH_TOKEN_URL}`, {
		method: "POST",
		cache: 'no-store',
		body: JSON.stringify({
			contest: data.contestId
		})
	});
	
	const result = await response.json();
	return NextResponse.json(result, { status: response.status });
}