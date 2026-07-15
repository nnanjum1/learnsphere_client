import Link from "next/link";
import Container from "../common/Container";

import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
            <Container>
                <div className="grid gap-12 py-16 text-center md:grid-cols-2 md:px-30 md:text-left lg:grid-cols-4">                    {/* Brand */}

                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center justify-center gap-3 md:justify-start">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                                LS
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    LearnSphere
                                </h2>

                                <p className="text-sm text-slate-400">
                                    Learn. Build. Grow.
                                </p>
                            </div>
                        </Link>

                        <p className="mt-6 leading-7 text-slate-400">
                            Learn modern technologies from expert instructors,
                            build real-world projects, and advance your career
                            through structured learning paths.
                        </p>

                        <div className="mt-6 flex justify-center gap-3 md:justify-start">
                            <a
                                href="#"
                                className="rounded-full border border-slate-700 p-3 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="#"
                                className="rounded-full border border-slate-700 p-3 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                className="rounded-full border border-slate-700 p-3 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                            >
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-indigo-400"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/courses"
                                    className="transition hover:text-indigo-400"
                                >
                                    Courses
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-indigo-400"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-indigo-400"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Categories
                        </h3>

                        <ul className="space-y-3">
                            <li>Web Development</li>
                            <li>App Development</li>
                            <li>Programming Languages</li>
                            <li>Data Science</li>
                            <li>Machine Learning</li>
                            <li>Artificial Intelligence</li>
                            <li>Cyber Security</li>
                            <li>Cloud Computing</li>
                            <li>UI/UX Design</li>
                            <li>Graphic Design</li>
                            <li>Digital Marketing</li>
                            <li>Business</li>
                            <li>Finance</li>
                            <li>Photography &amp; Video</li>
                            <li>Music</li>
                            <li>Language Learning</li>
                            <li>Personal Development</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <div className="space-y-4 text-slate-400">
                            <p>Sylhet, Bangladesh</p>

                            <p>support@learnsphere.com</p>

                            <p>+880 1712345678</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-6 text-center text-sm text-slate-500 md:flex-row">                    <p>
                    © 2026 LearnSphere. All rights reserved.
                </p>

                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-indigo-400"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-indigo-400"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;