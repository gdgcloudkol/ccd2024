import { USERS_DJANGO_URL, USER_DJANGO_CONTEST_TOKEN } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const CONTEST_FE_URL = process.env.CONTEST_FE_URL;

export async function GET(req: NextRequest, { params }: { params: { questionSet: string, contestType: string } }) {
  const contestType = params.contestType;
  const questionSet = params.questionSet;


  const response = await bkFetch(USER_DJANGO_CONTEST_TOKEN, {
    method: "POST",
    cache: 'no-store'
  });

  // const result = await response.json();  
  const result = {
    startToken: '123'
  }
  if (CONTEST_FE_URL)
    redirect(`${CONTEST_FE_URL}/${contestType}?questionSet=${questionSet}&?token=${result.startToken}`)
  redirect('/login')
}