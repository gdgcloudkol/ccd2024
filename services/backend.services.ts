import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// const BASE_URL = process.env.API_BASE_URL;

async function bkFetch(path: string, options: object, accept = 'application/json', content_type = 'application/json') {

    const session = await getServerSession(authOptions);
    const headers = {
        'Content-Type': content_type,
        'Authorization': `Bearer ${session?.access}`,
        'Accept': accept,
        // Add other headers as needed
    };
    const data = fetch(`${path}`, {
        headers,
        ...options,
    })
    return data

}

export default bkFetch;
