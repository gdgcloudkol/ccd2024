import { ATTENDEES_DJANGO_URL, EVENT_WITHDAW_SUFFIX } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { attendeeId: number } }) {
  const response = await bkFetch(`${ATTENDEES_DJANGO_URL}${params.attendeeId}${EVENT_WITHDAW_SUFFIX}`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({})
  });
  const result = await response.text();

  return NextResponse.json(result, { status: response.status });
}