"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { getInstructorCourses } from "@/app/services/course.service";
import { Course } from "@/app/types/course";
import Link from "next/link";
import { deleteCourse } from "@/app/services/course.service";
import { toast } from "react-toastify";

const ManageCourses = () => {
    const { data: session } = authClient.useSession();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    // State to track which course is currently selected for deletion
    const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

    // 1. Opens the confirmation modal
    const handleDeleteClick = (id: string | undefined) => {
        if (!id) {
            toast.error("Invalid course ID");
            return;
        }
        setCourseToDelete(id);
    };

    // 2. Executes the deletion logic when confirmed
    const executeDelete = async () => {
        if (!courseToDelete) return;

        const id = courseToDelete;
        setCourseToDelete(null); // Close the modal immediately
        console.log("Targeting deletion for Course ID:", id); // 👈 Add this line
        const loadingToastId = toast.loading("Deleting course...");

        try {
            const result = await deleteCourse(id);

            if (result.success) {
                toast.update(loadingToastId, {
                    render: result.message || "Course deleted successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });

                setCourses((prev) =>
                    prev.filter((course) => course._id !== id)
                );
            } else {
                toast.update(loadingToastId, {
                    render: "Failed to delete course.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch {
            toast.update(loadingToastId, {
                render: "An error occurred while deleting.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

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
        <div className="relative min-h-screen">
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
                                <Link
                                    href={`/dashboard/edit-course/${course._id}`}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDeleteClick(course._id)}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PERFECTLY CENTERED MODAL */}
            {courseToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200">
                        <h3 className="text-xl font-bold text-slate-900">
                            Delete Course
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                            Are you sure you want to delete this course? This action is permanent and cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setCourseToDelete(null)}
                                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeDelete}
                                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;