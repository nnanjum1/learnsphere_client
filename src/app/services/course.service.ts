// src/services/course.service.ts

import { Course } from "@/app/types/course";

const API = process.env.NEXT_PUBLIC_API_URL;

export const createCourse = async (course: Course) => {
    const res = await fetch(`${API}/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });

    return res.json();
};

export const getInstructorCourses = async (
    email: string
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/instructor/${email}`
    );

    return res.json();
};