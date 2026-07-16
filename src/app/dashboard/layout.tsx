import { ReactNode } from "react";
import { getSession } from "@/app/lib/get-session";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {

    const session = await getSession();



    if (!session?.user) {
        redirect("/login");
    }

    return (
        <DashboardLayout
            role={session.user.role}
            name={session.user.name}
        >
            {children}
        </DashboardLayout>
    );
}