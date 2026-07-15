import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();

    const cookie = cookieStore
        .getAll()
        .map((item) => `${item.name}=${item.value}`)
        .join("; ");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
            headers: {
                Cookie: cookie,
            },
            cache: "no-store",
        }
    );

    const session = await res.json();

    return session;
}