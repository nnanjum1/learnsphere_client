const API = process.env.NEXT_PUBLIC_API_URL;

export const getStudentEnrollments = async (
    email: string
) => {
    const res = await fetch(
        `${API}/enrollments/student/${email}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};