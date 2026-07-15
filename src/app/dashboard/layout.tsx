import { redirect } from "next/navigation";

import { getSession } from "@/app/lib/get-session";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getSession();

    console.log("DASHBOARD SESSION:", session);

    if (!session?.user) {
        redirect("/login");
    }

    console.log("USER ROLE:", session.user.role);

    return (
        <DashboardLayout
            role={session.user.role as "student" | "instructor"}
            name={session.user.name}
        >
            {children}
        </DashboardLayout>
    );
}