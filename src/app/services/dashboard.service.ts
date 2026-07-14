const API = process.env.NEXT_PUBLIC_API_URL;

export const getInstructorDashboard = async (
    email: string
) => {
    const res = await fetch(
        `${API}/dashboard/instructor/${email}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};