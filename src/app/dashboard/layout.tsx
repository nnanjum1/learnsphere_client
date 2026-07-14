import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

import DashboardLayout from "@/app/components/dashboard/DashboardLayout";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <DashboardLayout
            role={session.user.role as "student" | "instructor"}
            name={session.user.name}
        >
            {children}
        </DashboardLayout>
    );
}