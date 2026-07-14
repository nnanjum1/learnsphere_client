"use client";

import { authClient } from "@/app/lib/auth-client";

const Profile = () => {
    const { data: session } = authClient.useSession();

    if (!session?.user) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-3xl px-4 py-10">

            <h1 className="mb-8 text-4xl font-bold">
                My Profile
            </h1>

            <div className="rounded-2xl border bg-white p-8 shadow">

                <div className="mb-6 flex justify-center">

                    <div className="flex h-28 w-28 items-center p-3 justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
                        {session.user.name.charAt(0).toUpperCase()}
                    </div>

                </div>

                <div className="space-y-6">

                    <div>
                        <label className="mb-2 block font-semibold">
                            Name
                        </label>

                        <input
                            value={session.user.name}
                            readOnly
                            className="w-full rounded-xl border bg-slate-100 p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Email
                        </label>

                        <input
                            value={session.user.email}
                            readOnly
                            className="w-full rounded-xl border bg-slate-100 p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Role
                        </label>

                        <input
                            value={
                                (session.user as { role?: string }).role ??
                                "User"
                            }
                            readOnly
                            className="w-full rounded-xl border bg-slate-100 p-3 capitalize"
                        />
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Profile;