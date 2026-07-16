import { ReactNode } from "react";
import { getSession } from "@/app/lib/get-session";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";

export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {

    const session = await getSession();

    if (!session?.user) {
        return null;
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