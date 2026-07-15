import { getSession } from "@/app/lib/get-session";

import InstructorDashboard from "@/app/components/dashboard/InstructorDashboard";
import StudentDashboard from "@/app/components/dashboard/StudentDashboard";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session?.user) {
        return null;
    }

    if (session.user.role === "instructor") {
        return (
            <InstructorDashboard
                email={session.user.email}
            />
        );
    }

    return (
        <StudentDashboard
            email={session.user.email}
        />
    );
}