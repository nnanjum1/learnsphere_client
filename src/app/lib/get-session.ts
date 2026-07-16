import { cookies, headers } from "next/headers";


export async function getSession() {

    const cookieStore = await cookies();
    const headersList = await headers();

    const host = headersList.get("host") || "localhost:3000";
    const proto = headersList.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");


    const res = await fetch(
        `${origin}/api/auth/get-session`,
        {
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        }
    );


    const data = await res.json();

    console.log("SESSION DATA:", data);


    return data;
}