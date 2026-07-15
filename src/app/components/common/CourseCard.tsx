import Image from "next/image";
import Link from "next/link";

import Button from "./Button";
import { Course } from "@/app/types/course";

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    {course.category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                        {course.level}
                    </span>


                </div>

                <h3 className="text-xl font-bold text-slate-900">
                    {course.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {course.shortDescription}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <span>⏱ {course.duration}</span>

                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-2xl font-bold text-indigo-600">
                        ${course.price}
                    </p>

                    <Link href={`/courses/${course._id}`}>
                        <Button>View Details</Button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;