import { HiArrowLongRight } from "react-icons/hi2";

interface ProcessCardProps {
    step: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const ProcessCard = ({
    step,
    title,
    description,
    isLast,
}: ProcessCardProps) => {
    return (
        <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl font-black text-indigo-100">{step}</div>

                <h3 className="mt-4 text-xl font-bold">{title}</h3>

                <p className="mt-3 text-slate-600 leading-7">
                    {description}
                </p>
            </div>

            {!isLast && (
                <HiArrowLongRight className="absolute -right-7 top-1/2 hidden -translate-y-1/2 text-4xl text-indigo-300 xl:block" />
            )}
        </div>
    );
};

export default ProcessCard;