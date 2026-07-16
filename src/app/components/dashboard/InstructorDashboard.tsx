"use client";

import { useEffect, useState } from "react";

import { getInstructorDashboard } from "@/app/services/dashboard.service";

interface InstructorDashboardProps {
    email: string;
}

const InstructorDashboard = ({
    email,
}: InstructorDashboardProps) => {
    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] =
        useState<any>(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const result =
                    await getInstructorDashboard(email);

                if (result.success) {
                    setDashboard(result);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [email]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="py-20 text-center">
                Failed to load dashboard.
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

            <div className="overflow-x-auto rounded-2xl bg-white shadow">
                <table className="table">
                    <thead >
                        <tr>
                            <th className="p-2">Course</th>
                            <th className="pr-1">
                                Current Price
                            </th>
                            <th className="px-1">
                                Students
                            </th>
                            <th className="pl-1">
                                Revenue
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {dashboard.courses?.length > 0 ? (
                            dashboard.courses.map((course: any) => (
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

                                    <td className="pl-2 font-bold text-green-600">
                                        ${course.revenue}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-10 text-center text-slate-500"
                                >
                                    No courses found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorDashboard;