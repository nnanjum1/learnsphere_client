import { redirect } from "next/navigation";


import RegisterForm from "@/app/components/auth/RegisterForm";
import { getSession } from "../lib/get-session";

const RegisterPage = async () => {
    const session = await getSession();


    if (session) {
        redirect("/");
    }

    return <RegisterForm />;
};

export default RegisterPage;