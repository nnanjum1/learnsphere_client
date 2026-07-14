export type CourseLevel =
    | "Beginner"
    | "Intermediate"
    | "Advanced";

export interface Course {
    _id?: string;

    title: string;
    thumbnail: string;
    category: string;
    level: CourseLevel;

    duration: string;
    price: number;

    shortDescription: string;
    description: string;

    requirements: string[];
    learningOutcomes: string[];

    instructorId: string;
    instructorName: string;
    instructorEmail: string;
    enrollmentCount: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CourseFormData {
    title: string;
    thumbnail: string;
    category: string;
    level: CourseLevel;

    duration: string;
    price: number;

    shortDescription: string;
    description: string;

    requirements: string;
    learningOutcomes: string;
}