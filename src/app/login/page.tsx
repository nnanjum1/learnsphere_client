import { redirect } from "next/navigation";

import { getSession } from "@/app/lib/get-session";
import LoginForm from "@/app/components/auth/LoginForm";

const LoginPage = async () => {
    const session = await getSession();

    if (session?.user) {
        redirect("/");
    }

    return <LoginForm />;
};

export default LoginPage;