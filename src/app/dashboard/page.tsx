"use client";

import { authClient } from "@/app/lib/auth-client";

import StudentDashboard from "@/app/components/dashboard/StudentDashboard";
import InstructorDashboard from "@/app/components/dashboard/InstructorDashboard";


export default function DashboardPage() {

    const {
        data: session,
        isPending
    } = authClient.useSession();


    if (isPending) {
        return (
            <div>
                Loading...
            </div>
        );
    }


    if (!session?.user) {
        return null;
    }


    const role = (
        session.user as {
            role?: "student" | "instructor";
        }
    ).role;


    if (role === "instructor") {
        return (
            <InstructorDashboard email={session.user.email} />
        );
    }


    return (
        <StudentDashboard
            email={session.user.email}
        />
    );
}