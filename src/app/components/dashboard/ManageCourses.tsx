"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { getInstructorCourses } from "@/app/services/course.service";
import { Course } from "@/app/types/course";

const ManageCourses = () => {
    const { data: session } = authClient.useSession();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            if (!session?.user?.email) return;

            const result = await getInstructorCourses(
                session.user.email
            );

            setCourses(result.courses || []);
            setLoading(false);
        };

        loadCourses();
    }, [session]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                Manage Courses
            </h1>

            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="h-48 w-full rounded-xl object-cover"
                            />

                            <h2 className="mt-4 text-xl font-bold">
                                {course.title}
                            </h2>

                            <p className="mt-2 text-slate-600">
                                {course.category}
                            </p>

                            <p className="font-semibold text-indigo-600">
                                ${course.price}
                            </p>

                            <div className="mt-5 flex gap-3">
                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                                    Edit
                                </button>

                                <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageCourses;