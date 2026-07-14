"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import AuthLayout from "./AuthLayout";
import { authClient } from "@/app/lib/auth-client";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "student" | "instructor";
}

const RegisterForm = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            role: "student",
        },
    });

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);

        await authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            } as any,
            {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: () => {
                    setLoading(false);
                    toast.success("Registration successful!");
                    router.push("/login");
                },
                onError: (ctx) => {
                    setLoading(false);
                    toast.error(ctx.error.message || "Something went wrong.");
                },
            }
        );
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join LearnSphere and start learning today."
            footerText="Already have an account?"
            footerLink="/login"
            footerLinkText="Login"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Full Name
                    </label>
                    <input
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                        placeholder="Enter your full name"
                    />
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name?.message}
                    </p>
                </div>

                {/* Email */}
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
                        placeholder="Enter your email"
                    />
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email?.message}
                    </p>
                </div>

                {/* Password */}
                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-600"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <HiEyeSlash /> : <HiEye />}
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password?.message}
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="mb-2 block font-medium">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-600"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword?.message}
                    </p>
                </div>

                {/* Role */}
                <div>
                    <label className="mb-2 block font-medium">
                        Register As
                    </label>
                    <select
                        {...register("role")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                    >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div>

                <button
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </AuthLayout>
    );
};

export default RegisterForm;