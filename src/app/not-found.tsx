import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-5">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

                <h1 className="mb-3 text-7xl font-bold text-indigo-600">
                    404
                </h1>

                <h2 className="mb-4 text-3xl font-bold text-slate-800">
                    Page Not Found
                </h2>

                <p className="mb-8 text-slate-500">
                    Sorry, the page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="inline-block rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Back To Home
                </Link>

            </div>
        </div>
    );
}