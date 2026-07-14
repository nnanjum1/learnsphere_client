"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
    HiHome,
    HiPlusCircle,
    HiBookOpen,
    HiUser,
} from "react-icons/hi2";

interface DashboardSidebarProps {
    role: "student" | "instructor";
    mobile?: boolean;
    onNavigate?: () => void;
}

const DashboardSidebar = ({
    role,
    mobile = false,
    onNavigate,
}: DashboardSidebarProps) => {
    const pathname = usePathname();

    const studentLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: HiHome,
        },
        {
            name: "My Courses",
            href: "/dashboard/my-courses",
            icon: HiBookOpen,
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: HiUser,
        },
    ];

    const instructorLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: HiHome,
        },
        {
            name: "Add Course",
            href: "/dashboard/add-course",
            icon: HiPlusCircle,
        },
        {
            name: "Manage Courses",
            href: "/dashboard/manage-courses",
            icon: HiBookOpen,
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: HiUser,
        },
    ];

    const links =
        role === "student"
            ? studentLinks
            : instructorLinks;

    return (
        <aside
            className={clsx(
                "h-screen overflow-y-auto bg-white",
                mobile
                    ? "w-full"
                    : "sticky top-0 w-72 border-r border-slate-200"
            )}
        >
            <div className="flex h-full flex-col p-6">
                <h2 className="text-2xl font-bold text-indigo-600">
                    Dashboard
                </h2>

                <nav className="mt-8 space-y-2">

                    {links.map((link) => {

                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onNavigate}
                                className={clsx(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition",
                                    pathname === link.href
                                        ? "bg-indigo-600 text-white"
                                        : "hover:bg-slate-100"
                                )}
                            >
                                <Icon className="h-5 w-5" />

                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default DashboardSidebar;