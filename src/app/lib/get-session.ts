import { cookies } from "next/headers";


export async function getSession() {

    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");


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

    console.log("SESSION DATA:", data);


    return data;
}