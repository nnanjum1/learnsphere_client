import { LearningPath } from "../types/learningPath";

export const getLearningPaths = async (): Promise<LearningPath[]> => {
    const response = await fetch("/data/learning-paths.json");

    if (!response.ok) {
        throw new Error("Failed to fetch learning paths.");
    }

    return response.json();
};