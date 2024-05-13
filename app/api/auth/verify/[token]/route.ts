import { VERITY_EMAIL_DJANGO_URL } from '@/lib/constants/be';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    const { token } = params;

    const response = await fetch(VERITY_EMAIL_DJANGO_URL + token + "/", {
        method: "GET",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (response.ok) {
        redirect("/login")
    }
    return NextResponse.json(result, { status: response.status });
}