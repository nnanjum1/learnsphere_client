import CourseDetails from "@/app/components/course/CourseDetails";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CourseDetailsPage({
    params,
}: PageProps) {
    const { id } = await params;

    return <CourseDetails id={id} />;
}