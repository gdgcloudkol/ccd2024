import { USERS_DJANGO_URL } from '@/lib/constants/be';
import bkFetch from '@/services/backend.services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    const response = await bkFetch(USERS_DJANGO_URL, {
        method: "GET",
        cache: 'no-store',
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}