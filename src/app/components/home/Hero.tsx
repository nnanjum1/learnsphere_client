import Image from "next/image";
import Link from "next/link";

import Button from "../common/Button";
import Container from "../common/Container";

import heroImage from "@/app/assets/images/hero.png";

const Hero = () => {
    return (
        <section className="overflow-hidden bg-slate-50">
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
            <Container>
                <div className="relative z-10 grid items-center gap-16 py-16 lg:min-h-[calc(100vh-72px)] lg:grid-cols-2">
                    {/* Left Side */}

                    <div>
                        {/* Badge */}

                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                            🚀 Learn at your own pace
                        </span>

                        {/* Heading */}

                        <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Learn Today.
                            <br />
                            Build Tomorrow.
                        </h1>

                        {/* Description */}

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            Discover high-quality courses, follow structured learning
                            paths, and build the skills you need to achieve your career
                            goals with LearnSphere.
                        </p>

                        {/* Buttons */}

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link href="/courses">
                                <Button>
                                    Explore Courses
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button variant="outline">
                                    Become an Instructor
                                </Button>
                            </Link>
                        </div>

                        {/* Statistics */}

                        <div className="mt-12 grid grid-cols-3 gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-indigo-600">
                                    15K+
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Learners
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-indigo-600">
                                    250+
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Courses
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-indigo-600">
                                    95%
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Satisfaction
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}

                    <div className="relative">
                        <Image
                            src={heroImage}
                            alt="LearnSphere Dashboard"
                            priority
                            className="w-full"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;