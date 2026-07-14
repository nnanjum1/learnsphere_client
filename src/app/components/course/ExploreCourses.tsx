"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCourses } from "@/app/services/course.service";
import { Course } from "@/app/types/course";

const ExploreCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    // Instant input binding state (avoids focus loss)
    const [search, setSearch] = useState("");
    // Debounced string state that actually triggers the API fetch call
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 1. Debounce logic handler: Waits 500ms after user stops typing before calling backend
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // 2. Main data fetching cycle linked to the debounced search variable
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);

            const result = await getAllCourses({
                page,
                search: debouncedSearch,
                category,
                level,
                sort,
            });

            if (result.success) {
                setCourses(result.courses);
                setTotalPages(result.totalPages);
            }

            setLoading(false);
        };

        fetchCourses();
    }, [page, debouncedSearch, category, level, sort]);

    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            {/* Main Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold">Explore Courses</h1>
                <p className="mt-2 text-slate-600">
                    Learn new skills from expert instructors.
                </p>
            </div>

            {/* PERSISTENT FILTERS SECTION (Never disappears now) */}
            <div className="mb-8 grid gap-4 md:grid-cols-4">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // Reset page on query modification
                    }}
                    className="rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border p-3"
                >
                    <option value="">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Finance">Finance</option>
                    <option value="Photography & Video">Photography & Video</option>
                    <option value="Music">Music</option>
                    <option value="Language Learning">Language Learning</option>
                    <option value="Personal Development">Personal Development</option>
                </select>

                <select
                    value={level}
                    onChange={(e) => {
                        setLevel(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border p-3"
                >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-xl border p-3"
                >
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price Low → High</option>
                    <option value="price_desc">Price High → Low</option>
                    <option value="title">Title A-Z</option>
                </select>
            </div>

            {/* DYNAMIC RESULTS CONTAINER */}
            {loading ? (
                <div className="py-20 text-center text-lg text-slate-500">
                    Loading courses...
                </div>
            ) : courses.length === 0 ? (
                <div className="py-20 text-center text-lg text-slate-500 border border-dashed rounded-2xl bg-slate-50">
                    No courses found matching your criteria.
                </div>
            ) : (
                <>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
                            >
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="h-52 w-full object-cover"
                                />

                                <div className="p-6">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                                            {course.category}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            {course.level}
                                        </span>
                                    </div>

                                    <h2 className="mb-2 text-xl font-bold">
                                        {course.title}
                                    </h2>

                                    <p className="mb-4 line-clamp-3 text-slate-600">
                                        {course.shortDescription}
                                    </p>

                                    <div className="mb-4 space-y-1 text-sm text-slate-500">
                                        <p>👨‍🏫 {course.instructorName}</p>
                                        <p>⏳ {course.duration}</p>
                                    </div>

                                    <div className="mb-5 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            ${course.price}
                                        </span>
                                        <span className="text-yellow-500">★ 4.8</span>
                                    </div>

                                    <Link
                                        href={`/courses/${course._id}`}
                                        className="block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-10 flex justify-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`rounded-lg px-4 py-2 transition ${page === i + 1
                                        ? "bg-indigo-600 text-white"
                                        : "border hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ExploreCourses;