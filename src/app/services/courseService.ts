import { Course } from "../types/course";

export const getFeaturedCourses = async (): Promise<Course[]> => {
    const response = await fetch("/data/featured-courses.json");

    if (!response.ok) {
        throw new Error("Failed to fetch featured courses.");
    }

    return response.json();
};