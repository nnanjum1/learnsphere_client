"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { getStudentEnrollments } from "@/app/services/enrollment.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface Enrollment {
    _id: string;

    courseId: string;

    courseTitle: string;

    thumbnail: string;

    instructorName: string;

    price: number;

    progress: number;

    enrolledAt: string;
}

const MyCourses = () => {
    const { data: session } =
        authClient.useSession();

    const [loading, setLoading] =
        useState(true);

    const [courses, setCourses] =
        useState<Enrollment[]>([]);

    const router = useRouter();

    const handleContinueLearning = () => {
        toast.info("This feature will be implemented later.");
        router.push(`/dashboard/my-courses`);
    };

    useEffect(() => {
        const loadCourses = async () => {
            if (!session?.user?.email) return;

            const result =
                await getStudentEnrollments(
                    session.user.email
                );

            if (result.success) {
                setCourses(result.enrollments);
            }

            setLoading(false);
        };

        loadCourses();
    }, [session]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="py-20 text-center">

                <h2 className="text-3xl font-bold">
                    No Courses Yet
                </h2>

                <p className="mt-3 text-slate-500">
                    You haven't enrolled in any course.
                </p>

                <Link
                    href="/courses"
                    className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white"
                >
                    Explore Courses
                </Link>

            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-10">

            <h1 className="mb-8 text-4xl font-bold">
                My Courses
            </h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {courses.map((course) => (

                    <div
                        key={course._id}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                    >

                        <img
                            src={course.thumbnail}
                            alt={course.courseTitle}
                            className="h-52 w-full object-cover"
                        />

                        <div className="p-6">

                            <h2 className="text-xl font-bold">
                                {course.courseTitle}
                            </h2>

                            <p className="mt-2 text-slate-500">
                                👨‍🏫 {course.instructorName}
                            </p>

                            <p className="mt-2 font-semibold text-indigo-600">
                                ${course.price}
                            </p>

                            <div className="mt-5">

                                <div className="mb-2 flex justify-between">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        {course.progress}%
                                    </span>

                                </div>

                                <div className="h-3 rounded-full bg-slate-200">

                                    <div
                                        className="h-3 rounded-full bg-green-600"
                                        style={{
                                            width:
                                                `${course.progress}%`,
                                        }}
                                    />

                                </div>

                            </div>

                            <button
                                onClick={handleContinueLearning}
                                className="mt-6 block rounded-xl bg-indigo-600 p-3 text-center font-semibold text-white"
                            >
                                Continue Learning
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default MyCourses;