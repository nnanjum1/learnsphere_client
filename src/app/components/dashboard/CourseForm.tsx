"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

import { Course, CourseFormData } from "@/app/types/course";
import {
    createCourse,
    updateCourse,
} from "@/app/services/course.service";
import { categories } from "@/app/constants/categories";

interface CourseFormProps {
    mode: "add" | "edit";
    course?: Course;
}

const CourseForm = ({
    mode,
    course,
}: CourseFormProps) => {

    const router = useRouter();

    const { data: session } = authClient.useSession();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CourseFormData>({
        defaultValues: course
            ? {
                title: course.title,
                thumbnail: course.thumbnail,
                category: course.category,
                level: course.level,
                duration: course.duration,
                price: course.price,
                shortDescription: course.shortDescription,
                description: course.description,
                requirements:
                    course.requirements.join("\n"),
                learningOutcomes:
                    course.learningOutcomes.join("\n"),
            }
            : undefined,
    });

    const onSubmit = async (data: CourseFormData) => {
        if (!session?.user) {
            toast.error("Please login first.");
            return;
        }

        const courseData: Course = {
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
            enrollmentCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        let result;

        if (mode === "add") {
            result = await createCourse(courseData);
        } else {
            if (!course?._id) {
                toast.error("Course ID not found.");
                return;
            }

            result = await updateCourse(
                course._id,
                courseData
            );
        }

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
                {mode === "add"
                    ? "Add New Course"
                    : "Edit Course"}
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
                    {mode === "add"
                        ? "Add Course"
                        : "Update Course"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;