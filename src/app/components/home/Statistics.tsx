"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import StatCard from "../common/StatCard";

import { statistics, growthData } from "@/app/constants/home/statistics";

import {
    HiAcademicCap,
    HiBookOpen,
    HiUserGroup,
    HiTrophy,
} from "react-icons/hi2";

const icons = {
    users: <HiUserGroup className="h-7 w-7" />,
    courses: <HiBookOpen className="h-7 w-7" />,
    teachers: <HiAcademicCap className="h-7 w-7" />,
    success: <HiTrophy className="h-7 w-7" />,
};



const Statistics = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return (
        <section className="py-20">
            <Container>
                <SectionTitle
                    badge="Learning Impact"
                    title="Empowering Thousands of Learners"
                    description="Our growing community reflects the success of learners achieving their goals through structured education."
                    center
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((item) => (
                        <StatCard
                            key={item.label}
                            value={item.value}
                            label={item.label}
                            icon={icons[item.icon as keyof typeof icons]}
                        />
                    ))}
                </div>
                <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <h3 className="mb-6 text-center text-xl font-bold text-slate-900 sm:text-2xl">
                        Student Growth
                    </h3>

                    <div className="h-[300px] w-full sm:h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={growthData}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="month"
                                    interval={isMobile ? 1 : 0}
                                />

                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    width={40}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="students"
                                    fill="#4F46E5"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Statistics;