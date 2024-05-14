import { LOGIN_DJANGO_URL } from '@/lib/constants/be';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const response = await fetch(LOGIN_DJANGO_URL, {
    method: "POST",
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.status === 200) {
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  }
  return NextResponse.json({ message: 'Login failed' }, { status: response.status });
}