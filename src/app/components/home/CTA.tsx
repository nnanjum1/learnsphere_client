"use client"

import Link from "next/link";

import Button from "../common/Button";
import Container from "../common/Container";
import { authClient } from "@/app/lib/auth-client";

const CTA = () => {
    const { data: session } = authClient.useSession();
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
                        Master in-demand skills through expert-led courses, hands-on learning, and flexible study from anywhere. Start your journey with LearnSphere today.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        {session?.user ? (
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-indigo-700"
                                >
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <Button
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-indigo-700"
                                >
                                    Join Free
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;