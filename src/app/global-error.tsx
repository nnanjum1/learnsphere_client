"use client";

export default function GlobalError({
    reset,
}: {
    reset: () => void;
}) {

    return (

        <html>

            <body>

                <div className="flex min-h-[70vh] items-center justify-center">

                    <div className="text-center">

                        <h1 className="text-4xl font-bold">
                            Critical Error
                        </h1>


                        <p className="my-5 text-slate-500">
                            Something unexpected happened.
                        </p>


                        <button
                            onClick={() => reset()}
                            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
                        >
                            Reload
                        </button>

                    </div>

                </div>

            </body>

        </html>

    );
}