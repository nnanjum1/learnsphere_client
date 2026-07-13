import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "secondary";
}

const Button = ({
    children,
    className,
    variant = "primary",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                "rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",

                variant === "primary" &&
                "bg-indigo-600 text-white hover:bg-indigo-700",

                variant === "outline" &&
                "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",

                variant === "secondary" &&
                "bg-white text-indigo-700 hover:bg-slate-100",

                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;