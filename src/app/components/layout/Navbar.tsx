"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Container from "../common/Container";
import Button from "../common/Button";
import { publicNavLinks } from "@/app/constants/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut();

        toast.success("Logged out successfully!");

        router.push("/");
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">

            <Container>
                <div className="flex h-18 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
                            LS
                        </div>

                        <div>
                            <h1 className="text-xl font-bold">LearnSphere</h1>

                            <p className="text-xs text-slate-500">
                                Learn. Build. Grow.
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {publicNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-medium text-slate-700 transition hover:text-indigo-600"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="hidden lg:flex items-center gap-3">
                            {isPending ? (
                                <p>Loading...</p>
                            ) : session ? (
                                <>
                                    <span className="font-medium">
                                        {session.user.name}
                                    </span>

                                    <Link href="/dashboard">
                                        <Button variant="outline">
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Button onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline">
                                            Login
                                        </Button>
                                    </Link>

                                    <Link href="/register">
                                        <Button>
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                    </nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden"
                    >
                        {isOpen ? (
                            <HiOutlineXMark size={28} />
                        ) : (
                            <HiOutlineBars3 size={28} />
                        )}
                    </button>
                </div>
            </Container>

            {isOpen && (
                <div className="border-t border-slate-200 lg:hidden">
                    <Container>
                        <div className="flex flex-col gap-4 py-5">
                            {publicNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Button
                                        className="w-full"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Login
                                        </Button>
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button className="w-full">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
};

export default Navbar;