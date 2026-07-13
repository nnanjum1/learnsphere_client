import { ReactNode } from "react";

interface StatCardProps {
    value: string;
    label: string;
    icon?: ReactNode;
}

const StatCard = ({ value, label, icon }: StatCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {icon && (
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    {icon}
                </div>
            )}

            <h3 className="text-3xl font-bold text-indigo-600">
                {value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {label}
            </p>
        </div>
    );
};

export default StatCard;