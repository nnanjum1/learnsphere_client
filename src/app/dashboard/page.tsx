"use client";

import { authClient } from "@/app/lib/auth-client";
import InstructorDashboard from "@/app/components/dashboard/InstructorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";


export default function DashboardPage() {

    const {
        data: session,
        isPending
    } = authClient.useSession();


    if (isPending) {
        return (
            <div className="py-20 text-center">
                Loading dashboard...
            </div>
        );
    }


    if (!session?.user) {
        return null;
    }


    const role =
        (session?.user as { role?: string })?.role;

    if (role === "instructor") {
        return <InstructorDashboard />;
    }


    return <StudentDashboard />;
}