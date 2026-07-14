import { ReactNode } from "react";
import Link from "next/link";

import Container from "../common/Container";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLink: string;
}

const AuthLayout = ({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLink,
}: AuthLayoutProps) => {
    return (
        <section className="flex min-h-[calc(100vh-72px)] items-center py-12">
            <Container>
                <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
                            LS
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-slate-900">
                            {title}
                        </h1>

                        <p className="mt-2 text-slate-500">
                            {subtitle}
                        </p>
                    </div>

                    {children}

                    <p className="mt-8 text-center text-sm text-slate-500">
                        {footerText}{" "}
                        <Link
                            href={footerLink}
                            className="font-semibold text-indigo-600 hover:underline"
                        >
                            {footerLinkText}
                        </Link>
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default AuthLayout;