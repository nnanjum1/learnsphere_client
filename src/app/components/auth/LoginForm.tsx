"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import AuthLayout from "./AuthLayout";
import { authClient } from "@/app/lib/auth-client";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormData>();

    const fillStudent = () => {
        setValue("email", "student@gmail.com");
        setValue("password", "123456");
    };

    const fillInstructor = () => {
        setValue("email", "instructor@gmail.com");
        setValue("password", "123456");
    };

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: async () => {
                    const session = await authClient.getSession();

                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: session.data?.user.id,
                                email: session.data?.user.email,
                                role: (session.data?.user as any).role,
                            }),
                        }
                    );

                    toast.success("Login successful!");

                    router.push("/");
                    router.refresh();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            }
        );

        setLoading(false);

    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to continue your learning journey."
            footerText="Don't have an account?"
            footerLink="/register"
            footerLinkText="Register"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                    <p className="mb-3 text-sm font-semibold text-indigo-700">
                        Demo Accounts
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={fillStudent}
                            className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                        >
                            Student Demo
                        </button>

                        <button
                            type="button"
                            onClick={fillInstructor}
                            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
                        >
                            Instructor Demo
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.email?.message}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-600"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                                <HiEyeSlash />
                            ) : (
                                <HiEye />
                            )}
                        </button>
                    </div>

                    <p className="mt-1 text-sm text-red-500">
                        {errors.password?.message}
                    </p>
                </div>

                <button
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>


        </AuthLayout>
    );
};

export default LoginForm;