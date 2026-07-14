import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";
import RegisterForm from "@/app/components/auth/RegisterForm";

const RegisterPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/");
    }

    return <RegisterForm />;
};

export default RegisterPage;