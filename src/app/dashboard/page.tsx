"use client";

import { authClient } from "@/app/lib/auth-client";
import InstructorDashboard from "@/app/components/dashboard/InstructorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();

    const role = (session?.user as { role?: string })?.role;

    if (role === "instructor") {
        return <InstructorDashboard />;
    }

    return <StudentDashboard />;
}