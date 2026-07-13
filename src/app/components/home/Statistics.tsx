"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

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

                <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-center text-2xl font-bold text-slate-900">
                        Student Growth
                    </h3>

                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient
                                        id="growth"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="month" />

                                <YAxis />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#4F46E5"
                                    strokeWidth={3}
                                    fill="url(#growth)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Statistics;