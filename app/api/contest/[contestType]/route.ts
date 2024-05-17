import { USER_DJANGO_CONTEST_TOKEN } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const CONTEST_FE_URL = process.env.CONTEST_FE_URL;

export async function GET(req: NextRequest, { params }: { params: { contestType: string } }) {
  const contestType = params.contestType;
  console.log(contestType);
  const response = await bkFetch(USER_DJANGO_CONTEST_TOKEN, {
    method: "POST",
    cache: 'no-store'
  });

  // const result = await response.json();  
  const result = {
    startToken: '123'
  }
  if (CONTEST_FE_URL)
    redirect(`${CONTEST_FE_URL}/?contestType=${contestType}&?token=${result.startToken}`)
  redirect('/login')
}