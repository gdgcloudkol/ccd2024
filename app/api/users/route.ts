import { USERS_DJANGO_URL } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();

    const response = await bkFetch(USERS_DJANGO_URL, {
        method: "POST",
        cache: 'no-store',
        body: JSON.stringify(data)
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}