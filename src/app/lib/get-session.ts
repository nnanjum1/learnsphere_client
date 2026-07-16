import { cookies } from "next/headers";


export async function getSession() {

    const cookieStore = await cookies();

    const cookiesHeader = cookieStore
        .getAll()
        .map(
            ({ name, value }) =>
                `${name}=${value}`
        )
        .join(";");


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
            headers: {
                Cookie: cookiesHeader,
            },
            cache: "no-store",
        }
    );


    if (!res.ok) {
        return null;
    }


    return await res.json();
}