"use client";

import {
    HiOutlineMagnifyingGlass,
    HiOutlineAcademicCap,
    HiOutlinePlayCircle,
    HiOutlineTrophy,
} from "react-icons/hi2";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const steps = [
    {
        id: 1,
        title: "Explore Courses",
        description:
            "Browse a wide range of courses and choose the one that matches your learning goals.",
        icon: HiOutlineMagnifyingGlass,
    },
    {
        id: 2,
        title: "Enroll Instantly",
        description:
            "Join your preferred course with a simple enrollment process and start learning immediately.",
        icon: HiOutlineAcademicCap,
    },
    {
        id: 3,
        title: "Learn at Your Pace",
        description:
            "Access course materials anytime and progress through lessons at your own speed.",
        icon: HiOutlinePlayCircle,
    },
    {
        id: 4,
        title: "Achieve Your Goals",
        description:
            "Complete courses, build practical skills, and move closer to your career aspirations.",
        icon: HiOutlineTrophy,
    },
];

const LearningProcess = () => {
    return (
        <section className="bg-white py-20">
            <Container>
                <SectionTitle
                    badge="Learning Process"
                    title="Start Your Learning Journey in Four Simple Steps"
                    description="Our platform makes learning simple, flexible, and effective for everyone."
                    center
                />

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className="group relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl"
                            >
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 transition group-hover:bg-indigo-600">
                                    <Icon className="h-10 w-10 text-indigo-600 transition group-hover:text-white" />
                                </div>

                                <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                    {step.id}
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-800">
                                    {step.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default LearningProcess;