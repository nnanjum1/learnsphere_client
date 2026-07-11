import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
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
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;