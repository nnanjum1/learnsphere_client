"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

import { Course, CourseFormData } from "@/app/types/course";
import { createCourse } from "@/app/services/course.service";
import { categories } from "@/app/constants/categories";

const AddCourseForm = () => {
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CourseFormData>();

    const onSubmit = async (data: CourseFormData) => {
        if (!session?.user) {
            toast.error("Please login first.");
            return;
        }

        const course: Course = {
            title: data.title,
            thumbnail: data.thumbnail,
            category: data.category,
            level: data.level,

            duration: data.duration,
            price: Number(data.price),

            shortDescription: data.shortDescription,
            description: data.description,

            requirements: data.requirements
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),

            learningOutcomes: data.learningOutcomes
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),

            instructorId: session.user.id,
            instructorName: session.user.name,
            instructorEmail: session.user.email,

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await createCourse(course);

        if (result.success) {
            toast.success(result.message);

            reset();

            router.push("/dashboard/manage-courses");
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
            <h2 className="mb-8 text-3xl font-bold">
                Add New Course
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <input
                    {...register("title")}
                    placeholder="Course Title"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    {...register("thumbnail")}
                    placeholder="Thumbnail URL"
                    className="w-full rounded-xl border p-3"
                />

                <select
                    {...register("category", {
                        required: "Category is required",
                    })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    {...register("level")}
                    className="w-full rounded-xl border p-3"
                >
                    <option value="Beginner">
                        Beginner
                    </option>

                    <option value="Intermediate">
                        Intermediate
                    </option>

                    <option value="Advanced">
                        Advanced
                    </option>
                </select>

                <input
                    {...register("duration")}
                    placeholder="Duration"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    type="number"
                    {...register("price")}
                    placeholder="Price"
                    className="w-full rounded-xl border p-3"
                />

                <textarea
                    {...register("shortDescription")}
                    placeholder="Short Description"
                    className="h-24 w-full rounded-xl border p-3"
                />

                <textarea
                    {...register("description")}
                    placeholder="Full Description"
                    className="h-40 w-full rounded-xl border p-3"
                />

                <textarea
                    {...register("requirements")}
                    placeholder="One requirement per line"
                    className="h-32 w-full rounded-xl border p-3"
                />

                <textarea
                    {...register("learningOutcomes")}
                    placeholder="One learning outcome per line"
                    className="h-32 w-full rounded-xl border p-3"
                />

                <button
                    className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourseForm;