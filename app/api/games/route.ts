import { authOptions } from "@/lib/auth";
import { MAINDAYCONTEST_URL } from "@/lib/constants/be";
import bkFetch from "@/services/backend.services";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const response = await bkFetch(MAINDAYCONTEST_URL, {
        method: "GET",
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const data = await req.json()
    const response = await bkFetch(MAINDAYCONTEST_URL, {
        method: "POST",
        body: JSON.stringify({ ...data, added_by: session?.user.pk })
    });
    if (!response.ok) {
        let err = await response.json()
        return NextResponse.json(err, { status: response.status });

    }
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
}