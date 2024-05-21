import { EVENTS_DJANGO_URL } from "@/lib/constants/be";
import bkFetch from "@/services/backend.services";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
    const response = await bkFetch(`${EVENTS_DJANGO_URL}${params.eventId}`, {
        method: "GET",
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
}

export async function POST(req: NextRequest, { params }: { params: { eventId: string } }) {
    const data = await req.json()
    const response = await bkFetch(`${EVENTS_DJANGO_URL}${params.eventId}/apply/`, {
        method: "POST",
        body: JSON.stringify(data)

    });


    if (!response.ok) {
        if (response.headers.get('content-type') == "application/json") {
            const error = await response.json();
            return NextResponse.json(error, { status: response.status });
        }
        else {
            const error = await response.text();

            return NextResponse.json(error, { status: response.status });

        }
    }
    else {
        const result = await response.json();
        return NextResponse.json(result, { status: response.status });
    }
}
