import { cookies } from "next/headers";


export async function getSession() {

    const cookieStore = await cookies();


    const cookieHeader = cookieStore
        .getAll()
        .map(
            ({ name, value }) =>
                `${name}=${value}`
        )
        .join("; ");


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
            method: "GET",
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        }
    );


    if (!res.ok) {
        console.log(
            "Session request failed:",
            res.status
        );

        return null;
    }


    const session = await res.json();


    console.log(
        "SERVER SESSION:",
        session
    );


    return session;
}