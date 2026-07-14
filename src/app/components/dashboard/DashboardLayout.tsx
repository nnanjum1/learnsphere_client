"use client";

import { ReactNode, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

interface DashboardLayoutProps {
    children: ReactNode;
    role: "student" | "instructor";
    name: string;
}

const DashboardLayout = ({
    children,
    role,
    name,
}: DashboardLayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <DashboardSidebar role={role} />
            </div>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative h-full w-72 bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b p-5">
                            <h2 className="text-xl font-bold text-indigo-600">
                                Dashboard
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 hover:bg-slate-100"
                            >
                                <HiXMark className="h-6 w-6" />
                            </button>
                        </div>

                        <DashboardSidebar
                            role={role}
                            onNavigate={() => setIsOpen(false)}
                            mobile
                        />
                    </div>
                </div>
            )}


            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between border-b bg-white px-5 py-4 lg:hidden">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <HiBars3 className="h-7 w-7" />
                    </button>

                    <h2 className="text-lg font-bold text-indigo-600">
                        Dashboard
                    </h2>

                    <div className="w-7" />
                </div>

                <DashboardNavbar name={name} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;