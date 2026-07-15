"use client";

import { useEffect, useState } from "react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Link from "next/link";
import { getCourseCategories } from "@/app/services/course.service";


const LearningPaths = () => {
    const [categories, setCategories] =
        useState<string[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data =
                    await getCourseCategories();

                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadCategories();
    }, []);

    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <SectionTitle
                    badge="Learning Paths"
                    title="Choose Your Career Journey"
                    description="Follow structured roadmaps designed to help you become job-ready."
                    center
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {categories.map((category) => (

                        <Link
                            key={category}
                            href={`/courses?category=${encodeURIComponent(category)}`}
                            className="rounded-2xl border bg-white p-8 text-center shadow transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-bold">
                                {category}
                            </h3>

                            <p className="mt-3 text-slate-500">
                                Explore {category} courses
                            </p>

                        </Link>

                    ))}

                </div>
            </Container>
        </section>
    );
};

export default LearningPaths;