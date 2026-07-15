"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

import { Course } from "@/app/types/course";
import { getFeaturedCourses } from "@/app/services/course.service";
import CourseCard from "../common/CourseCard";

const FeaturedCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await getFeaturedCourses();
                setCourses(data);
            } catch (error) {
                console.error("Failed to load courses:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    return (
        <section className="py-20">
            <Container>
                <SectionTitle
                    badge="Featured Courses"
                    title="Start Learning with Our Most Popular Courses"
                    description="Explore carefully designed courses to build practical skills and advance your career."
                    center
                />

                {loading ? (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[420px] animate-pulse rounded-2xl bg-slate-200"
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {courses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Link href="/courses">
                                <Button variant="outline">
                                    View All Courses
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
};

export default FeaturedCourses;