"use client";

import { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { getCourseById } from "@/app/services/course.service";
import { Course } from "@/app/types/course";

interface EditCourseProps {
    id: string;
}

const EditCourse = ({
    id,
}: EditCourseProps) => {
    const [course, setCourse] =
        useState<Course | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const result =
                    await getCourseById(id);

                setCourse(result.course);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!course) {
        return <p>Course not found.</p>;
    }

    return (
        <CourseForm
            mode="edit"
            course={course}
        />
    );
};

export default EditCourse;