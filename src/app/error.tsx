"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-5">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

                {/* Error Icon */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <span className="text-4xl">
                        ⚠️
                    </span>
                </div>

                <h1 className="mb-3 text-3xl font-bold text-slate-800">
                    Something went wrong!
                </h1>

                <p className="mb-8 text-slate-500">
                    We couldn't load this page right now.
                    Please try again or return to the homepage.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">

                    <button
                        onClick={() => reset()}
                        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Go Home
                    </Link>

                </div>

            </div>
        </div>
    );
}