export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
    id: string;
    slug: string;
    title: string;
    category: string;
    level: CourseLevel;
    duration: string;
    price: number;
    rating: number;
    students: number;
    thumbnail: string;
    shortDescription: string;
    fullDescription: string;
    learningOutcomes: string[];
    instructor: string;
}