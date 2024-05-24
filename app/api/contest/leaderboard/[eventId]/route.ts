import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const CONTEST_FE_URL = process.env.CONTEST_FE_URL;

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  redirect(`${CONTEST_FE_URL}/leaderboard?eventId=${eventId}`)
}