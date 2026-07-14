import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

const DashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="text-3xl font-bold">
                Welcome, {session.user.name}
            </h1>

            <p className="mt-2 text-slate-600">
                You are logged in successfully.
            </p>
        </main>
    );
};

export default DashboardPage;