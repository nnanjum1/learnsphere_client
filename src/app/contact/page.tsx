"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

import Container from "../components/common/Container";
import Button from "../components/common/Button";

import {
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
} from "react-icons/hi2";

import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

type ContactForm = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactForm>();

    const onSubmit = (data: ContactForm) => {
        console.log(data);

        toast.success("Message sent successfully!");

        reset();
    };

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-24 text-white">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-5xl font-bold">
                            Contact Us
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-indigo-100">
                            We'd love to hear from you. Have a question,
                            suggestion, or feedback? Get in touch with us.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Contact */}
            <section className="py-20">
                <Container>
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Left */}
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900">
                                Get In Touch
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600">
                                Our team is always ready to answer your
                                questions and help you on your learning
                                journey.
                            </p>

                            <div className="mt-10 space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="rounded-xl bg-indigo-100 p-3">
                                        <HiOutlineMapPin className="text-2xl text-indigo-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Address
                                        </h3>

                                        <p className="text-slate-600">
                                            Sylhet, Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="rounded-xl bg-indigo-100 p-3">
                                        <HiOutlinePhone className="text-2xl text-indigo-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Phone
                                        </h3>

                                        <p className="text-slate-600">
                                            +880 1712345678
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="rounded-xl bg-indigo-100 p-3">
                                        <HiOutlineEnvelope className="text-2xl text-indigo-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Email
                                        </h3>

                                        <p className="text-slate-600">
                                            support@learnsphere.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="mb-4 text-xl font-bold">
                                    Follow Us
                                </h3>

                                <div className="flex gap-4">
                                    <Link
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="rounded-full bg-indigo-600 p-3 text-white transition hover:bg-indigo-700"
                                    >
                                        <FaFacebookF />
                                    </Link>

                                    <Link
                                        href="https://linkedin.com"
                                        target="_blank"
                                        className="rounded-full bg-indigo-600 p-3 text-white transition hover:bg-indigo-700"
                                    >
                                        <FaLinkedinIn />
                                    </Link>

                                    <Link
                                        href="https://github.com"
                                        target="_blank"
                                        className="rounded-full bg-indigo-600 p-3 text-white transition hover:bg-indigo-700"
                                    >
                                        <FaGithub />
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5 rounded-3xl bg-white p-8 shadow-lg"
                        >
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                placeholder="Your Name"
                                className="w-full rounded-xl border p-4"
                            />
                            <p className="text-red-500">
                                {errors.name?.message}
                            </p>

                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                placeholder="Email Address"
                                className="w-full rounded-xl border p-4"
                            />
                            <p className="text-red-500">
                                {errors.email?.message}
                            </p>

                            <input
                                {...register("subject", {
                                    required: "Subject is required",
                                })}
                                placeholder="Subject"
                                className="w-full rounded-xl border p-4"
                            />
                            <p className="text-red-500">
                                {errors.subject?.message}
                            </p>

                            <textarea
                                {...register("message", {
                                    required: "Message is required",
                                })}
                                placeholder="Your Message"
                                rows={6}
                                className="w-full rounded-xl border p-4"
                            />
                            <p className="text-red-500">
                                {errors.message?.message}
                            </p>

                            <Button className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </Container>
            </section>

            {/* Map */}
            <section className="pb-20">
                <Container>
                    <div className="overflow-hidden rounded-3xl shadow-lg">
                        <iframe
                            src="https://www.google.com/maps?q=Sylhet,Bangladesh&output=embed"
                            width="100%"
                            height="450"
                            loading="lazy"
                            className="border-0"
                        />
                    </div>
                </Container>
            </section>
        </>
    );
}