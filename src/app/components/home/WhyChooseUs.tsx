"use client";

import {
    HiOutlineAcademicCap,
    HiOutlineDevicePhoneMobile,
    HiOutlineUsers,
    HiOutlineTrophy,
} from "react-icons/hi2";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const features = [
    {
        id: 1,
        title: "Expert Instructors",
        description:
            "Learn from experienced professionals with real-world industry knowledge.",
        icon: HiOutlineAcademicCap,
    },
    {
        id: 2,
        title: "Learn Anywhere",
        description:
            "Access your courses anytime, anywhere from desktop, tablet, or mobile.",
        icon: HiOutlineDevicePhoneMobile,
    },
    {
        id: 3,
        title: "Supportive Community",
        description:
            "Join a growing community of learners and collaborate throughout your journey.",
        icon: HiOutlineUsers,
    },
    {
        id: 4,
        title: "Career Growth",
        description:
            "Develop practical skills that prepare you for internships and professional careers.",
        icon: HiOutlineTrophy,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <SectionTitle
                    badge="Why Choose LearnSphere"
                    title="Everything You Need to Learn with Confidence"
                    description="We provide a modern learning experience designed to help students build practical skills and achieve their career goals."
                    center
                />

                <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.id}
                                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 transition group-hover:bg-indigo-600">
                                    <Icon className="h-8 w-8 text-indigo-600 transition group-hover:text-white" />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-800">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;