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


export const deleteCourse = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to delete course");
    }

    return res.json();
};

export const getCourseById = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch course.");
    }

    return res.json();
};

export const updateCourse = async (
    id: string,
    course: unknown
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to update course.");
    }

    return res.json();
};