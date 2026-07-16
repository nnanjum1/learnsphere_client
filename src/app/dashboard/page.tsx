import { getSession } from "@/app/lib/get-session";
import StudentDashboard from "@/app/components/dashboard/StudentDashboard";
import InstructorDashboard from "@/app/components/dashboard/InstructorDashboard";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

    const session = await getSession();


    if (!session?.user) {
        redirect("/login");
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