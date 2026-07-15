"use client";

import { useEffect, useState } from "react";
import { getStudentDashboard } from "@/app/services/dashboard.service";
import { toast } from "react-toastify";

interface StudentDashboardProps {
    email: string;
}

const StudentDashboard = ({ email }: StudentDashboardProps) => {
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState<any>(null);

    const handleContinueLearning = () => {
        toast.info("This feature will be implemented later.");
    };

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const result = await getStudentDashboard(email);

                if (result.success) {
                    setDashboard(result);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [email]);

    if (loading || !dashboard) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-8 text-4xl font-bold">
                Student Dashboard
            </h1>

            <div className="mb-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-slate-500">
                        Enrolled Courses
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-indigo-600">
                        {dashboard.summary.totalCourses}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-slate-500">
                        Completed
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-green-600">
                        {dashboard.summary.completedCourses}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-slate-500">
                        Total Spent
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-amber-600">
                        ${dashboard.summary.totalSpent}
                    </h2>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-6 text-2xl font-bold">
                    Continue Learning
                </h2>

                <div className="space-y-6">
                    {dashboard.recentCourses.map((course: any) => (
                        <div
                            key={course._id}
                            className="rounded-xl border p-5"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold">
                                    {course.courseTitle}
                                </h3>

                                <span>
                                    {course.progress}%
                                </span>
                            </div>

                            <div className="mb-4 h-3 rounded-full bg-slate-200">
                                <div
                                    className="h-3 rounded-full bg-indigo-600"
                                    style={{
                                        width: `${course.progress}%`,
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleContinueLearning}
                                className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
                            >
                                Continue
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;