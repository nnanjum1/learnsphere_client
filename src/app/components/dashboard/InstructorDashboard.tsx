"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { getInstructorDashboard } from "@/app/services/dashboard.service";

const InstructorDashboard = () => {
    const { data: session } =
        authClient.useSession();

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] =
        useState<any>(null);

    useEffect(() => {
        const loadDashboard = async () => {
            if (!session?.user?.email) return;

            const result =
                await getInstructorDashboard(
                    session.user.email
                );

            if (result.success) {
                setDashboard(result);
            }

            setLoading(false);
        };

        loadDashboard();
    }, [session]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div>

            <h1 className="mb-8 text-4xl font-bold">
                Instructor Dashboard
            </h1>

            {/* Summary Cards */}

            <div className="mb-10 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-slate-500">
                        Total Courses
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-indigo-600">
                        {dashboard.summary.totalCourses}
                    </h2>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-slate-500">
                        Total Students
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-green-600">
                        {dashboard.summary.totalStudents}
                    </h2>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-slate-500">
                        Total Revenue
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-amber-600">
                        ${dashboard.summary.totalRevenue}
                    </h2>

                </div>

            </div>


            <div className="overflow-x-auto  rounded-2xl bg-white shadow">

                <table className="table">

                    <thead>

                        <tr>

                            <th>Course</th>
                            <th className="pr-1">Price</th>

                            <th className="px-1">Students</th>

                            <th className="pl-1">Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard.courses.map(
                            (course: any) => (

                                <tr key={course._id}>

                                    <td className="px-2">
                                        {course.title}
                                    </td>

                                    <td className="pl-2">
                                        ${course.price}
                                    </td>

                                    <td className="pl-2">
                                        {course.enrollmentCount}
                                    </td>

                                    <td className="font-bold text-green-600 pl-2">
                                        ${course.revenue}
                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default InstructorDashboard;