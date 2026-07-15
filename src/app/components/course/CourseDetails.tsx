"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { Course } from "@/app/types/course";
import { getCourseById } from "@/app/services/course.service";
import { toast } from "react-toastify";

interface CourseDetailsProps {
    id: string;
}

const CourseDetails = ({
    id,
}: CourseDetailsProps) => {
    const [course, setCourse] =
        useState<Course | null>(null);

    const [loading, setLoading] =
        useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { data: session } =
        authClient.useSession();

    const role = (session?.user as { role?: string })?.role;


    useEffect(() => {
        if (!session?.user || role !== "student" || !course?._id) return;

        const checkEnrollment = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/enrollments/check/${course._id}/${encodeURIComponent(session.user.email)}`
                );

                const result = await res.json();

                console.log("Enrollment check:", result);

                setIsEnrolled(result.enrolled === true);

            } catch (error) {
                console.error("Enrollment check failed:", error);
                setIsEnrolled(false);
            }
        };

        checkEnrollment();

    }, [course?._id, session?.user?.email, role]);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const result =
                    await getCourseById(id);

                if (result.success) {
                    setCourse(result.course);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    if (!course) {
        return (
            <div className="py-20 text-center">
                Course not found.
            </div>
        );
    }

    const handleEnroll = async () => {
        if (!session?.user || !course || isEnrolling) return;

        setIsEnrolling(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollments`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: course._id,
                        studentId: session.user.id,
                        studentName: session.user.name,
                        studentEmail: session.user.email,
                    })
                }
            );
            const result = await res.json();

            if (result.success) {
                setIsEnrolled(true);

                setCourse((prev) =>
                    prev
                        ? {
                            ...prev,
                            enrollmentCount:
                                prev.enrollmentCount + 1,
                        }
                        : prev
                );

                toast.success("Enrollment successful.");
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsEnrolling(false);
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">

            <img
                src={course.thumbnail}
                alt={course.title}
                className="h-96 w-full rounded-2xl object-cover"
            />

            <div className="mt-8">

                <div className="flex flex-wrap items-center gap-3">

                    <span className="rounded-full bg-indigo-100 px-4 py-1 text-indigo-700">
                        {course.category}
                    </span>

                    <span className="rounded-full bg-slate-100 px-4 py-1">
                        {course.level}
                    </span>

                </div>

                <h1 className="mt-5 text-4xl font-bold">
                    {course.title}
                </h1>

                <p className="mt-4 text-slate-600">
                    {course.shortDescription}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-5">

                    <div>
                        <h4 className="font-semibold">
                            Instructor
                        </h4>

                        <p>{course.instructorName}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold">
                            Duration
                        </h4>

                        <p>{course.duration}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold">
                            Level
                        </h4>

                        <p>{course.level}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold">
                            Price
                        </h4>

                        <p className="text-2xl font-bold text-indigo-600">
                            ${course.price}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold">
                            Students
                        </h4>

                        <p className="text-lg font-semibold text-indigo-600">
                            {course.enrollmentCount} Enrolled
                        </p>
                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold">
                        Description
                    </h2>

                    <p className="mt-3 leading-8 text-slate-700">
                        {course.description}
                    </p>

                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-2">

                    <div>

                        <h2 className="mb-4 text-2xl font-bold">
                            Requirements
                        </h2>

                        <ul className="space-y-2">

                            {course.requirements.map(
                                (item, index) => (
                                    <li key={index}>
                                        ✅ {item}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                    <div>

                        <h2 className="mb-4 text-2xl font-bold">
                            Learning Outcomes
                        </h2>

                        <ul className="space-y-2">

                            {course.learningOutcomes.map(
                                (item, index) => (
                                    <li key={index}>
                                        🎯 {item}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                </div>

                <div className="mt-12">

                    {!session?.user ? (
                        <Link
                            href="/login"
                            className="inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
                        >
                            Login to Enroll
                        </Link>
                    ) : role === "student" ? (
                        isEnrolled ? (


                            <div className="flex items-center gap-3">
                                <button disabled className="cursor-not-allowed rounded-xl bg-blue-400 px-8 py-4 font-semibold text-white opacity-70">
                                    ✓ Enrolled
                                </button>
                                <Link href="/dashboard/my-courses" className="text-indigo-600">View My Courses</Link>
                            </div>


                        ) : (
                            <button
                                onClick={handleEnroll}
                                disabled={isEnrolling}
                                className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isEnrolling ? "Enrolling..." : "Enroll Now"}
                            </button>
                        )
                    ) : (
                        <div className="rounded-xl bg-green-100 p-4 text-green-700">
                            Viewing this course as a instructor
                        </div>)}

                </div>

            </div>

        </section>
    );
};

export default CourseDetails;