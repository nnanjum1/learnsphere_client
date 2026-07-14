import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";
import LoginForm from "@/app/components/auth/LoginForm";

const LoginPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/");
    }

    return <LoginForm />;
};

export default LoginPage;