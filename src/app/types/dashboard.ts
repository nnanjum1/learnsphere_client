export interface StudentDashboardData {
    success: boolean;

    summary: {
        totalCourses: number;
        completedCourses: number;
        totalSpent: number;
    };

    recentCourses: {
        _id: string;
        courseTitle: string;
        progress: number;
        thumbnail: string;
    }[];
}