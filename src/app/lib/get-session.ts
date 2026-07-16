import { cookies } from "next/headers";


export async function getSession() {

    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");


    console.log("SERVER COOKIES:", cookieHeader);


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        }
    );


    const data = await res.json();


    console.log("BETTER AUTH RESPONSE:", data);


    return data;
}