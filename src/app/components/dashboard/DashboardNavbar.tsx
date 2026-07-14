"use client";

interface DashboardNavbarProps {
    name: string;
}

const DashboardNavbar = ({
    name,
}: DashboardNavbarProps) => {
    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

            <div>

                <h1 className="text-2xl font-bold">
                    Welcome, {name}
                </h1>

                <p className="text-slate-500">
                    Manage your learning journey.
                </p>

            </div>

        </header>
    );
};

export default DashboardNavbar;