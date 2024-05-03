import { NextResponse, NextRequest } from 'next/server'
import dsFetch from "@/lib/dialsense-api";
export async function POST(req: NextRequest) {

  const data = await req.json();

  const response = await dsFetch("/users/callchimp_signup/", {
    method: "POST",
    body: JSON.stringify({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password
    })
  });

  const result = await response.json();
  return NextResponse.json(result, { status: response.status });
}
