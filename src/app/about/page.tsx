import Link from "next/link";

import Container from "../components/common/Container";
import Button from "../components/common/Button";

import {
    HiOutlineAcademicCap,
    HiOutlineLightBulb,
    HiOutlineUsers,
    HiOutlineRocketLaunch,
} from "react-icons/hi2";

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-700 to-violet-700 py-24 text-white">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-5xl font-bold">
                            About LearnSphere
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-indigo-100">
                            LearnSphere is an online learning platform
                            designed to help students and professionals
                            build practical skills through modern,
                            high-quality education.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Story */}
            <section className="py-20">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900">
                                Our Story
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600">
                                LearnSphere was created with one goal:
                                making quality education accessible to
                                everyone. We believe learning should be
                                flexible, engaging, and focused on
                                practical skills that prepare learners
                                for real-world success.
                            </p>

                            <p className="mt-6 leading-8 text-slate-600">
                                Whether you're starting your career,
                                switching professions, or improving your
                                expertise, LearnSphere provides
                                structured learning paths and
                                industry-focused courses to help you
                                succeed.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-indigo-50 p-10">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold">
                                    🎯 Our Mission
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    To empower learners with affordable,
                                    practical, and career-focused online
                                    education.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">
                                    🌍 Our Vision
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    To become a trusted global learning
                                    platform that inspires lifelong
                                    learning and career growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Core Values */}
            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="text-center">
                        <span className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-700">
                            Why Choose LearnSphere
                        </span>

                        <h2 className="mt-5 text-4xl font-bold">
                            Our Core Values
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-slate-600">
                            Everything we build is centered around
                            delivering the best learning experience.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                        <ValueCard
                            icon={<HiOutlineAcademicCap />}
                            title="Quality Education"
                            description="Expert-designed courses that focus on practical knowledge."
                        />

                        <ValueCard
                            icon={<HiOutlineLightBulb />}
                            title="Innovation"
                            description="Modern learning methods that keep students engaged."
                        />

                        <ValueCard
                            icon={<HiOutlineUsers />}
                            title="Community"
                            description="A supportive environment where learners grow together."
                        />

                        <ValueCard
                            icon={<HiOutlineRocketLaunch />}
                            title="Career Growth"
                            description="Helping students build skills for future opportunities."
                        />

                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-20">
                <Container>
                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-16 text-center text-white">

                        <h2 className="text-4xl font-bold">
                            Ready to Start Learning?
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-lg text-indigo-100">
                            Explore our growing collection of courses
                            and begin your learning journey today.
                        </p>

                        <div className="mt-8">
                            <Link href="/courses">
                                <Button
                                    variant="secondary"
                                    className="bg-white text-indigo-700 hover:bg-slate-100"
                                >
                                    Explore Courses
                                </Button>
                            </Link>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
}

function ValueCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">

            <div className="mb-5 text-5xl text-indigo-600">
                {icon}
            </div>

            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
                {description}
            </p>

        </div>
    );
}