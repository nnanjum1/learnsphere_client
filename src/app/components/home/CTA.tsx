import Link from "next/link";

import Button from "../common/Button";
import Container from "../common/Container";

const CTA = () => {
    return (
        <section className="py-20">
            <Container>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-xl sm:px-10 lg:px-16">
                    <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                        🚀 Start Learning Today
                    </span>

                    <h2 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
                        Build Your Future With LearnSphere
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-100 sm:text-lg">
                        Join thousands of learners exploring modern technologies,
                        building real-world projects, and preparing for successful careers.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/courses">
                            <Button
                                variant="outline"
                                className="border-white bg-white text-indigo-700 hover:bg-slate-100 hover:text-indigo-700"
                            >
                                Explore Courses
                            </Button>
                        </Link>

                        <Link href="/register">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-indigo-600"
                            >
                                Join Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;